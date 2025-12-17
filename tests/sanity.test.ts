import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { checkRuntime } from "../src/checks/runtime.check";
import { checkOs } from "../src/checks/os.check";
import { checkPackageManager } from "../src/checks/packageManager.check";
import { checkEnv } from "../src/checks/Env.check";
import { checkCustom } from "../src/checks/custom.check";
import type { ParityConfig } from "../schemas/config.type";
import os from "os";
import fs from "fs";
import { execa } from "execa";

// Mocks
vi.mock("fs");
vi.mock("os");
vi.mock("execa");

describe("Parity CI Sanity Checks", () => {
  const baseConfig: ParityConfig = {
    runtime: { name: "node", version: ">=18.0.0" },
    os: "windows",
  };

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = {}; // Clear env
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Runtime Check", () => {
    it("should PASS when runtime matches", () => {
      // Mock process.versions.node
      const originalVersions = process.versions;
      Object.defineProperty(process, "versions", {
        value: { ...originalVersions, node: "20.0.0" },
      });

      const result = checkRuntime({
        ...baseConfig,
        runtime: { name: "node", version: ">=18.0.0" },
      });

      expect(result.status).toBe("PASS");
      expect(result.message).toContain("satisfies >=18.0.0");
    });

    it("should FAIL when runtime version does not satisfy", () => {
      const originalVersions = process.versions;
      Object.defineProperty(process, "versions", {
        value: { ...originalVersions, node: "16.0.0" },
      });

      const result = checkRuntime({
        ...baseConfig,
        runtime: { name: "node", version: ">=18.0.0" },
      });

      expect(result.status).toBe("FAIL");
      expect(result.message).toBe("Runtime version mismatch");
    });
  });

  describe("OS Check", () => {
    it("should PASS when OS matches string", () => {
      vi.mocked(os.platform).mockReturnValue("win32");

      const result = checkOs({ ...baseConfig, os: "windows" });
      expect(result.status).toBe("PASS");
    });

    it("should FAIL when OS mismatches string", () => {
      vi.mocked(os.platform).mockReturnValue("darwin");

      const result = checkOs({ ...baseConfig, os: "windows" });
      expect(result.status).toBe("FAIL");
      expect(result.details).toContain("Actual: macos");
    });

    it("should PASS when OS is in allowed array", () => {
      vi.mocked(os.platform).mockReturnValue("linux");

      const result = checkOs({
        ...baseConfig,
        os: ["windows", "linux"],
      });
      expect(result.status).toBe("PASS");
    });

    it("should FAIL when OS is NOT in allowed array", () => {
      vi.mocked(os.platform).mockReturnValue("darwin");

      const result = checkOs({
        ...baseConfig,
        os: ["windows", "linux"],
      });
      expect(result.status).toBe("FAIL");
    });
  });

  describe("Package Manager Check", () => {
    it("should PASS when manager matches user agent", () => {
      process.env.npm_config_user_agent = "pnpm/8.0.0 npm/? node/v18 win32";

      const result = checkPackageManager({
        ...baseConfig,
        runtime: { ...baseConfig.runtime, manager: "pnpm" },
      });

      expect(result.status).toBe("PASS");
    });

    it("should FAIL when manager mismatches", () => {
      process.env.npm_config_user_agent = "npm/9.0.0 node/v18 win32";

      const result = checkPackageManager({
        ...baseConfig,
        runtime: { ...baseConfig.runtime, manager: "pnpm" },
      });

      expect(result.status).toBe("FAIL");
      expect(result.message).toBe("Package manager mismatch");
    });
  });

  describe("Env Check", () => {
    it("should PASS when required env vars are present", () => {
      // Mock loading an env file
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue("API_KEY=123\nValues=True");

      // Note: checkEnv modifies process.env, which we cleared in beforeEach

      const config: ParityConfig = {
        ...baseConfig,
        envFiles: [".env"],
        env: {
          API_KEY: "required",
        },
      };

      const results = checkEnv(config);
      const passResult = results.find((r) => r.status === "PASS");

      expect(passResult).toBeDefined();
      expect(process.env.API_KEY).toBe("123");
    });

    it("should expand environment variables", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      // Mock content with variable reference
      vi.mocked(fs.readFileSync).mockReturnValue(
        "HOST=localhost\nURL=http://${HOST}/api"
      );

      checkEnv({
        ...baseConfig,
        envFiles: [".env"],
      });

      expect(process.env.URL).toBe("http://localhost/api");
    });

    it("should FAIL when required env var is missing", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(""); // Empty file

      const results = checkEnv({
        ...baseConfig,
        env: { SECRET: "required" },
      });

      expect(results[0]?.status).toBe("FAIL");
      expect(results[0]?.message).toContain("Missing required");
    });

    it("should load from multiple files and override", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);

      // Mock readFileSync to return different content based on path
      vi.mocked(fs.readFileSync).mockImplementation((path: any) => {
        const filename = path.split(/[\/\\]/).pop();
        console.log(`Mock read: ${path} -> ${filename}`);
        if (filename === ".env.local") return "FOO=bar2";
        if (filename === ".env") return "FOO=bar1";
        return "";
      });

      checkEnv({
        ...baseConfig,
        envFiles: [".env", ".env.local"], // Local should override
      });

      expect(process.env.FOO).toBe("bar2");
    });
  });

  describe("Custom Checks", () => {
    it("should PASS when command executes successfully", async () => {
      // Mock tagged template syntax: execa({})`cmd`
      // execa returns a function that takes the template string
      const mockTaggedTemplate = vi.fn().mockResolvedValue({ stdout: "ok" });
      (execa as any).mockReturnValue(mockTaggedTemplate);

      const results = await checkCustom({
        ...baseConfig,
        custom: [{ name: "Test Check", command: "echo ok" }],
      });

      expect(results[0]?.status).toBe("PASS");
    });

    it("should FAIL when command throws error", async () => {
      const mockTaggedTemplate = vi
        .fn()
        .mockRejectedValue(new Error("Command failed"));
      (execa as any).mockReturnValue(mockTaggedTemplate);

      const results = await checkCustom({
        ...baseConfig,
        custom: [{ name: "Fail Check", command: "exit 1" }],
      });

      expect(results[0]?.status).toBe("FAIL");
      expect(results[0]?.message).toContain("Command failed");
    });
  });
});
