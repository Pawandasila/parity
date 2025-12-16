# Contributing to Parity

We welcome contributions! Please follow this guide to set up your development environment.

## Prerequisites

- Node.js (Latest LTS recommended)
- npm

## Development Setup

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the development build with watch mode:

    ```bash
    npm run dev
    ```

    This will watch for changes in `src/` and rebuild `dist/`.

## Running Tests

We use `vitest` for testing.

```bash
npm run test
```

## Creating a Pull Request

1.  Fork the repo.
2.  Create a feature branch.
3.  Commit your changes.
4.  Push to your fork and submit a PR.

## Code Style

- We use TypeScript.
- Follow the existing code style.
- Ensure `npm run check` passes (this runs type checking).
