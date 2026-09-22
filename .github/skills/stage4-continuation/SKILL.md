---
name: stage4-continuation
description: Resume the project's Stage 4 implementation from repository state, infer the next authorized milestone task, implement only that task, verify it, and update the Stage 4 state ledgers.
---

# Stage 4 Continuation

Use this skill when the user asks to continue, proceed, move forward, implement the next task, or resume Stage 4 work in this repository without naming a milestone or task.

## Role and authority

Act as the Stage 4 Local Agentic AI Coding Workhorse under the Stage 4.1 Agent Operating Contract.

Read and follow:

- `docs/pipeline/stage-4-local-agentic-ai-coding-workhorse.md`
- `docs/pipeline/stage-4-1-agent-operating-contract.md`

Use this authority order:

1. Current explicit user instruction.
2. Approved milestone specifications in `docs/specs/`.
3. The current Stage 4 state in `docs/master/progress-tracker.md`.
4. `docs/master/current-issues.md` and repository evidence.
5. Existing implementation and verification results.

Never treat inference as fact. If authoritative sources conflict, stop and ask the user.

## Wake-up protocol

Before editing:

1. Read the Stage 4 State section at the top of `docs/master/progress-tracker.md`.
2. Read `docs/master/current-issues.md`.
3. Read the relevant milestone `requirements.md`, `design.md`, and `tasks.md`.
4. Read relevant `docs/Feature-spec/` files and handoff documentation.
5. Inspect the current implementation and available tests.
6. Identify completed work from repository evidence.
7. Select the earliest incomplete task whose dependencies are satisfied and whose task sequence is authorized by the progress tracker.

Do not ask the user to provide a milestone or task when the repository state identifies the next task clearly.

## Execution rules

For the inferred task:

1. State the selected milestone and task briefly in commentary.
2. Implement only that task and its directly required supporting changes.
3. Do not repeat completed work, skip ahead, invent requirements, or redesign the architecture.
4. Do not silently modify `requirements.md`, `design.md`, `tasks.md`, or `Feature-spec/`.
5. Record specification conflicts or missing authorization in `docs/master/current-issues.md`.
6. Do not deploy production systems; deployment belongs to Stage 5.

## Verification

After implementation:

- Inspect the final diff.
- Run the most relevant task-specific checks.
- Run `npm.cmd run typecheck`.
- Run `npm.cmd run lint`.
- Run `npm.cmd run build`.
- Run `git diff --check`.
- Confirm behavior against the task acceptance criteria.

If a check fails, fix failures within the current task scope. Otherwise document the failure honestly and stop before proceeding to another task.

## State updates

Update both state artifacts after verification:

### `docs/master/progress-tracker.md`

Record:

- Pipeline stage and status.
- Current phase, goalpost, and task.
- Completed goalposts.
- Last verified goalpost.
- Modified files.
- Exact verification results.
- Known issues.
- Next authorized task.
- Last updated date.

### `docs/master/current-issues.md`

Record blockers, specification drift, unresolved verification failures, and relevant environment limitations. Classify important conclusions as `FACT`, `INFERENCE`, or `UNKNOWN`.

## Completion report

Report using this format:

```text
STATUS:
[Completed / Blocked / Needs Clarification]

TASK:
[Inferred milestone and task]

IMPLEMENTED:
[Concise summary]

VERIFIED:
[Commands and results]

ISSUES:
[Known issues or None]

NEXT:
[Next authorized milestone/task]
```

Do not claim completion before verification. If no authorized incomplete task can be identified, report `Needs Clarification` and explain the exact state conflict.
