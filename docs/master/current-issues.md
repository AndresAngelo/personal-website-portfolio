# Current Issues & Deviation Log

### [FACT][RESOLVED] M6 Task 6.9 testing

`scripts/test-m6-integration.mjs` and `npm.cmd run test:m6` validate the PWA manifest, service-worker install/activate/fetch behavior with cache-first static and network-first API handling, translation-key parity, locale-prefixed routing, and language preference persistence/URL construction. The test found that the active static home routes lacked manifest and service-worker integration; `src/pages/index.astro` and `src/pages/[lang]/index.astro` now provide both. Typecheck, lint, build, and diff checks pass on 2026-09-22. Lighthouse PWA audit is UNKNOWN because no browser audit surface is available in this environment. Existing duplicate-route, POST-only API, and Windows line-ending warnings remain non-blocking. The next authorized task is M7 Task 7.1 Performance Audit Setup.

### [FACT][RESOLVED] M6 Task 6.8 i18n integration

Locale-aware translation lookup is now integrated into section navigation, the shared layout, home/contact/activity/experience content, and static `/en/` and `/es/` home routes. Typecheck, lint, build, and diff checks pass on 2026-09-22. Existing duplicate-route, POST-only API, and Windows line-ending warnings remain non-blocking. The next authorized task is M6 Task 6.9 Testing.

### [FACT][RESOLVED] M6 Task 6.7 language selector

`src/components/LanguageSelector.astro` provides an accessible English/Spanish selector in both site layouts, stores the preference under `preferred-language`, and updates the locale-prefixed URL while preserving the current path, query string, and hash. Typecheck, lint, production build, and diff checks pass on 2026-09-22; existing build warnings and Windows line-ending warnings remain non-blocking. The next authorized task is M6 Task 6.8 i18n Integration.

### [FACT][RESOLVED] M6 Task 6.6 i18n configuration

`astro.config.mjs` configures Astro routing for `en` and `es`, uses English as the default locale, prefixes the default locale to satisfy the `/{lang}/{path}` URL structure, and configures Spanish fallback to English. Typecheck, lint, and production build pass on 2026-09-22. `git diff --check` reports only existing generated `.astro/content-assets.mjs` whitespace and Windows line-ending warnings; the build retains existing duplicate-route and POST-only API warnings. The next authorized task is M6 Task 6.7 Language Selector.

### [FACT][RESOLVED] M6 Task 6.2 service worker setup

`src/scripts/sw.js` and deployable `public/sw.js` implement install, activate, and fetch lifecycle handlers. `src/components/Layout.astro` registers `/sw.js` after page load so the worker is served from the site root in production. Cache policy remains intentionally deferred to M6 Task 6.3. Typecheck, lint, production build, and diff checks pass on 2026-09-22; existing POST-only API route warnings and line-ending warnings remain non-blocking. The next authorized task is M6 Task 6.3 Cache Strategy.

### [FACT][RESOLVED] M6 Task 6.1 PWA manifest

`public/manifest.webmanifest` now includes required application metadata, standalone display mode, theme/background colors, and 192x192 and 512x512 install icons in `public/icons/`. Manifest validation, typecheck, lint, production build, and diff checks pass on 2026-09-22. The next authorized task is M6 Task 6.2 Service Worker Setup.

### [FACT][RESOLVED] M5 Task 5.9 responsive styling

The chat widget now uses safe-area-aware positioning, a viewport-bounded panel, full-width mobile layout, responsive message sizing, and narrow-screen adaptations for the header, input, and streaming indicator. Typecheck, lint, production build, and diff checks pass on 2026-09-22; the build retains existing POST-only API route warnings and diff check reports only line-ending warnings. The next authorized task is M5 Task 5.10 Integration Testing.

### [FACT][RESOLVED] M5 Task 5.6 streaming integration

`ChatWidget.astro` now consumes streamed SSE or plain-text response chunks, updates the assistant message incrementally, shows an accessible streaming indicator, supports cancellation, and handles JSON responses from the current `/api/chat` endpoint. `StreamingIndicator.astro` provides the live status and Stop control. Typecheck, lint, production build, and diff checks pass on 2026-09-22; the build retains existing POST-only API route warnings and diff check reports only line-ending warnings. The next authorized task is M5 Task 5.7 API Client.

### [FACT][OPEN] M5 backend response is currently non-streaming

`src/pages/api/chat.ts` currently returns a completed JSON response from `chat()`. The M5 Task 5.6 frontend is prepared for SSE/plain-text streaming and falls back to the existing JSON shape, but true end-to-end incremental provider streaming requires the authorized backend/API work in the M4/M5 integration path.

### [FACT][RESOLVED] M5 Task 5.3 chat messages

`ChatMessages.astro` renders typed user and assistant messages with distinct styling, timestamps, accessible live-region semantics, scrollable layout, reduced-motion support, and an empty state. `ChatWidget.astro` composes the component with its initial assistant welcome message. Typecheck, lint, production build, and diff checks pass on 2026-09-22; the build retains existing POST-only API route warnings and diff check reports only line-ending warnings. The next authorized task is M5 Task 5.4 Chat Input.

### [FACT][RESOLVED] M5 Task 5.2 chat header

`ChatHeader.astro` provides the widget title, eyebrow, accessible close button, focus-visible state, and contrast styling. `ChatWidget.astro` composes the header and retains its existing close, Escape, and focus-return behavior. Typecheck, lint, production build, and diff checks pass on 2026-09-22; the build retains existing POST-only API route warnings and diff check reports only line-ending warnings.

### [FACT][RESOLVED] M5 Task 5.1 chat widget wrapper

`ChatWidget.astro` now provides the floating launcher and responsive open/close panel shell, integrated into the home page and shared layout. Typecheck, lint, and production build pass on 2026-09-22. The build retains existing POST-only API route warnings; diff check reports only line-ending warnings.

### [UNKNOWN][OPEN] M5 UI feature dependencies remain pending

Message rendering, input, citations, streaming, API client, history persistence, responsive validation, and integration testing remain authorized future tasks in the M5 dependency graph.

### [FACT][RESOLVED] M4 Task 4.9 integration testing

`scripts/test-m4-integration.mjs` verifies the injected end-to-end ingestion and grounded chat flow, embedding/vector metadata propagation, status tracking, no-context fallback, API validation/error responses, and the local response-time budget. `npm.cmd run test:m4`, typecheck, lint, and production build pass on 2026-09-22. `git diff --check` exits non-zero only for pre-existing historical tracker whitespace warnings.

### [UNKNOWN][OPEN] M4 live provider integration verification unavailable

No Hugging Face, Pinecone, or Groq credentials are present in the repository environment. M4 integration testing therefore uses deterministic dependency injection and API error-path checks; Stage 5 should run credentialed provider verification.

### [FACT][RESOLVED] M4 Task 4.8 status API endpoint

`src/pages/api/status.ts` provides GET `/api/status` with Pinecone connectivity and 384-dimensional index checks, version information, and structured healthy/degraded JSON responses. Typecheck, lint, production build, and diff checks pass on 2026-09-22. The next authorized task is M4 Task 4.9 Integration Testing.

### [FACT][RESOLVED] M4 Task 4.7 ingestion API endpoint

`src/pages/api/ingest.ts` provides POST `/api/ingest` with JSON content-type validation, Markdown/HTML/text format validation, ingestion-service delegation, ingestion ID/status output, and structured errors. Typecheck, lint, production build, and diff checks pass on 2026-09-22. The next authorized task is M4 Task 4.8 Status API Endpoint.

### [FACT][RESOLVED] M4 Task 4.6 chat API endpoint

`src/pages/api/chat.ts` provides POST `/api/chat` with validated query/history input, grounded RAG delegation, JSON answer/source output, and clear `GROQ_API_KEY` configuration errors. Typecheck, lint, and production build pass on 2026-09-22. The next authorized task is M4 Task 4.7 Ingestion API Endpoint.

### [FACT][RESOLVED] M4 Task 4.5 chat service

`src/lib/rag.ts` orchestrates query embedding, top-K vector retrieval, bounded context formatting, conversation history, and grounded OpenAI chat completion responses. It returns source metadata and a no-context fallback, with injectable dependencies for deterministic local verification. Typecheck, lint, and build pass on 2026-09-22. The next authorized task is M4 Task 4.6 Chat API Endpoint.

### [FACT][RESOLVED] M4 Task 4.4 ingestion service

`src/lib/ingestion.ts` normalizes Markdown/text and HTML documents, chunks content with bounded overlap, preserves source and chunk metadata, embeds and upserts chunks through the M4 services, and tracks ingestion status in memory. Injectable dependencies support deterministic local verification. Typecheck, lint, and build pass on 2026-09-22. The next authorized task is M4 Task 4.5 Chat Service.

### [UNKNOWN][OPEN] M4 live ingestion provider verification unavailable

No OpenAI or Pinecone credentials are present in the repository environment, so live ingestion against external providers was not performed. Local verification covers type contracts and production compilation; operator-provided credentials are required for end-to-end provider verification.

### [FACT][RESOLVED] M4 Task 4.3 vector store integration

`src/lib/vectorStore.ts` provides validated 384-dimensional Pinecone upserts in batches of 100 and top-K similarity search with metadata and score preservation. It supports injected index clients for deterministic verification and requires no live Pinecone credentials during local checks. Typecheck, lint, build, and diff checks pass on 2026-09-22. The next authorized task is M4 Task 4.4 Ingestion Service.

### [FACT][RESOLVED] M4 Task 4.2 embeddings service

`src/lib/embeddings.ts` integrates the OpenAI embeddings API with the 1536-dimensional `text-embedding-3-small` model, validates server-side configuration, chunks long text with overlap, processes requests in batches of 100, retries failed requests up to three times, and preserves IDs/metadata through `embedChunks`. Typecheck, lint, build, and diff checks pass on 2026-09-22. The next authorized task is M4 Task 4.3 Vector Store Integration.

### [UNKNOWN][OPEN] M4 live Hugging Face embedding verification unavailable

No `HF_TOKEN` is present in the repository environment, so live API calls were not performed. The service exposes an injectable client for deterministic testing; Stage 5 should verify the provider integration with operator-provided credentials.

### [FACT][RESOLVED] M4 Task 4.1 vector database setup

Pinecone configuration is implemented in `src/lib/pinecone.ts` with a 384-dimensional cosine index, secure server-side environment configuration, index creation, and connection/dimension verification. Typecheck, lint, build, and diff checks pass on 2026-09-22. No Pinecone credentials are committed; live connection verification requires operator-provided environment variables.

### [UNKNOWN][OPEN] M4 vector database provider recommendation drift

The approved M4 task and design specify Pinecone, while the Stage 3 handoff and master architecture recommend Supabase Postgres with pgvector. Task 4.1 follows the approved M4 task specification; provider unification remains unresolved and must be addressed before later tasks assume a different vector-store API.

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

### [FACT][RESOLVED] M5 Task 5.8 history management

`ChatWidget.astro` now restores validated user/assistant messages from localStorage, bounds retained history to 50 messages, persists completed responses, and clears history through the accessible control added to `ChatHeader.astro`. The widget uses `sendMessage()` for requests and retains session history for subsequent API calls. Typecheck, lint, build, and diff checks pass on 2026-09-22. The next authorized task is M5 Task 5.9 Responsive Styling.

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
### [FACT][RESOLVED] M4 embedding provider migration

M4 now uses the official `@huggingface/inference` client with `sentence-transformers/all-MiniLM-L6-v2` for both ingestion and chat-query embeddings. Pinecone is configured for 384 dimensions; configuration and vector validation report an actionable migration error when an existing index is still 1536-dimensional. `HF_TOKEN` is server-only and `GROQ_API_KEY` remains the chat-generation credential. Existing 1536-dimensional indexes must be replaced or re-embedded; vectors from the two models must not be mixed.
### [FACT][RESOLVED] M5 Task 5.4 Chat Input

`src/components/ChatInput.astro` provides the validated question form, maximum-length enforcement, Enter-key submission, accessible status feedback, character count, disabled sending state, and a `chat:submit` custom event for the later API-client task. It is integrated into `ChatWidget.astro`. Typecheck, lint, build, and diff checks pass on 2026-09-22. The event is intentionally not connected to the backend until M5 Tasks 5.6 and 5.7.

### [FACT][RESOLVED] M5 Task 5.5 Citation Display

`src/components/CitationDisplay.astro` renders numbered source links with optional source previews and external-link handling. `ChatMessages.astro` supports optional assistant citations and links inline `[n]` references to the corresponding source entry. Typecheck, lint, production build, and `git diff --check` pass on 2026-09-22; the diff check reports only existing Windows line-ending warnings.
### [FACT][RESOLVED] M5 Task 5.7 API client

`src/lib/chatClient.ts` provides a typed `sendMessage()` client for `/api/chat`, validates non-empty queries, sends conversation history, supports `AbortSignal` cancellation, normalizes HTTP and API errors, handles JSON responses, and parses SSE/plain-text streaming responses while preserving citations and exposing incremental chunks. Typecheck, lint, build, and diff checks pass on 2026-09-22. Live provider verification remains unavailable without operator credentials.
### [FACT][RESOLVED] M5 Task 5.10 integration testing

`scripts/test-m5-integration.mjs` verifies M5 component composition, streaming chunks and citations through the API client, conversation-history request wiring, input validation, localStorage history bounds, responsive/reduced-motion hooks, and accessibility markers. It also fixed a timing defect where `ChatWidget.astro` read the unresolved streaming result from its chunk callback. `npm.cmd run test:m5`, typecheck, lint, build, and diff checks pass on 2026-09-22. The next authorized task is M6 Task 6.1 PWA Configuration.
### [FACT][RESOLVED] M6 Task 6.3 cache strategy

`src/scripts/sw.js` and the deployable `public/sw.js` now use versioned static/runtime caches, precache the shell manifest/icons, apply cache-first handling to same-origin non-navigation GET requests, apply network-first handling to `/api/` and navigations, cache successful runtime GET responses, and remove stale `portfolio-*` caches on activation. Typecheck, lint, build, and diff checks pass on 2026-09-22. The existing build warnings for POST-only API routes and Windows line endings are non-blocking.
### [FACT][RESOLVED] M6 Task 6.4 translation structure

`src/content/i18n/en.json` and `src/content/i18n/es.json` define the structured translation namespaces. `src/lib/i18n.ts` exposes English/Spanish locale types, dot-notation translation keys, English fallback lookup, and missing-key detection with development warnings. Typecheck, lint, build, and `git diff --check` pass on 2026-09-22. The next authorized task is M6 Task 6.5 Translation Files.
### [FACT][RESOLVED] M6 Task 6.5 translation files

`src/content/i18n/en.json` and `src/content/i18n/es.json` now provide matching structured translations for the existing navigation, common controls, portfolio sections, contact form, chat assistant, accessibility labels, and error messaging. JSON syntax and 67-leaf-key parity pass. Typecheck, lint, build, and `git diff --check` pass on 2026-09-22. The next authorized task is M6 Task 6.6 i18n Configuration.
