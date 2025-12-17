# Testing Scenarios

This guide outlines key scenarios to test your **Parity** configuration to ensure it effectively enforces environment consistency. You can simulate these by editing your `.env.lock` or your local environment.

## 1. The "Happy Path" (Everything Green)

- **Setup:** Ensure `.env.lock` matches your current machine (Node version, OS, Env vars).
- **Action:** Run `parity check`.
- **Result:** All checks **PASS**.

## 2. Runtime & Semver Validation

Test how Parity handles runtime mismatches.

- **Scenario A (Name Mismatch)**
  - **Setup:** Change `.env.lock` `runtime.name` to `bun` (if you are on Node).
  - **Result:** **FAIL** (Runtime name mismatch).
- **Scenario B (Version Mismatch)**
  - **Setup:** Change `.env.lock` `runtime.version` to `50.0.0`.
  - **Result:** **FAIL** (Version mismatch).
- **Scenario C (Semver Success)**
  - **Setup:** Change `.env.lock` `runtime.version` to `^20.0.0` (or a range covering your version).
  - **Result:** **PASS**.

## 3. Package Manager Enforcement

Ensure the team uses the correct package manager (npm, pnpm, bun, or yarn).

- **Setup:** Add `manager: pnpm` to your `.env.lock` under `runtime`.
- **Action:** Run `npm run parity check` (this sets the user agent to npm).
- **Result:** **FAIL** (Expected pnpm, Actual npm).
- **Why:** Prevents mixed lockfiles (`package-lock.json` vs `pnpm-lock.yaml`).

## 4. OS Restrictions

Test cross-platform consistency.

- **Setup:** Change `.env.lock` `os` to `linux` (if you are on Windows).
- **Action:** Run `parity check`.
- **Result:** **FAIL** (OS mismatch).
- **Why:** Validates that native modules will work on the target machine.

## 5. Environment Variables

Verify that critical configuration is present.

- **Scenario A (Strict Requirement)**
  - **Setup:** In `.env.lock`, add `SECRET_KEY: required`. Ensure `SECRET_KEY` is **NOT** in your `.env` file.
  - **Result:** **FAIL** (Missing required variable).
- **Scenario B (Optional Warning)**
  - **Setup:** Change it to `SECRET_KEY: optional`.
  - **Result:** **WARN** (Missing optional variable).
- **Scenario C (Variable Expansion)**
  - **Setup:** `BASE_URL=http://${HOST}/api`. Ensure `HOST` is defined.
  - **Result:** **PASS**. App receives expanded value (e.g. `http://localhost/api`).

## 6. CI Mode Enforcement

Test strict validation (zero-tolerance policy).

- **Setup:** Create a warning condition (Scenario 5B above).
- **Action 1 (Local):** Run `parity check`.
  - **Result:** Process exits with **success (0)** (Warnings are allowed locally).
- **Action 2 (CI/Strict):** Run `parity check --ci`.
  - **Result:** Process **fails (1)**.
  - **Why:** CI mode treats all checks (including warnings) as critical failures.

## 7. Configuration Existence

- **Setup:** Rename `.env.lock` to `.env.lock.bak`.
- **Action:** Run `parity check`.
- **Result:** **FAIL** (Config not found).

## 8. Custom Checks

- **Setup:** Add a custom check to `.env.lock`:
  ```yaml
  custom:
    - name: "Fail Test"
      command: "exit 1"
  ```
- **Action:** Run `parity check`.
- **Result:** **FAIL** (Command failed).

## 9. Interactive Fix

- **Setup:** Remove a required variable from `.env`.
- **Action:** Run `parity fix`.
- **Result:** Prompt appears. Enter value. Variable is added to `.env`.
