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

## `parity fix`

Interactively finds missing required environment variables and prompts you to fill them.

**Usage:**

```bash
parity fix
```

**Behavior:**

- Scans `.env.lock` for required variables.
- Checks if they exist in your `.env` file(s).
- Prompts for missing values.
- **Safely quotes** input (handles `#` and spaces automatically) and appends to `.env`.

## `parity start`

Runs checks and only starts your application if the environment is healthy. This is the **recommended** way to run your app.

**Usage:**

```bash
parity start <your-command>
```

**Example:**

```bash
parity start npm run dev
parity start node server.js
```

**Behavior:**

1. Runs `parity check`.
2. If **PASS**: Executes your command.
3. If **FAIL**: Exits with error (does not run your command).
