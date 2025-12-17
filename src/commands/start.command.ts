import { execa } from "execa";
import { loadParity } from "../config/loader.js";
import { logger } from "../chalk/chalk.config.js";
import { printResult } from "../utils/printMessage.js";
import { runAllChecks } from "../utils/runner.js";

export async function startCommand(command: string, args: string[]) {
  if (!command) {
    logger.error("❌ No command provided. Usage: parity start <command>");
    process.exit(1);
  }

  // 1. Run Checks
  logger.info("🔍 Verifying environment before start...");
  const config = await loadParity();

  if (config === "missing" || config === "invalid") {
    logger.error("❌ Invalid environment configuration. Start aborted.");
    process.exit(1);
  }

  const results = await runAllChecks(config);
  const hasError = results.some((r) => r.status === "FAIL");

  if (hasError) {
    logger.error(
      "\n🛑 Environment checks failed. Fix the issues below to start:"
    );
    results.forEach(printResult);
    process.exit(1);
  }

  // 2. Start Project
  logger.success("✔ Environment OK. Starting app...\n");

  try {
    // Reconstruct command line arguments
    // If the user ran "parity start npm run dev",
    // command="npm", args=["run", "dev"]
    await execa(command, args, { stdio: "inherit", shell: true });
  } catch (error) {
    // Command failed (e.g. app crashed), simply exit with that code
    process.exit((error as any).exitCode ?? 1);
  }
}
