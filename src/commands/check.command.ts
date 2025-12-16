import { loadParity } from "../config/loader.js";
import { logger } from "../chalk/chalk.config.js";
import { checkRuntime } from "../checks/runtime.check.js";
import { printResult } from "../utils/printMessage.js";
import { checkOs } from "../checks/os.check.js";
import { checkEnv } from "../checks/Env.check.js";
import { isCIMode } from "../ci/detect.js";
import { enforceResults } from "../ci/enforce.js";

export async function checkCommand(options: { ci?: boolean }) {
  const ciMode = isCIMode(options.ci);

  if (ciMode) {
    logger.info("🔍 Parity check in CI mode running...");
  } else {
    logger.info("🔍 Parity check running...");
  }

  const config = await loadParity();

  if (!config) {
    logger.error("❌ .env.lock not found");
    if (ciMode) process.exit(1);
    return;
  }

  logger.success("✔ .env.lock loaded successfully \n", config);

  // Flatten results because checkEnv returns an array
  const results = [checkRuntime(config), checkOs(config), ...checkEnv(config)];

  results.forEach(printResult);

  enforceResults(results, ciMode);
}
