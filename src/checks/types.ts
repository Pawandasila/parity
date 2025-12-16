export type CheckStatus = "PASS" | "FAIL" | "WARN";

export interface CheckResult {
  name: string;
  status: CheckStatus;
  message: string;
  details?: string;
  why?: string;
}
