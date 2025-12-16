import type { CheckResult } from "../checks/types.js";
import { logger } from "../chalk/chalk.config.js";
import chalk from "chalk";

export function printResult(result: CheckResult | CheckResult[]) {
  if (Array.isArray(result)) {
    result.forEach(printResult);
    return;
  }

  if (result.status === "PASS") {
    logger.success(`PASS ${result.name}: ${result.message}`);
  } else if (result.status === "WARN") {
    logger.warning(`WARN ${result.name}: ${result.message}`);
    if (result.details) {
      logger.info(`Details: ${result.details}`);
    }
    if (result.why) {
      logger.info(chalk.dim(`ℹ️  Why this matters:\n    ${result.why}`));
    }
  } else {
    logger.error(`FAIL ${result.name}: ${result.message}`);
    if (result.details) {
      logger.info(`Details: ${result.details}`);
    }
    if (result.why) {
      logger.info(chalk.dim(`ℹ️  Why this matters:\n    ${result.why}`));
    }
  }
}
