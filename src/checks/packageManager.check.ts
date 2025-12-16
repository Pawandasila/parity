import type { ParityConfig } from "../../schemas/config.type.js";
import type { CheckResult } from "./types.js";
import fs from "fs";
import path from "path";
import semver from "semver";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

function detectPackageManager(): {
  name: PackageManager;
  version?: string;
} | null {
  // 1. Check user agent string (set when running scripts via npm run, pnpm run, etc.)
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    // Example: "pnpm/8.6.0 npm/? node/v18.16.0 win32 x64"
    const match = userAgent.match(/^([a-z]+)\/([^\s]+)/);
    if (match) {
      return {
        name: match[1] as PackageManager,
        version: match[2],
      };
    }
  }

  // 2. Fallback: Check for lock files (less accurate for version, but tells intent)
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return { name: "pnpm" };
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return { name: "yarn" };
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return { name: "bun" };
  if (fs.existsSync(path.join(cwd, "package-lock.json")))
    return { name: "npm" };

  return null;
}

export function checkPackageManager(config: ParityConfig): CheckResult {
  const expectedManager = config.runtime.manager;
  const expectedVersion = config.runtime.managerVersion;

  if (!expectedManager) {
    return {
      name: "Package Manager",
      status: "PASS",
      message: "Package manager not enforced",
      details: "No 'manager' specified in config.",
    };
  }

  const detected = detectPackageManager();

  if (!detected) {
    return {
      name: "Package Manager",
      status: "WARN",
      message: "Could not detect package manager",
      details:
        "Try running scripts via your package manager (e.g., 'npm run parity check')",
      why: "We rely on the 'npm_config_user_agent' env var or lockfiles to identify the package manager.",
    };
  }

  if (detected.name !== expectedManager) {
    return {
      name: "Package Manager",
      status: "FAIL",
      message: "Package manager mismatch",
      details: `Expected: ${expectedManager}, Actual: ${detected.name}`,
      why: `Using mixed package managers (e.g. ${expectedManager} vs ${detected.name}) causes lockfile conflicts and 'node_modules' inconsistencies.`,
    };
  }

  if (expectedVersion && detected.version) {
    if (!semver.validRange(expectedVersion)) {
      return {
        name: "Package Manager",
        status: "FAIL",
        message: "Invalid SemVer range for manager version",
        details: `Configured: ${expectedVersion}`,
        why: "Manager version must be a valid semver range.",
      };
    }

    if (!semver.satisfies(detected.version, expectedVersion)) {
      return {
        name: "Package Manager",
        status: "FAIL",
        message: "Package manager version mismatch",
        details: `Expected: ${expectedVersion}, Actual: ${detected.version}`,
        why: "Different versions of package managers can store dependencies differently or support different features.",
      };
    }
  }

  return {
    name: "Package Manager",
    status: "PASS",
    message: `Package manager check passed (${detected.name} ${
      detected.version || ""
    }) ✔`,
  };
}
