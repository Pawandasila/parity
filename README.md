<div align="center">

![Parity Logo](./assests/parity.png)

# 🚀 Parity CLI

### Stop "It works on my machine" — Enforce environment consistency across your team and CI

[![npm version](https://img.shields.io/npm/v/parity-ci.svg?style=flat-square)](https://www.npmjs.com/package/parity-ci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/parity-ci.svg?style=flat-square)](https://www.npmjs.com/package/parity-ci)

</div>

---

## 🎯 What is Parity?

**Parity** is a zero-config developer experience tool that ensures every engineer on your team—and your CI pipeline—runs the exact same environment configuration. It prevents:

- ❌ Runtime version mismatches
- ❌ Missing `.env` variables
- ❌ Package manager conflicts

---

## ⚡ Quick Start

### 1. Install

```bash
npm install -D parity-ci
```

### 2. Initialize

Generate a `.env.lock` file based on your current machine:

```bash
npx parity init
```

### 3. Run It

**Option A: Check manually**

```bash
npx parity check
```

**Option B: Protect your start command (Recommended)**
Wrap your start script so checks run automatically before your app starts.

```bash
npx parity start npm run dev
```

---

## 🛠️ Configuration (How to write `.env.lock`)

The `.env.lock` file allows you to define strict rules for your project.

> [!IMPORTANT] > **Syntax Warning:** Use **YAML** syntax (`key: value`), NOT `.env` syntax (`KEY=VALUE`).

### Example Configuration

```yaml
# 1. Runtime Enforcement
runtime:
  name: node
  version: ">=18.0.0"
  manager: npm # Optional: Enforce specific manager

# 2. OS Restrictions (Optional)
os: ["darwin", "linux"]

# 3. Environment Files
envFiles:
  - .env
  - .env.local

# 4. Environment Variables
env:
  DATABASE_URL: required
  API_KEY: required
  DEBUG: optional
```

### **Configuration Types & Allowed Values**

| Option            | Type                   | Allowed Values / Description                               |
| :---------------- | :--------------------- | :--------------------------------------------------------- |
| `runtime.name`    | `string`               | `node`, `bun` <br> _(More coming soon)_                    |
| `runtime.version` | `string`               | SemVer range (e.g. `>=18.0.0`, `^20`) or Exact (`20.11.0`) |
| `os`              | `string` \| `string[]` | `windows`, `linux`, `macos`                                |
| `packageManager`  | `string`               | `npm`, `pnpm`, `yarn`, `bun`                               |
| `envFiles`        | `string[]`             | List of file paths (e.g. `['.env', '.env.local']`)         |
| `env`             | `object`               | Key-value pairs where value is `required` or `optional`    |

> [!NOTE] > **Current Limitations:** Parity currently supports **Node.js** and **Bun** runtimes. Support for Deno, Python, and Go is planned for future updates.

---

## ⚡ Features

<details>
<summary><b>🔧 Runtime & Version Enforcement</b></summary>
<br>
Ensure everyone uses the same Node/Bun version.

![Semver Success](./assests/pass_version.png)

</details>

<details>
<summary><b>🛠️ Interactive Fix</b></summary>
<br>
Run `parity fix` to automatically find missing variables and prompt you to enter them.

```bash
npx parity fix
```

> [!TIP] > **Special Characters:** Parity automatically quotes your input to safely handle characters like `#` or spaces. Enter **only** the value (do not add your own quotes or inline comments).

</details>

<details>
<summary><b>🧩 Custom Shell Checks</b></summary>
<br>
Run any shell command as a check.
 
```yaml
custom:
  - name: "Docker Check"
    command: "docker info"
    error: "Docker is not running!"
```
</details>

<details>
<summary><b>📦 Package Manager Integrity</b></summary>
<br>
Stop mixed usage of npm/pnpm/bun.

![Package Manager Error](./assests/package_manager_error.png)

</details>

<details>
<summary><b>🔐 Environment Validation & Expansion</b></summary>
<br>
Validate required variables exist before app start. 
<br><br>
<b>✅ Supports Variable Expansion</b><br>
Variables like `URL=http://${HOST}/api` are automatically resolved.

![Env Error](./assests/env_error.png)

</details>

---

## 🤖 CI/CD Integration

Use the `--ci` flag to treat warnings as errors.

```yaml
# GitHub Actions Example
- name: Run Parity checks
  run: npx parity check --ci
```

---

## 🤝 Contributing & Support

Found a bug? [Open an issue](https://github.com/Pawandasila/parity-cli/issues).
