import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { cac } from "cac";
import { checkCommand } from "./commands/check.command.js";
import { generateCommand } from "./commands/generate.command.js";

const cli = cac(process.env.APP_NAME);

cli
  .command("check", "Check environment consistency")
  .option("--ci", "CI mode")
  .action(checkCommand);

cli.command("init", "Generate configuration file").action(generateCommand);
cli.command("generate", "Generate configuration file").action(generateCommand);

cli.help();
cli.parse();
