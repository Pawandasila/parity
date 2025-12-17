import type { ParityConfig } from "../../schemas/config.type.js";
import { checkEnv } from "../checks/Env.check.js";
import { checkOs } from "../checks/os.check.js";
import { checkPackageManager } from "../checks/packageManager.check.js";
import { checkRuntime } from "../checks/runtime.check.js";
import { checkCustom } from "../checks/custom.check.js";
import type { CheckResult } from "../checks/types.js";

export async function runAllChecks(
  config: ParityConfig
): Promise<CheckResult[]> {
  const results = [
    checkRuntime(config),
    checkPackageManager(config),
    checkOs(config),
    ...checkEnv(config),
    ...(await checkCustom(config)),
  ];

  return results;
}
