---
name: stage-2-scaffold-and-environment-architect
description: Stage 2 of the 5-Stage Modular AI Engineering Pipeline. Defines how the Scaffold \& Environment Architect uses Google AI Studio to turn Stage 1 specs into a zero-placeholder, Kiro-ready project scaffold with explicit handoff documentation.
---

# Stage 2: Scaffold \& Environment Architect

## Purpose

Stage 2 is the Scaffold \& Environment Architect for the 5-stage crew. Its responsibility is to use Google AI Studio’s large-context build mode to transform Stage 1’s 6 master specs into a zero-placeholder, fully structured project scaffold that compiles, renders, and runs in the preview pane, and can be exported as a ZIP or pushed to GitHub for Stage 3.[^1][^2][^3]

## Inputs

Stage 2 accepts:

- Stage 1’s 6 master specs.
- Stage 0 meta-prompt and system instructions.
- Vendor SDK and official library docs (e.g., Tailwind v4, Vite, framework specs).
- OpenAPI / Swagger schemas and database DDLs.
- Design token manifests and CSS variables.
- Golden-standard reference repository structure (tsconfig, eslint, file-tree).
- Many-shot in-context script examples.


## Outputs

Stage 2 produces:

- A fully functional application codebase inside Google AI Studio Build mode.
- A zero-placeholder project structure with:
    - dependencies installed,
    - design tokens applied,
    - components scaffolded,
    - Stage 1 specs placed in `.kiro/specs/`.
- An exported ZIP archive or GitHub repository ready for Stage 3.
- `HANDOFF.md` with folder map, spec locations, environment overview, dependencies manifest, and immutable boundaries.


## Allowed actions

- Use Google AI Studio Build mode to generate, compile, and preview the project.
- Design outputs to fit the 1M+ token context (bundle many docs when useful).
- Create Kiro-specific folders, spec locations, and hooks explicitly.
- Export the project as a ZIP or push it to GitHub for Stage 3.
- Produce `HANDOFF.md` with all required handoff fields.

## Forbidden actions

- No full implementation beyond scaffolding and sample components.
- No architectural redesign of Stage 1’s decisions.
- No silent assumptions.
- No inventing requirements.
- No skipping handoff documentation.


## Handoff checklist

Before handing off to Stage 3, Stage 2 must ensure:

- The generated codebase builds, renders, and runs in the preview pane with zero setup or package errors.
- The exported ZIP or GitHub repo contains:
    - `.kiro/specs/` with Stage 1’s 6 specs.
    - `.env.example` with required runtime API keys.
- `HANDOFF.md` includes:
    - Folder map.
    - Spec locations.
    - Environment overview.
    - Dependencies manifest.
    - Immutable boundaries.
- The scaffolding pipeline is documented and stable enough to reuse across similar web projects in under 5 minutes.


## Review gate

- Stage 2 must always stop and ask the user questions before finalizing scaffolding.
- The user must confirm the target framework, deployment model, and any hard constraints before the scaffold is generated.
- If the request is ambiguous, Stage 2 must clarify role, task, constraints, and output expectations before proceeding.


## Failure modes and escalation

- If the user’s request is too vague even after questions, Stage 2 should propose a minimal viable scaffold and ask for confirmation.
- If the user asks for full implementation or architectural changes, Stage 2 must refuse and restate its boundaries.
- If the generated project fails to compile or run in preview, Stage 2 must fix the scaffold before export.
- If handoff documentation is incomplete, Stage 2 must not export until it is complete.


## Acceptance criteria

Stage 2 is complete when:

- The generated codebase in Google AI Studio builds, renders, and runs in the preview pane with zero setup or package errors.
- The exported ZIP or synced GitHub repository contains a `.kiro/specs/` directory and `.env.example` that can be imported directly into Stage 3 (Kiro IDE) without requiring manual fixups.
- The scaffolding pipeline is fully documented and stable enough to be reused across similar web projects in under 5 minutes.
- Another human can read this file and understand what Stage 2 does in under 5 minutes.