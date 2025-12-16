<div align="center">

![Parity Logo](./assests/parity.png)

# 🚀 Parity CLI

### Stop "It works on my machine" — Enforce environment consistency across your team and CI

[![npm version](https://img.shields.io/npm/v/parity-ci.svg?style=flat-square)](https://www.npmjs.com/package/parity-ci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/parity-ci.svg?style=flat-square)](https://www.npmjs.com/package/parity-ci)

**[Installation](#-installation) • [Quick Start](#-quick-start) • [Features](#-features) • [Configuration](#%EF%B8%8F-configuration) • [CI/CD](#-cicd-integration) • [Documentation](#-documentation)**

![Parity Check Success](./assests/pass_check.png)

</div>

---

## 🎯 What is Parity?

**Parity** is a zero-config developer experience tool that ensures every engineer on your team—and your CI pipeline—runs the exact same environment configuration.

<table>
<tr>
<td width="50%">

### ✅ With Parity

- ✓ Consistent environments
- ✓ Caught issues early
- ✓ Fast onboarding
- ✓ CI/CD reliability

</td>
<td width="50%">

### ❌ Without Parity

- ✗ Runtime version mismatches
- ✗ Missing `.env` variables
- ✗ Package manager conflicts
- ✗ "Works on my machine" bugs

</td>
</tr>
</table>

---

## 📦 Installation

> **Choose your preferred package manager:**

<table>
<tr>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"/>

```bash
npm install -D parity-ci
```

</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220" alt="pnpm"/>

```bash
pnpm add -D parity-ci
```

</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="bun"/>

```bash
bun add -d parity-ci
```

</td>
</tr>
</table>

---

## 🚀 Quick Start

> **Get up and running in 3 simple steps**

### **Step 1️⃣ Initialize Configuration**

Generate a `.env.lock` file based on your current environment:

```bash
npx parity init
```

<details>
<summary>📸 <b>See what it looks like</b></summary>
<br>

![Init Command](./assests/init.png)

</details>

### **Step 2️⃣ Add to Your Workflow**

Integrate Parity checks into your `package.json` scripts:

```json
{
  "scripts": {
    "postinstall": "parity check",
    "dev": "parity check && next dev",
    "build": "parity check && next build"
  }
}
```

> **💡 Tip:** Using `postinstall` ensures checks run automatically after dependencies are installed.

### **Step 3️⃣ Commit & Share**

```bash
git add .env.lock
git commit -m "Add Parity configuration"
git push
```

<div align="center">

🎉 **Done!** Now every team member and CI run will validate against the same environment.

</div>

---

## ⚡ Features

<div align="center">

| Feature                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| 🔧 **Runtime Enforcement** | Lock Node/Bun versions with SemVer support            |
| 📦 **Package Manager**     | Prevent mixed npm/pnpm/yarn/bun usage                 |
| 🖥️ **Cross-Platform**      | Ensure OS compatibility across environments           |
| 🔐 **Env Validation**      | Validate required environment variables               |
| 📂 **Multiple Env Files**  | Load from multiple `.env` files with override support |
| 🆘 **Helpful CLI**         | Built-in help and clear error messages                |

</div>

---

### 🔧 Runtime & Version Enforcement

Ensure everyone uses the same Node/Bun version with support for strict versions or SemVer ranges.

<table>
<tr>
<td width="33%">

**✅ Success**

<details>
<summary>View screenshot</summary>

![Semver Success](./assests/pass_version.png)

</details>

</td>
<td width="33%">

**❌ Version Mismatch**

<details>
<summary>View screenshot</summary>

![Version Error](./assests/version_error.png)

</details>

</td>
<td width="33%">

**❌ Wrong Runtime**

<details>
<summary>View screenshot</summary>

![Runtime Error](./assests/runtime_error.png)

</details>

</td>
</tr>
</table>

---

### 📦 Package Manager Integrity

Stop mixed usage of `npm`, `pnpm`, `yarn`, and `bun` across your team.

<details>
<summary>❌ <b>Package Manager Mismatch Error</b></summary>
<br>

![Package Manager Error](./assests/package_manager_error.png)

</details>

---

### 🖥️ Cross-Platform Safety

Prevent platform-specific issues before they reach production.

<details>
<summary>❌ <b>OS Compatibility Error</b></summary>
<br>

![OS Error](./assests/os_error.png)

</details>

---

### 🔐 Environment Validation

Validate required `.env` variables before your application starts.

<details>
<summary>❌ <b>Missing Environment Variables</b></summary>
<br>

![Env Error](./assests/env_error.png)

</details>

---

### 📂 Multiple Env Files

Load environment variables from multiple files (e.g., `.env`, `.env.local`) with automatic overriding.

```yaml
envFiles:
  - .env
  - .env.local # Values here override .env
```

> **Note:** Files are loaded in order, with later files overriding earlier ones.

---

### 📖 Helpful CLI

Built-in help commands to guide you through setup and usage.

<details>
<summary>🆘 <b>Help Command Output</b></summary>
<br>

![Help Command](./assests/help.png)

</details>

---

## 🛠️ Configuration

Parity supports both **JSON** and **YAML** formats for the `.env.lock` file.

### **JSON Format**

```json
{
  "runtime": {
    "name": "node",
    "version": ">=18.0.0"
  },
  "packageManager": "pnpm",
  "os": ["darwin", "linux"],
  "envFiles": [".env", ".env.local"],
  "env": {
    "required": ["DATABASE_URL", "API_KEY"],
    "optional": ["DEBUG"]
  }
}
```

### **YAML Format**

```yaml
runtime:
  name: node
  version: ^25.2.0
  manager: npm

os: windows

envFiles:
  - .env
  - .env.local

env:
  DATABASE_URL: required
  API_KEY: required
  DEBUG: optional
```

<details>
<summary>📋 <b>Configuration Options Reference</b></summary>
<br>

| Option            | Type              | Description                                       |
| ----------------- | ----------------- | ------------------------------------------------- |
| `runtime.name`    | `string`          | Runtime name (`node` or `bun`)                    |
| `runtime.version` | `string`          | Version constraint (SemVer or exact)              |
| `packageManager`  | `string`          | Package manager (`npm`, `pnpm`, `yarn`, `bun`)    |
| `os`              | `string \| array` | Allowed OS platforms (`darwin`, `linux`, `win32`) |
| `envFiles`        | `array`           | List of env files to load                         |
| `env`             | `object`          | Required and optional environment variables       |

</details>

---

## 🤖 CI/CD Integration

> **Use the `--ci` flag to treat warnings as errors in CI environments**

### **GitHub Actions**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v3

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: 📦 Install dependencies
        run: npm install

      - name: ✅ Run Parity checks
        run: npx parity check --ci

      - name: 🧪 Run tests
        run: npm test
```

<details>
<summary><b>GitLab CI Example</b></summary>

```yaml
test:
  stage: test
  script:
    - npm install
    - npx parity check --ci
    - npm test
```

</details>

<details>
<summary><b>CircleCI Example</b></summary>

```yaml
version: 2.1

jobs:
  test:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm install
      - run:
          name: Run Parity checks
          command: npx parity check --ci
      - run:
          name: Run tests
          command: npm test
```

</details>

<details>
<summary><b>Jenkins Example</b></summary>

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Parity Check') {
            steps {
                sh 'npx parity check --ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
```

</details>

---

## 📚 Documentation

<div align="center">

| Document                                            | Description                        |
| --------------------------------------------------- | ---------------------------------- |
| **[📘 Getting Started](./docs/getting-started.md)** | Complete setup guide with examples |
| **[⌨️ Command Reference](./docs/commands.md)**      | Full CLI command documentation     |
| **[🧪 Testing & Scenarios](./docs/testing.md)**     | Test your Parity configuration     |
| **[❓ FAQ & Troubleshooting](./docs/faq.md)**       | Common issues and solutions        |

</div>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

<table>
<tr>
<td>

### 🐛 Report Bugs

Found a bug? [Open an issue](https://github.com/Pawandasila/parity-cli/issues)

</td>
<td>

### 💡 Suggest Features

Have an idea? [Start a discussion](https://github.com/Pawandasila/parity-cli/discussions)

</td>
<td>

### 🔧 Submit PRs

Want to contribute code? Follow our guide →

</td>
</tr>
</table>

**Development Setup:**

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/parity-cli.git

# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Make your changes and commit
git commit -m 'Add some AmazingFeature'

# 4. Push to your branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

MIT © [Pawandasila](https://github.com/Pawandasila)

---

<div align="center">

### ⭐ If you find Parity helpful, please consider giving it a star!

**[⬆ Back to top](#-parity-cli)**

<sub>Made with ❤️ by developers, for developers</sub>

</div>
