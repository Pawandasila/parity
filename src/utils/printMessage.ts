import type { CheckResult } from "../checks/types";
import { logger } from "../chalk/chalk.config";

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
  } else {
    logger.error(`FAIL ${result.name}: ${result.message}`);
    if (result.details) {
      logger.info(`Details: ${result.details}`);
    }
  }
}
