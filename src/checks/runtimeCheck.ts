import type { ParityConfig } from "../../schemas/config.type";
import type { CheckResult } from "./types";

export function checkRuntime(config: ParityConfig): CheckResult {
  const expected = config.runtime;

  let actualName: "node" | "bun";
  let actualVersion: string;

  // Type-safe access to global Bun object
  const globalEnv = globalThis as typeof globalThis & {
    Bun?: { version: string };
  };

  if (globalEnv.Bun) {
    actualName = "bun";
    actualVersion = globalEnv.Bun.version;
  } else {
    actualName = "node";
    actualVersion = process.versions.node;
  }

  if (actualName !== expected.name) {
    return {
      name: "Runtime",
      status: "FAIL",
      message: "Runtime name mismatch",
      details: `Expected: ${expected.name}, Actual: ${actualName}`,
    };
  }

  if (actualVersion !== expected.version) {
    return {
      name: "Runtime",
      status: "FAIL",
      message: "Runtime version mismatch",
      details: `Expected: ${expected.version}, Actual: ${actualVersion}`,
    };
  }

  return {
    name: "Runtime",
    status: "PASS",
    message: "Runtime check passed ✔",
  };
}
