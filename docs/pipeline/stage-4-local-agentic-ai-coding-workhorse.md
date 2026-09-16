---
name: stage-4-local-agentic-ai-coding-workhorse
description: Stage 4 of the 6-Stage Modular AI Engineering Pipeline. Defines how the Local Agentic AI Coding Workhorse uses LM Studio on ASUS TUF A16 (Ryzen 9 270, Radeon 780M, RTX 5070 Laptop 8GB VRAM, 32GB RAM) to implement Stage 3 specs into a fully working codebase with implementation notes and dev logs, for handoff to Stage 5 (Cursor QA/Deployment).
---

# Stage 4: Local Agentic AI Coding Workhorse

## Purpose

Stage 4 is the Local Agentic AI Coding Workhorse using LM Studio on ASUS TUF A16. Its responsibility is to ingest the repository with Stage 3's specs (`docs/specs/<milestone>/{requirements.md,design.md,tasks.md}`), `docs/Feature-spec/`, `docs/master/current-issues.md`, then implement a fully working codebase with implementation notes and dev logs per phase, explicitly optimized for local GPU offloading on an RTX 5070 Laptop 8GB VRAM system, for handoff to Stage 5 (Senior QA & Deployment Engineer).

## Inputs

Stage 4 accepts:

- The repository containing:
    - `docs/specs/<milestone>/{requirements.md,design.md,tasks.md}` for M1–M9.
    - `docs/Feature-spec/` folder.
    - `docs/master/{current-issues.md,progress-tracker.md,architecture-context.md,code-standards.md,ai-workflow-rules.md}`.
    - `docs/handoff/` (Stage 2–3 handoff docs).
    - `docs/pipeline/stage-4-1-agent-operating-contract.md` (Control Plane).
    - Root `src/`, `api/`, `public/` directories (scaffolded but empty).
    - `package.json`, `tsconfig.json`, `astro.config.mjs` (root-level configs).


## Outputs

Stage 4 produces:

- A fully implemented codebase aligned with Stage 3 specs.
- Implementation notes and dev logs per phase (requirements → design → tasks → implementation).
- Handoff documentation for Stage 5 including:
    - implementation summary,
    - known issues,
    - test coverage notes,
    - deployment readiness,
    - "do not change" boundaries,
    - areas that need QA focus,
    - model used and any model-specific caveats,
    - dev logs of each phase.


## Allowed actions

- Implement tasks from `docs/specs/<milestone>/tasks.md` in order, per the milestone dependencies.
- Update `docs/master/progress-tracker.md` at the top of every session with current state.
- Log blockers and spec drift in `docs/master/current-issues.md` as FACT/INFERENCE/UNKNOWN with evidence.
- Use LM Studio with explicit hardware awareness (ASUS TUF A16, RTX 5070 8GB VRAM, 32GB RAM, prioritize full GPU offload).
- Select models appropriately: Qwen Coder for code, Gemma for reasoning. Verify models against LM Studio's `/v1/models` endpoint.
- Tailor outputs for Stage 5 (test structure, lint rules, deployment config hints).
- Produce implementation notes and dev logs per phase.
- Produce handoff documentation before Stage 5 entry.


## Forbidden actions

- No silent assumptions.
- No inventing requirements.
- No ignoring `docs/specs/` and `docs/master/current-issues.md`.
- No skipping handoff documentation.
- No silently modifying `requirements.md`, `design.md`, `tasks.md` — flag spec drift in `current-issues.md` instead (per Stage 4.1-E).
- No deploying or running production deployments (that is Stage 5's role).


## Handoff checklist

Before handing off to Stage 5, Stage 4 must ensure:

- The codebase is complete and aligns with Stage 3 specs.
- Implementation notes and dev logs per phase are present and consistent.
- Handoff documentation includes:
    - implementation summary,
    - known issues,
    - test coverage notes,
    - deployment readiness,
    - "do not change" boundaries,
    - areas that need QA focus,
    - model used and any model-specific caveats,
    - dev logs of each phase.
- The codebase can be handed directly to Stage 5 for QA and deployment.
- Another human can read Stage 4 and understand what it does in under 5 minutes.
- The implementation pattern is stable enough to reuse across similar projects on similar hardware (8–12 GB VRAM laptop GPU, 32GB RAM).


## Review gate

Follow autonomy rules from Stage 4.1-C:
- Proceed autonomously when specs are clear and evidence is sufficient.
- Ask when specs are ambiguous, contradictory, or require unauthorized architectural decisions.
- Do not ask unnecessary confirmation questions.


## Failure modes and escalation

- If specs are vague, clarify with the user before proceeding.
- If architectural redesign is required, stop and ask.
- If spec drift is detected, log in `docs/master/current-issues.md` and stop if authorization is needed.
- If the model cannot fit in VRAM, switch to a smaller quantization or different model.
- If `docs/master/current-issues.md` shows unresolved CRITICAL issues, do not proceed until resolved or authorized.


## Acceptance criteria

Stage 4 is complete when:

- All 9 milestones (M1–M9) are fully implemented.
- `docs/master/progress-tracker.md` shows all 9 milestones completed with verification passing.
- `docs/master/current-issues.md` has zero CRITICAL or BLOCKING issues (only known limitations documented).
- The codebase can be handed directly to Stage 5 for QA and deployment.
- Handoff documentation is complete and current.
- Another human can read this file and understand what Stage 4 does in under 5 minutes.