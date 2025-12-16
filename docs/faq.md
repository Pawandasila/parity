# Common Issues & FAQ

This guide covers common issues you might encounter when using Parity and how to resolve them.

## Frequently Asked Questions

### why did `parity check` fail?

Parity fails if your current environment does not match the rules defined in `.env.lock`.

- **Runtime Mismatch**: You are running Node but the project requires Bun (or vice versa), or the versions don't match.
- **OS Mismatch**: You are on Windows but the project requires Linux.
- **Missing Env Vars**: You are missing required environment variables in your `.env` file.

### How do I fix a "Runtime version mismatch"?

Check the `expected` version in .env.lock and compare it with your current version (`node -v`).

- If you are using `nvm` or `fnm`, switch to the correct version.
- If the `.env.lock` is outdated, update it to match your current version (if your team agrees).

### What does "Package Manager not enforced" mean?

It means `.env.lock` does not specify a `manager` field. You can add one (e.g., `manager: npm`) to ensure everyone uses the same tool.

### CI checks failed but local passed?

CI mode (`--ci`) is stricter than local mode. Warnings (like missing optional env vars) cause failures in CI to prevent issues from sliding into production.

## Reporting Bugs

If you encounter a bug in Parity CLI itself, please open an issue on our [GitHub Repository](https://github.com/PawanDasila/parity/issues).
Include:

- Your OS and Runtime version.
- The output of `parity check`.
- Your `.env.lock` file content.
