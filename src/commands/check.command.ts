import { loadParity } from "../config/loader.js";
import { logger } from "../chalk/chalk.config.js";
import { printResult } from "../utils/printMessage.js";
import { isCIMode } from "../ci/detect.js";
import { enforceResults } from "../ci/enforce.js";
import { runAllChecks } from "../utils/runner.js";

export async function checkCommand(options: { ci?: boolean }) {
  const ciMode = isCIMode(options.ci);

  if (ciMode) {
    logger.info("🔍 Parity check in CI mode running...");
  } else {
    logger.info("🔍 Parity check running...");
  }

  const config = await loadParity();

  if (config === "missing") {
    logger.error("❌ .env.lock not found");
    if (ciMode) process.exit(1);
    return;
  }

  if (config === "invalid") {
    // Error detailed handled by loader
    if (ciMode) process.exit(1);
    return;
  }

  logger.success("✔ .env.lock loaded successfully \n");

  const results = await runAllChecks(config);

  results.forEach(printResult);

  enforceResults(results, ciMode);
}
