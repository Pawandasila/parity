import os from "os";
import type { ParityConfig } from "../../schemas/config.type";
import { logger } from "../chalk/chalk.config.js";
import type { CheckResult } from "./types.js";

type SupportedOs = "windows" | "linux" | "macos";

function detectOs(): SupportedOs | "unknown" {
  const platform = os.platform();
  if (platform === "win32" || platform === "cygwin") return "windows";
  if (platform === "linux") return "linux";
  if (platform === "darwin") return "macos";

  return "unknown";
}

export function checkOs(config: ParityConfig): CheckResult {
  const expected = config.os;
  const actual = detectOs();

  if (actual === "unknown") {
    return {
      name: "OS",
      status: "FAIL",
      message: "Unsupported operating system",
      details: `Detected platform: ${os.platform()}`,
    };
  }

  if (expected !== actual) {
    logger.error(`OS Mismatch: Expected ${expected}, got ${actual}`);
    return {
      name: "OS",
      status: "FAIL",
      message: "Operating system mismatch",
      details: `Expected: ${expected}, Actual: ${actual}`,
    };
  }

  return {
    name: "OS",
    status: "PASS",
    message: "OS check passed ✔",
    details: `Matches config: ${actual}`,
  };
}
