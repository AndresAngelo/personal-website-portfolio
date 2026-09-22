---
name: commit-progress-update
description: 'Use when committing repo changes, checking the status in docs/master/progress-tracker.md and docs/master/current-issues.md, and leaving a short commit update summarizing verification and implementation status.'
argument-hint: 'Commit my changes, verify the tracker and current issues, and leave a brief update comment.'
user-invocable: true
---

# Commit Progress Update

## When to Use
- Before finalizing a code or doc change set into a commit
- After implementing a milestone or task update in the portfolio project
- When the repository status must be synchronized with the progress tracker and issue ledger
- When you need a brief update note tied to the commit itself

## Goal
Produce a clean commit that includes the actual implementation evidence, reconciles the repository state against the progress tracker and current issues, and leaves a concise update stating what changed and what was verified.

## Procedure

### 1. Check the working state
- Review the repo status before editing or committing.
- Confirm whether the work is code, configuration, docs, or a mixed update.
- If unrelated files are dirty, keep the commit scoped to the intended change set.

Suggested checks:
- `git status --short`
- `git diff --stat`
- `git diff --check`

### 2. Validate the change set
Run the smallest relevant verification set for the change.

For this project, use the verified baseline sequence when there is a feature or integration change:
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd audit --omit=dev`
- `git diff --check`

If a task is documentation-only, still confirm the tracker and current-issue state before committing.

### 3. Review the authoritative tracker and issue ledger
Before committing, read the repository’s authoritative status files:
- `docs/master/progress-tracker.md`
- `docs/master/current-issues.md`

Use them to answer:
- Is the current milestone still accurate?
- Did the change complete or unblock a task already listed?
- Are there known drift or unresolved issues that must be recorded?
- Is the work consistent with the current Stage 4/Stage 5 status, or does it require a note in the issue log?

### 4. Decide whether to record a status update
If the change is part of a milestone or moves the repository from one verified state to another, update the relevant section in the tracker or issue file before the commit.

Use this decision tree:
- If a task is completed and verified: mark it as complete in the tracker.
- If a blocker or drift is discovered: record it in `current-issues.md` with a `[FACT]` or `[UNKNOWN]` label.
- If content is historical or stale but unchanged: do not rewrite spec files; instead document the drift.
- If no repo state change occurred: keep the commit message focused and do not create artificial status changes.

### 5. Write the commit message
Use a compact, evidence-based summary.

Preferred structure:
- Subject: short milestone/task oriented summary
- Body: includes scope, verification, and any tracker update

Example format:

```text
M2 Task 2.8: responsive verification update

- review responsive behavior and responsive breakpoints
- verify navigation, stacked layouts, and mobile menu behavior
- update tracker/current issues to reflect verified status and environment limits

Verification:
- npm.cmd run typecheck: PASS
- npm.cmd run lint: PASS
- npm.cmd run build: PASS
- git diff --check: PASS

Status note:
- live browser viewport testing remains unavailable in this environment; static responsive verification is complete
```

### 6. Commit the changes
Stage the intended files and create the commit.

Typical flow:
- `git add <files>`
- `git commit -m "<summary>"`

Keep the scope narrow and aligned with the tracker state.

### 7. Post the update with the commit
After the commit is created, leave a brief update tied to it.

Use one of these patterns:
- If GitHub is available: post a short commit or PR comment summarizing the milestone and evidence.
- If GitHub tooling is unavailable: include the same summary in the commit body or in the project tracker issue note.

Template:

```text
Update: <milestone/task name> completed.
Verification: typecheck, lint, build, and diff checks passed.
Tracker: <progress-tracker.md> updated to reflect current status.
Issues: <current-issues.md> records any unresolved drift or environment limitations.
```

### 8. Final sanity check
Before finishing:
- Confirm the commit exists and matches the intended files.
- Re-read the tracker and current-issues entries for consistency.
- Verify the summary does not claim live-browser verification when it was not performed.

## Completion Criteria
The workflow is complete only when all are true:
- The change set is committed with a concise, evidence-based message.
- `docs/master/progress-tracker.md` reflects the actual repository status.
- `docs/master/current-issues.md` documents any remaining drift, blockers, or environment limits.
- The commit update clearly describes what changed and what was verified.
- No unsupported claim is made about browser or runtime validation that was not actually performed.

## Guardrails
- Do not edit immutable spec files in `docs/specs/` during Stage 4 without explicit authorization.
- Do not claim full QA or Stage 5 readiness without evidence.
- If the repo is missing a browser surface, record that as an environmental limitation instead of a false success.
- Keep status updates factual and tied to verification results, not assumptions.

## Example prompts
- "Commit the navigation and row integration work and update the tracker with the verified status."
- "Prepare a final commit for the responsive validation work and record the environment limitation in current-issues.md."
- "Stage the docs and code update, verify the build, and leave a commit update summarizing the tracker status."
