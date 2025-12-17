import fs from "fs";
import path from "path";
import process from "process";
import dotenv from "dotenv";
import prompts from "prompts";
import { loadParity } from "../config/loader.js";
import { logger } from "../chalk/chalk.config.js";

export async function fixCommand() {
  logger.info("🔧 Parity Fix Mode running...");

  const config = await loadParity();

  if (config === "missing" || config === "invalid") {
    logger.error("❌ Cannot fix without a valid .env.lock");
    return;
  }

  const requiredVars = config.env
    ? Object.keys(config.env).filter((k) => config.env![k] === "required")
    : [];

  if (requiredVars.length === 0) {
    logger.success("✔ No required variables to fix.");
    return;
  }

  // Load current envs (merging all files to see what we actually have)
  const envFiles = config.envFiles ?? [".env"];
  const currentEnv = { ...process.env };

  for (const file of envFiles) {
    const envPath = path.join(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const parsed = dotenv.parse(fs.readFileSync(envPath));
      Object.assign(currentEnv, parsed);
    }
  }

  const missingVars = requiredVars.filter((key) => !currentEnv[key]);

  if (missingVars.length === 0) {
    logger.success("✨ All required variables are present!");
    return;
  }

  logger.warning(`⚠️  Found ${missingVars.length} missing variables.`);

  // Ask for inputs
  const response = await prompts(
    missingVars.map((key) => ({
      type: "text",
      name: key,
      message: `Enter value for ${key}:`,
      validate: (value) => (value.length > 0 ? true : "Value is required"),
    }))
  );

  // Determine target file (first one in list)
  const targetFile = envFiles[0];
  if (!targetFile) {
    logger.error("❌ No environment files specified");
    return;
  }
  const targetPath = path.join(process.cwd(), targetFile);

  let newContent = "";
  if (fs.existsSync(targetPath)) {
    newContent = fs.readFileSync(targetPath, "utf-8");
    if (!newContent.endsWith("\n")) newContent += "\n";
  }

  let addedCount = 0;
  for (const [key, value] of Object.entries(response)) {
    if (value) {
      const safeValue = value.replace(/"/g, '\\"');
      newContent += `${key}="${safeValue}"\n`;
      addedCount++;
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(targetPath, newContent);
    logger.success(`✅ Added ${addedCount} variables to ${targetFile}`);
  } else {
    logger.info("No changes made.");
  }
}
