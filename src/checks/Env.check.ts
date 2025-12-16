import fs from "fs";
import path from "path";
import type { ParityConfig } from "../../schemas/config.type";
import type { CheckResult } from "./types";
import dotenv from "dotenv";

export function checkEnv(config: ParityConfig): CheckResult[] {
  const result: CheckResult[] = [];

  const envFiles = config.envFiles ?? [".env"];

  for (const file of envFiles) {
    const envPath = path.join(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
    }
  }

  const envRules = config.env ?? {};

  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  for (const [key, requirements] of Object.entries(envRules)) {
    const value = process.env[key];
    if (!value) {
      if (requirements === "required") {
        missingRequired.push(key);
      } else {
        missingOptional.push(key);
      }
    }
  }

  if (missingRequired.length > 0) {
    result.push({
      name: "Env",
      status: "FAIL",
      message: "Missing required environment variables",
      details: missingRequired.map((v) => `- ${v}`).join("\n"),
      why: "The application requires these variables to function correctly. Missing them will likely cause a crash at startup.",
    });
  }

  if (missingOptional.length > 0) {
    result.push({
      name: "EnvCheck",
      status: "WARN",
      message:
        "Missing optional environment variables: " + missingOptional.join(", "),
      details: missingOptional.map((v) => `- ${v}`).join("\n"),
      why: "These variables are not critical but may disable certain features (e.g., Debugging, Analytics).",
    });
  }

  if (missingRequired.length === 0 && missingOptional.length === 0) {
    result.push({
      name: "Env",
      status: "PASS",
      message: "All required environment variables are present",
    });
  }

  return result;
}
