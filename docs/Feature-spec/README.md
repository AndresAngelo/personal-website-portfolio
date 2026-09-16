# Feature Specifications

This folder contains feature-level specifications referenced by the Stage 3 and Stage 4 specifications.

## Purpose

Feature-spec files break down individual features or components into more granular requirements, design decisions, and acceptance criteria than the milestone-level `requirements.md`, `design.md`, and `tasks.md` documents provide.

## Structure

Each feature should have its own folder or markdown file:

```
Feature-spec/
├── [feature-name]/
│   ├── README.md (optional overview)
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
└── [feature-name].md (or individual feature file)
```

Or a flat structure if features are small:

```
Feature-spec/
├── feature-1.md
├── feature-2.md
└── feature-3.md
```

## When to Use

Reference Feature-spec files when:

- A milestone or task needs more detail than the parent spec provides.
- A feature has cross-cutting concerns (e.g., authentication, error handling) that apply across multiple components.
- A reusable pattern or architecture needs explicit documentation.
- Stage 4 implementation requires fine-grained acceptance criteria per feature.

## Example

If the `M2-Rows-Nav` milestone has a feature "Auto-hiding Sidebar Navigation," you might create:

```
Feature-spec/auto-hiding-sidebar/
├── requirements.md
├── design.md
└── tasks.md
```

And reference it from `docs/specs/M2-Rows-Nav/tasks.md` with:

```markdown
See `docs/Feature-spec/auto-hiding-sidebar/` for detailed design and acceptance criteria.
```

## Current Status

This folder is a placeholder. Add feature specifications as they are identified during Stage 4 implementation.

---

**Related**: `docs/pipeline/stage-4-1-agent-operating-contract.md` (Section 4.1-E) requires that Stage 4 does not silently modify specifications. Flag any feature-specific scope changes or new features here rather than editing the milestone tasks directly.
