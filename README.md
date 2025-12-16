# Parity CLI 🚀

> **Stop "It works on my machine". Enforce environment consistency across your team and CI.**

[![npm version](https://img.shields.io/npm/v/parity-cli.svg)](https://www.npmjs.com/package/parity-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Parity** is a developer experience tool that ensures every engineer on your team—and your CI pipeline—is running the exact same environment configuration. No more runtime mismatches, missing `.env` variables, or package manager conflicts.

![Parity CLI Output](https://github.com/Pawandasila/parity/assets/placeholder/demo.png) _(Note: Add a real screenshot here later!)_

---

## ⚡ Features

- **Runtime Enforcement**: Ensure everyone uses the same Node/Bun version (supports SemVer ranges).
- **OS Restrictions**: Prevent Windows-only or Linux-only projects from running on the wrong OS.
- **Package Manager Check**: Stop `package-lock.json` vs `pnpm-lock.yaml` wars. Enforce `npm`, `pnpm`, or `bun`.
- **Environment Validation**: Validate `.env` variables (Required/Optional) before your app even starts.
- **CI/CD Integration**: Strict mode (`--ci`) ensures zero warnings in production pipelines.

---

## 📦 Installation

Install it as a dev dependency in your project:

```bash
npm install -D parity-cli
# or
pnpm add -D parity-cli
# or
bun add -d parity-cli
```

---

## 🚀 Usage

### 1. Initialize Configuration

Run the init command to generate a `.env.lock` file based on your **current** machine:

```bash
npx parity init
```

This creates a `.env.lock` file:

```yaml
runtime:
  name: node
  version: ">=20.0.0"
  manager: npm

os: any

env:
  DATABASE_URL: required
  API_KEY: required
  DEBUG: optional
```

### 2. Run Checks

Add the check command to your `scripts` in `package.json`:

```json
"scripts": {
  "postinstall": "parity check",
  "dev": "parity check && next dev"
}
```

Or run it manually:

```bash
npx parity check
```

---

## 🎨 Pretty Output

Parity gives you clear, actionable feedback:

```bash
🔍 Parity check running...
✔ .env.lock loaded successfully

PASS Runtime: Node v25.2.1 satisfies >=20.0.0 ✔
PASS Package Manager: npm verified ✔
PASS OS: macOS detected (allowed) ✔
FAIL Env: Missing required environment variables
   - DATABASE_URL

ℹ️  Why this matters:
   The application requires these variables to connect to the DB.
   Missing them will cause a crash at startup.
```

---

## 🤖 CI/CD Integration

In your CI pipeline, run Parity with the `--ci` flag. This treats **warnings** as **errors** and exits with a non-zero code if anything is wrong.

```yaml
# .github/workflows/ci.yml
steps:
  - uses: actions/checkout@v3
  - run: npm install
  - run: npx parity check --ci
```

---

## 📚 Documentation

- [Getting Started](./docs/getting-started.md)
- [Command Reference](./docs/commands.md)
- [Testing & Scenarios](./docs/testing.md)
- [FAQ & Troubleshooting](./docs/faq.md)

---

## 📄 License

MIT © [Pawandasila](https://github.com/Pawandasila)
