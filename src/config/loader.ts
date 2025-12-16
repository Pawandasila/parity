import fs from "fs";
import path from "path";
import YAML from "yaml";
import {
  ParityConfigSchema,
  type ParityConfig,
} from "../../schemas/config.type.js";
import { logger } from "../chalk/chalk.config.js";

const CONFIG_FILE = ".env.lock";

export async function loadParity(
  cwd: string = process.cwd()
): Promise<ParityConfig | null> {
  const configPath = path.join(cwd, CONFIG_FILE);

  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    // Read file as text
    const content = fs.readFileSync(configPath, "utf-8");

    // Turn text into Js Object
    const rawConfig = YAML.parse(content);

    // Validate config
    const result = ParityConfigSchema.parse(rawConfig);
    return {
      runtime: result.runtime,
      os: result.os,
      env: result.env,
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to load ${CONFIG_FILE}: ${error.message}`);
    } else {
      logger.error(`Failed to load ${CONFIG_FILE}: ${String(error)}`);
    }
    return null;
  }
}
