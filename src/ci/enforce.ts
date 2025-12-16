import type { CheckResult } from "../checks/types";

export function enforceResults(results: CheckResult[], isCli: boolean) {
  let shouldFail = false;

  for (const check of results) {
    if (check.status === "FAIL") {
      shouldFail = true;
    }

    if (isCli && check.status === "WARN") {
      shouldFail = true;
    }
  }

  if (shouldFail) {
    if (isCli) {
      process.exit(1);
    } else {
      throw new Error("Parity check failed");
    }
  }
}
