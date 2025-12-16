# Getting Started with Parity

Parity is a CLI tool designed to help you maintain environment consistency across your projects.

## Installation

You can install Parity globally or as a dev dependency in your project.

### Global Installation

```bash
npm install -g parity-cli
# or if running from source locally
npm link
```

### Local Installation

```bash
npm install --save-dev parity-cli
```

## Basic Usage

Run the consistency check:

```bash
parity check
```

Or with `npx` if installed locally:

```bash
npx parity check
```

## CI Mode

For Continuous Integration environments, use the `--ci` flag for strict checking:

```bash
parity check --ci
```
