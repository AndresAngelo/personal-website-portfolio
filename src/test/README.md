# Test Suite

The repository uses a lightweight, dependency-free test harness for deterministic integration checks. Existing milestone contracts live in `scripts/` and use Node's built-in `node:assert/strict`; TypeScript-backed checks run through the existing `tsx` development dependency.

## Layout

- `src/test/e2e/` — browser journey tests added in M9 Task 9.2.
- `src/test/unit/` — focused component and utility tests added in M9 Task 9.3.
- `src/test/api/` — endpoint contract tests added in M9 Task 9.4.
- `src/test/utils/` — shared test helpers and fixtures.

Task 9.1 establishes these boundaries and the runner contract. Test cases are intentionally added by their dependent tasks rather than fabricated during setup.

## Commands

- `npm.cmd test` runs the complete deterministic test suite through `scripts/test-suite.mjs`.
- `npm.cmd run test:m4` through `npm.cmd run test:m8` run individual milestone contracts.
- `npm.cmd run typecheck`, `npm.cmd run lint`, and `npm.cmd run build` validate the application toolchain.

The suite exits non-zero on the first failed contract and prints each command's output. CI publishes the captured result in the GitHub Actions job summary and uploads the log as an artifact when available.
