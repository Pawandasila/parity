import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { cac } from "cac";
import { checkCommand } from "./commands/check.js";

const cli = cac(process.env.APP_NAME);

cli
  .command("check", "Check environment consistency")
  .option("--ci", "CI mode")
  .action(checkCommand);

cli.help();
cli.parse();
