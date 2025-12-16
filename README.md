# Parity CLI 🚀

> **Stop "It works on my machine". Enforce environment consistency across your team and CI.**

[![npm version](https://img.shields.io/npm/v/parity-cli.svg)](https://www.npmjs.com/package/parity-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Parity** is a developer experience tool that ensures every engineer on your team—and your CI pipeline—is running the exact same environment configuration. No more runtime mismatches, missing `.env` variables, or package manager conflicts.

![Parity Check Success](./assests/pass_check.png)

---

## ⚡ Features & Visuals

### 1. Easy Initialization

Run `parity init` to generate a config based on your current machine.
![Init Command](./assests/init.png)

### 2. Runtime & Version Enforcement

Ensure everyone uses the same Node/Bun version. Supports strict versions or SemVer ranges.
**Success with SemVer:**
![Semver Success](./assests/pass_version.png)

**Failure (Version Mismatch):**
![Version Error](./assests/version_error.png)

**Failure (Wrong Runtime):**
![Runtime Error](./assests/runtime_error.png)

### 3. Package Manager Integrity

Stop mixed usage of `npm`, `pnpm`, and `bun`.
![Package Manager Error](./assests/package_manager_error.png)

### 4. Cross-Platform Safety

Prevent Windows-specific projects from failing on Linux CI.
![OS Error](./assests/os_error.png)

### 5. Environment Validation

Validate `.env` variables before the app starts.
![Env Error](./assests/env_error.png)

### 6. Helpful CLI

Built-in help to guide you.
![Help Command](./assests/help.png)

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

Run the init command to generate a `.env.lock` file:

```bash
npx parity init
```

### 2. Run Checks

Add the check command to your `scripts` in `package.json`:

```json
"scripts": {
  "postinstall": "parity check",
  "dev": "parity check && next dev"
}
```

---

## 🎨 Pretty Output

(Screenshots above demonstrate the output)

---

## 🤖 CI/CD Integration

In your CI pipeline, run Parity with the `--ci` flag. This treats **warnings** as **errors**.

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
