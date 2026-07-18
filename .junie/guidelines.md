# Agent Instructions

## Project Overview

This is a TypeScript AWS CDK project that provisions an example AWS stack containing an SQS queue
subscribed to an SNS topic. It is intended as a reference/template for CDK TypeScript projects and
demonstrates project tooling conventions (linting, formatting, testing, AI instruction syncing).

## Repository Structure

- `bin/` — CDK app entry point (`example-typescript-aws-cdk.ts`)
- `lib/` — CDK stack definitions (`example-typescript-aws-cdk-stack.ts`)
- `test/` — Jest unit tests for the stack and scripts
- `scripts/` — Helper scripts (e.g., `sync-agent-instructions.ts`)
- `AGENTS.md` — **Source of truth** for AI agent instructions; all other AI config files are synced
  from this file (do not edit the target files directly)

## Tech Stack

- **Language**: TypeScript (strict mode, ES2022, NodeNext modules)
- **IaC**: AWS CDK v2 (`aws-cdk-lib`)
- **Test runner**: Jest (with `@swc/jest` for fast transpilation)
- **Linter**: ESLint 9 with `typescript-eslint` and `eslint-plugin-import`
- **Formatter**: Prettier
- **Git hooks**: Husky + lint-staged

## Key Commands

| Command                                 | Description                                         |
| --------------------------------------- | --------------------------------------------------- |
| `npm run build`                         | Type-check the project (`tsc`)                      |
| `npm run watch`                         | Type-check in watch mode                            |
| `npm run test`                          | Run all Jest tests                                  |
| `npm run lint`                          | Lint all source directories                         |
| `npm run lint:fix`                      | Lint and auto-fix                                   |
| `npm run prettier`                      | Format all files                                    |
| `npm run prettier:test`                 | Check formatting without writing                    |
| `npm run sync:agent-instructions`       | Propagate `AGENTS.md` to all AI tool config files   |
| `npm run sync:agent-instructions:check` | Verify AI config files are in sync (used in CI)     |
| `cdk synth`                             | Emit the synthesized CloudFormation template        |
| `cdk deploy`                            | Deploy the stack to your default AWS account/region |
| `cdk diff`                              | Compare deployed stack with local state             |

## Development Guidelines

- **TypeScript strict mode is enabled.** All code must pass `tsc` without errors (`npm run build`).
- **Each directory (`bin/`, `lib/`, `test/`, `scripts/`) has its own `eslint.config.js`.** When
  linting, use the per-directory config; the root `eslint.config.js` is the base shared config.
- **Prettier is the formatter.** Never manually reformat code — run `npm run prettier` instead.
- **Tests live in `test/`.** Write Jest tests for new stack constructs and scripts. Run `npm run test`
  to validate.
- **Do not edit AI config files directly.** The files under `.claude/`, `.gemini/`, `.github/`,
  `.cursor/`, `.windsurf/`, and `.junie/` are auto-generated from `AGENTS.md`. Edit `AGENTS.md` and
  run `npm run sync:agent-instructions` to propagate changes.
- **No secrets in source code.** Do not commit AWS credentials, access keys, or any sensitive values.
- **CDK stack changes should be verified** with `cdk synth` before deploying to confirm the
  CloudFormation template renders correctly.
