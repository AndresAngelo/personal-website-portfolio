# Current Issues & Deviation Log

### [FACT][RESOLVED] M3 Task 3.11 integration testing

`npm.cmd run test:content` now validates all three Markdown collections and required frontmatter, checks collection loaders and card integration behavior, verifies pinned-project ordering wiring, and proves that an invalid project fixture causes the Astro build to fail. The temporary invalid fixture is removed in a `finally` block. Typecheck, lint, build, and diff checks pass on 2026-09-22. The next authorized task is M4 Task 4.1 Vector Database Setup.

### [FACT][RESOLVED] M3 Task 3.10 content configuration

`src/content.config.ts` registers the projects, activities, and FAQ collections with Astro glob loaders and their dedicated schemas. Typecheck, lint, build, and diff checks pass on 2026-09-22; the diff check reports only existing Windows line-ending warnings.

### [INFERENCE] Next authorized task

M3 Task 3.11 Integration Testing is authorized after the verified completion of Task 3.10.

This is the sole authoritative Stage 4 issue, blocker, verification, and specification-drift ledger. The companion state file is `docs/master/progress-tracker.md`.

## Status

**Overall status**: Stage 4 implementation in progress. Build, typecheck, lint, and production dependency audit now pass in the current Windows environment.

**Severity**: No confirmed CRITICAL or BLOCKING issue remains in the repaired validation path. Remaining entries are documentation drift, unknown handoff completeness, or informational environment notes.

### [FACT][RESOLVED] M3 Task 3.9 FAQCard

`src/components/FAQCard.astro` now renders FAQ collection data as responsive, collapsible cards. Native disclosure semantics provide keyboard accessibility; category and related-project metadata are supported; expand/collapse animation and reduced-motion behavior are included. Typecheck, lint, build, and diff checks pass on 2026-09-22.

### [FACT][RESOLVED] M3 Task 3.4 activities schema validation

`src/content/activities/schema.ts` validates required activity metadata, ISO `YYYY-MM-DD` dates, and optional activity media/link fields. Typecheck, lint, and build pass. The repository-wide diff check reports only generated `.astro/content-assets.mjs` whitespace; the task-file diff check passes.

### [FACT][RESOLVED] M3 Task 3.5 activities collection files

Six activity Markdown files now provide valid required frontmatter, chronological ISO dates, and representative optional media/link fields. Date extraction verifies chronological ordering from 2024-03-15 through 2026-01-24. Typecheck, lint, build, and `git diff --check` pass on 2026-09-22.

## Resolved Issues

### [FACT][RESOLVED] Specs moved into visible documentation paths

The pipeline originally expected specs beneath `.kiro/`, which is ignored in the repository. Specs now exist under `docs/master/`, `docs/pipeline/`, `docs/specs/`, and `docs/handoff/`.

### [FACT][RESOLVED] Astro/Vercel configuration and security baseline

The runtime now uses Astro `7.3.3` and `@astrojs/vercel` `11.0.10`, aligning the package configuration with the master architecture documents. The vulnerable `path-to-regexp` dependency is pinned through `package.json` overrides, and `npm.cmd audit --omit=dev` reports 0 production vulnerabilities.

Historical handoff files still contain Astro 5.x references.

### [FACT][RESOLVED] CI workflow added

`.github/workflows/ci.yml` exists and is configured for dependency installation, build, lint/type checks, and conditional Vercel deployment from `main`.

### [FACT][RESOLVED] Row-based implementation added

Commit `27ed7e5ac05623027a02fa0e9488a847003d8961` added the main row components, shared card/empty-state components, project filtering/search behavior, collection schemas, and deployment-related configuration.

### [FACT][RESOLVED] M2 Task 2.5 sidebar navigation and page integration

`src/pages/index.astro` now renders the approved Home, Projects, Activities, Experience, and Contact rows in one page. `src/components/SidebarNav.astro` provides anchor navigation, Intersection Observer active-section tracking, `aria-current` state, smooth scrolling through the document's CSS behavior, and a responsive mobile menu toggle. Typecheck, lint, build, and diff checks pass after the change.

### [FACT][RESOLVED] Astro syntax and embedded-artifact failures

The malformed `src/pages/components/home-row.astro` duplicate contained an appended transcript and invalid component-instance syntax. It was replaced with a valid Astro component. Related malformed Astro control-flow blocks, an invalid UTF-16 duplicate row file, and an embedded transcript in `src/pages/contact.astro` were corrected.

### [FACT][RESOLVED] Legacy content collection configuration

The Astro 7 upgrade rejected `src/content/config.ts`. Collections were migrated to `src/content.config.ts` using Astro's current `glob` loaders.

### [FACT][RESOLVED] Linting unavailable

The dependency tree was reconciled, `eslint-plugin-astro` and `@typescript-eslint/parser` were installed, and `eslint.config.mjs` was added. `npm.cmd run lint` now passes.

## Active Documentation Drift

### [FACT][OPEN] Conflicting milestone status

Older progress and issue documents claim Stage 4 or M1 completion, while the current repository shows substantial M2 work and no verified implementation of the RAG, PWA/i18n, security, performance, or final QA milestones.

### [FACT][OPEN] Historical path inconsistencies

Different documents reference `HANDOFF/`, `.kiro/specs/`, `public/Public materials/`, and simpler `public/` media paths. Current canonical documentation paths are under `docs/`; media paths require implementation-level verification.

### [FACT][RESOLVED] Duplicate issue trackers

`current-issues-new.md` duplicated this file's purpose. Its relevant content has been merged here and the redundant file was removed.

### [UNKNOWN][OPEN] Stage 4 implementation logs and handoff package

The Stage 4 contract requires implementation notes, development logs, and a Stage 5 handoff package. Their completeness cannot be established from the current issue tracker alone and must be verified before Stage 5 entry.

### [FACT][OPEN] Documentation encoding corruption

Several historical Markdown files contain garbled Unicode sequences. This does not necessarily affect runtime behavior but reduces documentation reliability and readability.

### [FACT][RESOLVED] M3 Task 3.7 FAQ collection schema

`src/content/faq/schema.ts` validates required question and answer fields plus optional non-empty categories and related project slug arrays. `src/content.config.ts` registers the dedicated schema. Typecheck, lint, and build pass on 2026-09-22. The repository-wide diff check reports only generated `.astro/content-assets.mjs` whitespace.

### [FACT][RESOLVED] M3 Task 3.8 FAQ collection files

Ten FAQ Markdown files now provide valid question, answer, and category frontmatter, with related project slugs on entries that reference known projects. Typecheck, lint, build, and `git diff --check` pass on 2026-09-22. The next authorized task is M3 Task 3.9 FAQCard Component.

## Verification Ledger

### [FACT][RESOLVED] M3 Task 3.3 ProjectCard component

`src/components/ProjectCard.astro` renders project collection data with image fallback, title, description, tags, project link, pinned indicator, responsive card styling, and reduced-motion handling. Typecheck, lint, production build, and `git diff --check` pass on 2026-09-22.

### [FACT][RESOLVED] M3 Task 3.2.1 pinned projects sorting

`src/lib/projects.ts` stably partitions projects into pinned and non-pinned groups, and `src/components/rows/ProjectsRow.astro` applies it to the Astro projects collection before rendering. Typecheck, lint, production build, and `git diff --check` pass on 2026-09-22.

### [FACT][RESOLVED] M3 Task 3.1 projects schema

The projects collection now uses the task-specific TypeScript schema in `src/content/projects/schema.ts`. Required project card metadata and optional media fields validate successfully through the Astro content sync and production build.

### [FACT][VERIFIED] Type checking

`npm.cmd run typecheck` passes (`tsc --noEmit`).

### [FACT][VERIFIED] Linting

`npm.cmd run lint` passes using the Astro flat ESLint configuration.

### [FACT][VERIFIED] Production build

`npm.cmd run build` passes and generates four static routes using the Windows WASI compiler fallback.

### [FACT][VERIFIED] Dependency audit

`npm.cmd audit --omit=dev` reports 0 production vulnerabilities.

### [FACT][INFO] Windows Astro compiler fallback

The local Windows Application Control policy blocks Astro's native compiler binding. `scripts/build-astro.mjs` forces Astro's WASI compiler fallback on Windows, and the build passes in this environment. On a fresh install under the same policy, install the fallback once with `npm.cmd install --no-save --force @astrojs/compiler-binding-wasm32-wasi@0.4.1` before running the build.

### [FACT][INFO] Astro build deprecation warning

The toolchain may report that Vite's `transformWithEsbuild` is deprecated in favor of `transformWithOxc`. This is non-blocking.

### [FACT][VERIFIED] Repository baseline

The latest inspected commit is `27ed7e5ac05623027a02fa0e9488a847003d8961`. The worktree was clean before this documentation and blocker-repair work.

## Pending Product or Architecture Decisions

- **Vector database**: Supabase Postgres with pgvector is recommended, but not finalized by implementation evidence.
- **Qwen model**: The exact Hugging Face/Qwen Instruct model variant is not finalized.
- **Translation workflow**: The production process for Tagalog, Mandarin, and Hindi content is not finalized.
- **Animation strategy**: Horizontal-scroll and row-transition performance requires measurement on target hardware.

### [UNKNOWN][OPEN] M2 live responsive viewport verification unavailable

Task 2.8 static responsive verification is complete. The repository contains explicit mobile (320px–767px), tablet (768px–1023px), and desktop (1024px+) rules, but this environment exposes no controllable browser surface for rendered viewport screenshots or interaction checks. This remains an environment limitation for Stage 5 QA, not a confirmed implementation defect.

## Stage 5 Readiness Checklist

- [x] Typecheck passes and is recorded.
- [x] Lint passes and is recorded.
- [x] Production build passes and is recorded.
- [x] Production dependency audit passes with zero reported vulnerabilities.
- [ ] M1-M3 implementation scope is reconciled against the repository.
- [ ] M4-M8 implementation status is verified rather than inferred.
- [ ] Responsive, accessibility, security, and performance checks are complete.
- [ ] Stage 4 implementation notes and dev logs exist.
- [ ] Stage 5 handoff documentation is complete.
- [ ] User approves any remaining architecture or specification decisions.

## Policy

### [FACT][RESOLVED] M3 Task 3.2 project files and resume resource

Three project Markdown files now validate through the projects collection, including required card metadata, optional media fields, and a pinned portfolio entry. The live resume download and concrete documentation references use `public/Public materials/faq/AAndres-resume-AUG2026.pdf`.

Stage 4 must not silently modify `requirements.md`, `design.md`, `tasks.md`, or `Feature-spec/`. Any specification conflict must remain documented here and be resolved through explicit authorization. Production deployment and final sign-off belong to Stage 5.

### [FACT][RESOLVED] M2 Task 2.6 page layout integration

`src/pages/index.astro` imports and renders the row components in the approved page layout. The rendered rows expose the `home`, `projects`, `activities`, `experience`, and `contact` section IDs consumed by `SidebarNav.astro`. Navigation-to-section integration is verified by successful typecheck, lint, build, and diff checks on 2026-09-22.

### [FACT][RESOLVED] M2 Task 2.7 row animations

`src/pages/index.astro` now adds one-time viewport entry animations to the integrated rows through `IntersectionObserver`, preserves progressive enhancement when JavaScript is unavailable, and disables motion transitions when `prefers-reduced-motion: reduce` is active. Smooth scrolling remains provided by the existing document behavior. Typecheck, lint, build, and diff checks pass on 2026-09-22.

### [FACT][OPEN] M2 task-file status drift

`docs/specs/M2-Rows-Nav/tasks.md` still labels Tasks 2.3 through 2.6 as TODO even though the current implementation and verification records show those components and page integration present. The specification file is immutable under Stage 4 rules and was not modified. This is documentation drift, not a runtime blocker.

### [FACT][RESOLVED] M2 Task 2.8 static responsive verification

Responsive implementation rules were checked against the M2 acceptance criteria and required breakpoint ranges. Sidebar navigation collapses below 768px, tablet navigation reduces labels between 768px and 1023px, and row layouts provide mobile stacking/list behavior with desktop grids or full-width sections. Typecheck, lint, build, and diff checks pass on 2026-09-22. Exact rendered viewport behavior remains an UNKNOWN because no browser surface is available.

### [FACT][RESOLVED] M3 Task 3.6 ActivityCard

`src/components/ActivityCard.astro` was added for activity collection data. It supports required activity metadata, optional background imagery and links, semantic UTC-safe date display, responsive layout, keyboard-visible links, and reduced-motion behavior. Typecheck, lint, build, and diff checks pass on 2026-09-22.
