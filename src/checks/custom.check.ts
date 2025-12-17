import { execa } from "execa";
import type { ParityConfig } from "../../schemas/config.type";
import type { CheckResult } from "./types";
import { logger } from "../chalk/chalk.config";

export async function checkCustom(
  config: ParityConfig
): Promise<CheckResult[]> {
  const customChecks = config.custom ?? [];
  const results: CheckResult[] = [];

  for (const check of customChecks) {
    try {
      await execa({ shell: true })`${check.command}`;
      results.push({
        name: check.name,
        status: "PASS",
        message: `${check.name} passed ✔`,
      });
    } catch (e) {
      logger.error(`Custom Check Failed: ${check.name}`);
      results.push({
        name: check.name,
        status: "FAIL",
        message: `Command failed: ${check.command}`,
        details: check.error,
        why: "This is a custom check defined in your .env.lock configuration.",
      });
    }
  }

  return results;
}
