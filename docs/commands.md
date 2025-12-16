# Command Reference

## `parity check`

Runs the environment consistency checks defined in your project.

**Usage:**

```bash
parity check [options]
```

**Options:**

- `--ci`: Run in CI mode. This may enforce stricter rules or different reporting output suitable for CI logs.

**Example:**

parity check --ci

````

## `parity init`

Generates a default `.env.lock` configuration file based on your current environment (OS, Runtime).

**Usage:**

```bash
parity init
````

**Behavior:**

- Detects your current OS and Runtime (Node/Bun version).
- Creates a `.env.lock` file with these values.
- Skips if the file already exists.
