---
name: stage-3-spec-driven-documents-generator
description: Stage 3 of the 5-Stage Modular AI Engineering Pipeline. Defines how the Spec-Driven Documents Generator uses Kiro IDE + Qwen Coder Next to produce requirements.md, design.md, and tasks.md only, with no implementation code, for handoff to Stage 4 (LM Studio local agentic AI).
---

# Stage 3: Spec-Driven Documents Generator

## Purpose

Stage 3 is the Spec-Driven Documents Generator using Kiro + Qwen Coder Next. Its responsibility is to ingest Stage 2's scaffolded repo with the 6 master specs, `HANDOFF.md` from Stage 1 and 2, and Stage 1 research docs, then execute Kiro's native spec-driven workflow to produce `requirements.md`, `design.md`, and `tasks.md` only, with no implementation code, for handoff to Stage 4 (LM Studio local agentic AI).

## Inputs

Stage 3 accepts:

- Stage 2's scaffolded repo.
- `.kiro/specs/` with the 6 master specs.
- Stage 0 meta-prompt.
- Stage 1 research docs.
- Stage 2 `HANDOFF.md`.
- Any additional design or API docs provided by the user.


## Outputs

Stage 3 produces:

- Kiro's standard spec-driven document format:
    - `requirements.md` (or `bugfix.md` when applicable) with user stories and acceptance criteria in EARS notation.
    - `design.md` with technical architecture, data flow, interfaces, and implementation considerations.
    - `tasks.md` with discrete, dependency-ordered implementation tasks linked to requirements.
- `Feature-spec/` folder structure under `.kiro/specs/<feature-name>/` as Kiro generates it.
- `current-issues.md` for debugging and issue-fixing context when relevant.
- Handoff documentation for Stage 4 including:
    - spec summary,
    - known ambiguities,
    - "do not change" boundaries,
    - areas that need implementation focus,
    - constraints from Stage 1/2 that must be preserved.


## Allowed actions

- Use Kiro's three-phase workflow with separate phases and review gates:
    - Requirements or Bug Analysis phase.
    - Design phase.
    - Tasks (implementation plan) phase.
- Use Qwen Coder Next (0.05× credit multiplier) as the model for spec generation.
- Stop and ask the user questions only when the stakes are high (e.g., major architecture or security decisions).
- Tailor outputs explicitly for Stage 4 (LM Studio local agentic AI on ASUS TUF A16 with Ryzen 9 270, Radeon 780M, RTX 5070 Laptop 8GB VRAM, 32GB RAM).
- Keep specs and implementation synchronized; update specs when behavior changes.
- Produce handoff documentation before handing off to Stage 4.


## Recommended Generation Strategy (Optimized for Qwen Coder Next)

Based on experience with the AEA Personal Portfolio project, the following approach optimizes credit usage with Qwen Coder Next:

1. **Use subagents with preset="requirements" or preset="design"** - This triggers Kiro's native spec workflow using the appropriate subagent which is more efficient than direct generation

2. **Generate specs milestone-by-milestone** rather than all at once:
   - Process milestones in dependency order (M1 → M2 → M3...)
   - Each milestone gets 3 files: requirements.md, design.md, tasks.md
   - This provides natural review gates and reduces context overhead

3. **For content collection schemas**, create content config first then generate corresponding specs:
   - Update `src/content/config.ts` with media fields
   - Update sample files with placeholder comments
   - Generate spec files for content milestone
   - This ensures specs match actual implementation

4. **Use invoke_sub_agent for file creation** instead of shell commands when possible:
   - More reliable across different environments
   - Better error handling
   - Less prone to escaping issues

5. **Keep specs focused on one concern per milestone**:
   - M1 = Infrastructure setup (no content)
   - M2 = UI layout (no content data)
   - M3 = Content collections (data only)
   - This separation makes specs easier to understand and verify


## Forbidden actions

- No implementation code generation.
- No architectural redesign of Stage 1/2 decisions.
- No silent assumptions.
- No inventing requirements.
- No ignoring specs.
- No skipping handoff docs.
- No mixing spec generation with code changes.


## Handoff checklist

Before handing off to Stage 4, Stage 3 must ensure:

- `requirements.md`, `design.md`, and `tasks.md` are present and consistent with each other.
- `Feature-spec/` folder contains all feature specs being developed.
- `current-issues.md` is up to date with any debugging or issue-fixing context.
- Handoff documentation includes:
    - spec summary,
    - known ambiguities,
    - "do not change" boundaries,
    - areas that need implementation focus,
    - constraints from Stage 1/2 that must be preserved.
- The spec docs can be handed directly to Stage 4 for implementation.
- Another human can read Stage 3 and understand what it does in under 5 minutes.
- The spec pattern is stable enough to reuse across similar projects.


## Review gate

- Stage 3 must stop and ask the user questions when the stakes are high (e.g., major architecture or security decisions).
- The user must approve:
    - requirements,
    - design,
    - tasks,
before handoff to Stage 4.
- If the request is ambiguous in high-stakes areas, Stage 3 must clarify role, task, constraints, and output expectations before proceeding.


## Failure modes and escalation

- If the user's request is too vague in high-stakes areas, Stage 3 should propose a minimal viable spec set and ask for confirmation.
- If the user asks for implementation code or architectural redesign, Stage 3 must refuse and restate its boundaries.
- If specs drift from the 6 master specs or Stage 2 constraints, Stage 3 must update the specs before continuing.
- If handoff documentation is incomplete, Stage 3 must not hand off until it is complete.
- If `current-issues.md` shows unresolved blocking issues, Stage 3 must resolve or document them before handoff.


## Acceptance criteria

Stage 3 is complete when:

- The spec docs can be handed directly to Stage 4 for implementation.
- Another human can read this file and understand what Stage 3 does in under 5 minutes.
- The spec pattern is stable enough to reuse across similar projects.
- Every spec generation is preceded by clarifying questions when stakes are high and includes handoff documentation.
- `Feature-spec/` and `current-issues.md` are present and up to date.