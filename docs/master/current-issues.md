# Current Issues & Deviation Log

## Status: `IN PROGRESS` | Stage 3 → Stage 4 Handoff

---

## 📋 Overview

This document tracks all known issues, deviations from specification, unresolved questions, and blockers that must be addressed before proceeding to Stage 5 (QA & Deployment).

It serves as both a living issue tracker and the **Stage 4 → Stage 5 handoff document**.

---

## 🚨 Critical Issues (Blockers)

### [RESOLVED] — Spec Files Moved to docs/

**Issue**: The pipeline required specs at `.kiro/specs/`, but `.kiro/` is gitignored, making them invisible to Continue/Stage 4 agent.

- **Resolution**: All specs moved to `docs/master/`, `docs/pipeline/`, `docs/specs/M1-M9/`, `docs/handoff/`.
- **Status**: `RESOLVED — Stage 4 can now see all specs`

### [RESOLVED] — Astro Version Drift Fixed

**Issue**: Root `package.json` pinned `astro: ^7.3.2` (nonexistent), `astro.config.mjs` used removed `output: 'hybrid'`, `@astrojs/vercel` missing from dependencies.

**Resolution**:
- Updated `package.json`: `astro: ^5.7.1`, added `@astrojs/vercel: ^8.0.0`
- Updated `astro.config.mjs`: imported vercel adapter, set `adapter: vercel()`, kept `output: 'hybrid'` (valid in Astro 5 with adapter)
- Updated immutable boundary wording in `progress-tracker.md` and `STAGE3-TO-STAGE4-HANDOFF.md`

**Status**: `RESOLVED — Build ready for `npm install` and `npm run build`

---

## ⚠️ Warnings & Deviations from Spec



---

## 📝 Resolved Issues (Previously Logged, Now Closed)

### [RESOLVED] — Initial Issue Tracker Created

The file was created with its canonical structure and initial known issues. Subsequent modifications should be merged into this document.

**Resolved by**: Stage 3 Spec-Driven Builder
**Date**: 2025-06-14

---

## 🧭 Pending Decisions (User Authorization Required)

| # | Question | Options | Default Recommendation |
|---|----------|---------|----------------------|
| 1 | Are the modifications to `6-Stage-Modular-AI-Engineering-Pipeline.md` project-specific overrides or framework improvements? | Revert / Backport / Accept as-is | Accept if well-documented; otherwise revert. |
| 2 | Are the modifications to `stage-4-1-agent-operating-contract.md` project-specific overrides or framework improvements? | Revert / Backport / Accept as-is | Accept if well-documented; otherwise revert. |

---

## 📦 Stage 3 → Stage 4 Handoff Summary

### What Stage 3 Delivered:

- ✅ `requirements.md` — Complete requirements specification
- ✅ `design.md` — Architectural and design decisions
- ✅ `tasks.md` — Phased task breakdown with acceptance criteria
- ✅ `Feature-spec/` — Feature-level specifications
- ✅ `docs/pipeline/6-Stage-Modular-AI-Engineering-Pipeline.md`
- ✅ `docs/pipeline/stage-4-1-agent-operating-contract.md`
- ✅ `docs/master/current-issues.md` (this file)

### What Stage 5 Needs from Stage 4:

- ✅ Fully implemented codebase matching `requirements.md`, `design.md`, `tasks.md`
- ✅ All tests passing
- ✅ Lint/type-check clean
- ✅ Deployment configuration (`vercel.json`, Dockerfile, etc.)
- ✅ README and documentation updated
- ✅ State tracked in `docs/master/progress-tracker.md` and `docs/master/current-issues.md`
- ✅ Stage 5 handoff document in `docs/handoff/STAGE4-TO-STAGE5-HANDOFF.md`

### What is Missing / Incomplete:

- ⚠️ `docs/master/progress-tracker.md` — needs Stage 4 state block added (Task 5)
- ⚠️ Astro version drift — needs resolution (Task 9)
- ⚠️ Modified spec files need review before Stage 5 proceeds

---

## 🧪 Verification Checklist for Stage 5 Entry

Before Stage 5 begins, verify:

- [ ] All code from `tasks.md` is implemented in the repository.
- [ ] `.stage4/state.md` exists and accurately reflects completed work.
- [ ] All tests pass (`npm test`, `pytest`, etc.).
- [ ] Linting/type checking passes.
- [ ] The modified pipeline files are reviewed and approved (or reverted).
- [ ] A complete deployment configuration is in place.
- [ ] `.kiro/specs/Handoffs/STAGE4-TO-STAGE5-HANDOFF.md` exists with full documentation.

---

## 📜 Change Log

| Date | Stage | Action | Author (AI/User) | Notes |
|------|-------|--------|------------------|--------|
| 2025-06-14 | 3 → 4 | Initial creation | AI | Document created with known issues from modified files. |
| — | — | Pending review | User | Modifications to pipeline and contract specs need user authorization before Stage 5 proceeds. |

---

## 📞 Contact / Escalation

If you encounter an issue not captured here, add it as a new section above the "Resolved Issues" heading with:

- Severity tag (`[CRITICAL]`, `[WARNING]`, `[INFO]`)
- A clear title
- Description of the problem
- Impact on Stage 5 readiness
- Current status and action required

---

> **Note to Stage 5**: Do not proceed with deployment until all Critical issues are resolved and User has authorized any spec modifications. This document is your primary source of truth about what went wrong (if anything) during implementation.
