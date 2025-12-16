import type { CheckResult } from "../checks/types";

import { logger } from "../chalk/chalk.config.js";

export function enforceResults(results: CheckResult[], isCi: boolean) {
  let shouldFail = false;

  for (const check of results) {
    if (check.status === "FAIL") {
      shouldFail = true;
    }

    if (isCi && check.status === "WARN") {
      shouldFail = true;
    }
  }

  if (shouldFail) {
    logger.error("❌ Checks failed");
    process.exit(1);
  }
}
