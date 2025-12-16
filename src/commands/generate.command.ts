import fs from "fs";
import path from "path";
import { logger } from "../chalk/chalk.config.js";
import { getEnvLockTemplate } from "../templates/envLock.template.js";
import { detectOs } from "../checks/os.check.js";
import { detectRuntime } from "../checks/runtime.check.js";

export function generateCommand() {
  const cwd = process.cwd();
  const filePath = path.join(cwd, ".env.lock");

  if (fs.existsSync(filePath)) {
    logger.info("ℹ .env.lock already exists. Skipping generation.");
    return;
  }

  try {
    const os = detectOs();
    const runtime = detectRuntime();

    // Warn if OS is unknown, but still generate
    if (os === "unknown") {
      logger.warning("⚠ Could not detect valid OS, default to 'unknown'");
    }

    const template = getEnvLockTemplate({
      runtime: runtime.name,
      version: runtime.version,
      os: os,
    });

    fs.writeFileSync(filePath, template, "utf-8");
    logger.success("✔ .env.lock created successfully");
    logger.info("  Runtime:", `${runtime.name} v${runtime.version}`);
    logger.info("  OS:", os);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to create .env.lock: ${error.message}`);
    } else {
      logger.error("Failed to create .env.lock");
    }
  }
}
