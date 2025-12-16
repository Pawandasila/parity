import chalk from "chalk";

const formatArgs = (args: unknown[]) =>
  args
    .map((arg) =>
      typeof arg === "object" && arg !== null
        ? JSON.stringify(arg, null, 2)
        : arg
    )
    .join(" ");

export const logger = {
  info: (...args: unknown[]) => console.log(chalk.blue(formatArgs(args))),
  success: (...args: unknown[]) => console.log(chalk.green(formatArgs(args))),
  warning: (...args: unknown[]) => console.log(chalk.yellow(formatArgs(args))),
  error: (...args: unknown[]) => console.log(chalk.red(formatArgs(args))),

  // Direct color access if needed later, but wrapped functions are preferred
  colors: {
    blue: chalk.blue,
    green: chalk.green,
    yellow: chalk.yellow,
    red: chalk.red,
  },
};
