# Project Documentation

This directory contains maintainer documentation for the AEA Website Portfolio. The root [`README.md`](../README.md) is the quick-start overview; these guides provide the detailed contracts and workflows.

## Documentation map

- [`API.md`](./API.md) — API endpoint contracts, request formats, responses, and local verification.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) — Vercel deployment process, environment-variable guidance, troubleshooting, rollback procedure, and post-deployment verification.
- [`../DEPLOYMENT_CHECKLIST.md`](../DEPLOYMENT_CHECKLIST.md) — actionable pre-deployment, environment, build, post-deployment, and rollback checklist.
- [`../HANDOFF/`](../HANDOFF/) — M9 handoff package: project summary, content guide, user manual, support information, and package index.
- [`../FINAL_REVIEW.md`](../FINAL_REVIEW.md) — M9 final review, evidence, and release blockers.
- [`MAINTENANCE.md`](./MAINTENANCE.md) — recurring maintenance, content editing, validation, and troubleshooting.
- [`../specs/M9-QA-Handoff/`](../specs/M9-QA-Handoff/) — approved QA and handoff requirements, design, and task sequence.
- [`../master/progress-tracker.md`](../master/progress-tracker.md) — current Stage 4 implementation state.
- [`../master/current-issues.md`](../master/current-issues.md) — known blockers, limitations, and specification drift.

## Quick developer path

1. Install Node.js 18 or newer and npm.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and add only the provider values needed for local API work.
4. Run `npm run dev` and open the URL printed by Astro, normally `http://localhost:4321`.
5. Before submitting changes, run `npm run typecheck`, `npm run lint`, `npm run build`, and the relevant deterministic test command.

## Documentation boundaries

This Task 9.6 documentation covers development setup, component contracts, content management, and API behavior. Production deployment checklists, rollback procedures, and the client handoff package belong to the later M9 Tasks 9.7 and 9.8.
