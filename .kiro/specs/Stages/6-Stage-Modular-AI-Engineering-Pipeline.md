---
name: six-stage-modular-ai-engineering-pipeline
description: A reusable, hallucination-fearing, spec-first workflow for a 6-role AI tool crew with Stage 4.1 Control Plane, designed to avoid paywalls and deliver deterministic handoffs from meta-prompting to deployment.
---

# 6-Stage Modular AI Engineering Pipeline

## Purpose

This document defines a reusable, project-independent pipeline that governs how a six-role AI crew works across web and app projects. It is the root architecture file for the framework and should be copied into each new Space or repository as the stable operating reference for the six-stage workflow.

## Core idea

The pipeline is a hallucination-fearing, spec-first workflow that:

- Uses a 6-role AI tool crew across six deterministic stages.
- Includes Stage 4.1 Agent Operating Contract as the Control Plane for Stage 4.
- Avoids paywalls by relying on free-tier or project-level access tools.
- Requires explicit handoff documentation between every stage.
- Keeps stage roles and principles fixed while allowing project overview and scope to change per project.
- Makes repository state (not conversation memory) responsible for continuity.


## Crew model

| Stage | Role / Name | Tool / Platform | Primary Responsibility | Key Deliverable |
| :-- | :-- | :-- | :-- | :-- |
| **Stage 0** | Meta-Prompt Engineer | Gemini Custom Gems | Help the user create meta-prompts and system instructions for other stages. | Meta-prompt tailored to the user's request. |
| **Stage 1** | Research & Specs Hub | Perplexity Space | Perform web-backed research and synthesize the initial 6-file AI development method. | Chat-backed research with references, leading to 6 master spec files and raw external technical assets for a 1M+ token context window. |
| **Stage 2** | Scaffold & Environment Architect | Google AI Studio | Use the 1M+ token context to design scaffolding and initial environment setup, ready for Kiro. | Scaffolding plan and environment setup instructions. |
| **Stage 3** | Spec-Driven Builder | Kiro IDE (Auto Mode) | Ingest markdown artifacts and 6-file methodology to produce spec structure and task-level instructions. | `requirements.md`, `design.md`, `tasks.md`, `Feature-spec/`, `current-issues.md`, and handoff documentation for Stage 4. |
| **Stage 4** | Local Agentic AI Coding Workhorse | LM Studio (ASUS TUF A16, RTX 5070 Laptop 8GB VRAM) | Implement Stage 3 specs into a fully working codebase with implementation notes and dev logs, optimized for local GPU offloading. | Fully implemented codebase with implementation notes, dev logs per phase, and handoff documentation for Stage 5. |
| **Stage 4.1** | Agent Operating Contract & Control Plane | LM Studio (loaded as system prompt) | Govern every invocation of Stage 4 with wake-up protocol, state management, task continuation, and anti-hallucination protocols. | Persistent behavioral and state-management layer enabling task continuity across sessions without conversation memory. |
| **Stage 5** | Senior QA & Deployment Engineer | Cursor IDE | Polish the Stage 4 output and prepare final deployment. | Polished, production-ready project and deployment configuration. |


## Operating principles

- Specs before code.
- No silent assumptions.
- Every handoff is documented.
- Ask the user to eliminate contextless build.
- Prefer explicit, reviewable artifacts over implicit context.
- Repository state is the source of truth (not conversation memory).


## Handoff rules

- No stage may start until the previous stage's deliverable exists and is marked reviewed.
- If a stage changes scope, it must update the project overview and progress tracker before continuing.
- Always check the previous stage's handoff documentation; if missing, do not proceed.
- Each stage must produce a clear, named artifact that the next stage can read without reinterpretation.


## Stage file roles

### Stage 0: Meta-Prompt Engineer

- Produces meta-prompts and system instructions that other stages will use.
- Does not implement features or write project code.
- Focuses on clarity, constraints, and role definitions for downstream stages.


### Stage 1: Research & Specs Hub

- Produces:
    - Research-backed conversation with references.
    - The 6 master spec files:
        - `ai-workflow-rules.md`
        - `architecture-context.md`
        - `code-standards.md`
        - `progress-tracker.md`
        - `project-overview.md`
        - `ui-context.md`
    - Raw official external technical assets and documentation to fully utilize the 1M+ token context window.
- These master files are the canonical spec set, but Stage 1 may create additional supporting context files when they materially improve implementation accuracy.


### Stage 2: Scaffold & Environment Architect

- Consumes Stage 1's 6 master specs and supporting context.
- Produces:
    - Scaffolding strategy.
    - Initial environment setup plan.
    - Commands or instructions ready to be executed to prepare the project for Kiro.


### Stage 3: Spec-Driven Builder

- Consumes:
    - 6 master spec files.
    - Scaffolding and environment context from Stage 2.
    - Any additional spec documents required by Kiro's spec workflow.
- Produces:
    - A complete spec-driven project structure with:
        - `requirements.md`
        - `design.md`
        - `tasks.md`
        - `Feature-spec/` folder
        - `current-issues.md`
    - Handoff documentation for Stage 4.


### Stage 4: Local Agentic AI Coding Workhorse

- Consumes:
    - The Stage 3 codebase structure (`requirements.md`, `design.md`, `tasks.md`, `Feature-spec/`, `current-issues.md`).
    - Stage 2's scaffolded repo.
    - Stage 1 research docs.
    - Stage 0 meta-prompt.
    - Stage 1, 2, 3 `HANDOFF.md` files.
    - 6-man architecture documentation.
    - Stage 4.1 system prompt and control plane.
- Produces:
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
- Hardware context:
    - Device: ASUS TUF A16 (2025).
    - CPU: Ryzen 9 270 with Radeon 780M graphics.
    - GPU: NVIDIA GeForce RTX 5070 Laptop GPU, 8GB VRAM.
    - RAM: 32GB system RAM.
    - Tool: LM Studio with full GPU offloading prioritized.


### Stage 4.1: Agent Operating Contract & Control Plane

- **Purpose**: Establish the persistent behavioral, contextual, and state-management layer that governs every invocation of Stage 4.
- **Location**: `stage-4-1-agent-operating-contract.md` (this file is loaded as the system prompt for Stage 4).
- **Components**:
    - **System Prompt**: Who am I and how must I behave?
    - **Wake-Up Protocol**: What must I do every time I receive a request?
    - **State Management**: Where am I in the project? (`.stage4/state.md`)
    - **Task Continuation Protocol**: How do I execute one goalpost safely?
- **Key principle**: Do not make conversation memory responsible for continuity. Make the repository responsible for continuity.
- **Autonomy rules**:
    - Proceed autonomously when specs are clear and evidence is sufficient.
    - Ask the user when specs are ambiguous, contradictory, or require unauthorized architectural decisions.
- **State file**: `.stage4/state.md` tracks current phase, goalpost, completed tasks, modified files, verification results, known issues, and next authorized task.


### Stage 5: Senior QA & Deployment Engineer

- Consumes:
    - The Stage 4 codebase and handoff documentation.
- Produces:
    - Polished code with QA improvements.
    - Deployment configuration and final release artifacts.


## Stage boundaries

- Stage 0 must not contain project-specific implementation details.
- Stage 1 must stay project-independent in its rules, but can load project-specific research and specs.
- Stage 2 should focus on scaffolding and environment, not full implementation.
- Stage 3 should produce the spec-driven structure, not full implementation.
- Stage 4 should implement from specs, not re-architect or re-spec the system.
- Stage 4.1 governs Stage 4 behavior but does not implement features itself.
- Stage 5 should refine and deploy, not re-architect or re-spec the system.


## Review gates

- Hard review gates are required between Stage 3 and Stage 4, and between Stage 4 and Stage 5.
- Before Stage 3 begins generating spec structure, the user must review and approve the spec set and scaffolding context.
- Before Stage 4 begins implementation, the user must review and approve the Stage 3 spec structure and confirm readiness for coding.
- Before Stage 5 begins polishing and deployment, the user must review the Stage 4 output and confirm readiness for QA and release.


## Reuse rule

- The stage roles and principles are fixed; only project overview and scope change per project.
- When copied into a new Space or repository, this file should remain valid without editing its core meaning.
- Project-specific content lives in the project-loaded context files, not in this pipeline file.


## Out of scope

- This file does not define a specific product, brand, feature set, or implementation stack.
- It does not replace the 6 master spec files; it defines how they fit into the pipeline.
- It does not prescribe exact tool configurations beyond the named platforms.
- It does not replace Stage 4.1; it references Stage 4.1 as the Control Plane for Stage 4.


## Acceptance criteria

This file is complete when:

- It can be pasted into any new Space and start working immediately.
- Each stage's input and output are obvious.
- Each stage has handoff documentation rules so no hallucination occurs in the AI tool jump.
- A new teammate can read it and understand the workflow in under 10 minutes.
- Stage 4.1 is clearly identified as the Control Plane enabling task continuity across sessions.
