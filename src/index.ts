import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { cac } from "cac";
import { checkCommand } from "./commands/check.command.js";
import { generateCommand } from "./commands/generate.command.js";
import { fixCommand } from "./commands/fix.command.js";
import { startCommand } from "./commands/start.command.js";

const cli = cac("parity");

cli
  .command("check", "Check environment consistency")
  .option("--ci", "CI mode")
  .action(checkCommand);

cli.command("init", "Generate configuration file").action(generateCommand);
cli.command("generate", "Generate configuration file").action(generateCommand);
cli.command("fix", "Interactive fix for missing variables").action(fixCommand);

cli
  .command("start <command> [...args]", "Run checks then start application")
  .action((command, args) => {
    startCommand(command, args);
  });

cli.help();
cli.parse();
