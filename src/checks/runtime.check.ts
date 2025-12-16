import type { ParityConfig } from "../../schemas/config.type";
import type { CheckResult } from "./types";

export function detectRuntime(): {
  name: "node" | "bun";
  version: string;
} {
  const globalEnv = globalThis as typeof globalThis & {
    Bun?: { version: string };
  };

  if (globalEnv.Bun) {
    return { name: "bun", version: globalEnv.Bun.version };
  } else {
    return { name: "node", version: process.versions.node };
  }
}

export function checkRuntime(config: ParityConfig): CheckResult {
  const expected = config.runtime;
  const { name: actualName, version: actualVersion } = detectRuntime();

  if (actualName !== expected.name) {
    return {
      name: "Runtime",
      status: "FAIL",
      message: "Runtime name mismatch",
      details: `Expected: ${expected.name}, Actual: ${actualName}`,
      why: "Different runtimes (Node vs Bun) behave differently with package resolution, streams, and built-in APIs.",
    };
  }

  if (actualVersion !== expected.version) {
    return {
      name: "Runtime",
      status: "FAIL",
      message: "Runtime version mismatch",
      details: `Expected: ${expected.version}, Actual: ${actualVersion}`,
      why: "Version mismatches can lead to syntax errors (if using new features) or behavior regressions.",
    };
  }

  return {
    name: "Runtime",
    status: "PASS",
    message: "Runtime check passed ✔",
  };
}
