# Architecture

Parity is built with a modular structure to support extensible checks and fixes.

## Directory Structure

- `bin/`: CLI entry point.
- `src/`: Source code.
  - `commands/`: CLI command implementations (e.g., `check.ts`, `fix.ts`, `start.ts`).
  - `checks/`: Logic for individual consistency checks.
  - `config/`: Configuration loading and validation.
  - `utils/`: Shared utilities (including the centralized check runner).
  - `ci/`: CI-specific logic and integration.
  - `explain/`: Logic for explaining failures to users.
- `schemas/`: Validation schemas (e.g., Zod schemas).
- `templates/`: Templates for generating files or reports.
- `docs/`: Documentation.
- `tests/`: Automated tests.

## Design Philosophy

Parity aims to be:

1.  **Fast**: Efficient checking logic.
2.  **Extensible**: Easy to add new checks.
3.  **Helpful**: Clear explanations and auto-fixes where possible.
