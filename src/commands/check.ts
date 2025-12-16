import { loadParity } from "../config/loader.js";
import { logger } from "../chalk/chalk.config.js";
import { checkRuntime } from "../checks/runtimeCheck.js";
import { printResult } from "../utils/printMessage.js";
import { checkOs } from "../checks/osCheck.js";
import { checkEnv } from "../checks/EnvCheck.js";

export async function checkCommand(options: { ci?: boolean }) {
  logger.info("🔍 Parity check running...");

  const config = await loadParity();

  if (!config) {
    logger.error("❌ .env.lock not found");
    return;
  }

  logger.success("✔ .env.lock loaded successfully \n");

  const runtimeCheck = checkRuntime(config);
  printResult(runtimeCheck);

  const osCheck = checkOs(config);
  printResult(osCheck);

  const envCheck = checkEnv(config);
  printResult(envCheck);

  if (options.ci) {
    logger.info("CI mode enabled");
  }
}
