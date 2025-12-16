import { z } from "zod";

export const RuntimeSchema = z.object({
  name: z.enum(["node", "bun"]),
  version: z.string().min(1, "Version is required"),
});

export const EnvSchema = z.record(z.string(), z.enum(["required", "optional"]));

export const OsSchema = z.enum(["windows", "linux", "macos", "unknown", "any"]);

export const ParityConfigSchema = z.object({
  runtime: RuntimeSchema,
  os: OsSchema,
  env: EnvSchema.optional(),
});

export type ParityConfig = z.infer<typeof ParityConfigSchema>;
export type RuntimeConfig = z.infer<typeof RuntimeSchema>;
export type EnvConfig = z.infer<typeof EnvSchema>;
export type OsConfig = z.infer<typeof OsSchema>;
