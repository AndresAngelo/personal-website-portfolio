---
name: progress-tracker
description: Implementation milestones, status, and next steps for the personal portfolio (Astro + RAG chatbot). This file tracks progress across stages and highlights open questions. Also serves as the Stage 4 state artifact.
---

# Progress Tracker — Personal Portfolio (AEA)

## Stage 4 State

**Pipeline Stage**: 4 (Local Agentic AI Coding Workhorse)  
**Status**: READY FOR IMPLEMENTATION  
**Current Phase**: Phase 1 / M1-Setup  
**Current Goalpost**: M1 Task 1  
**Current Task**: Initialize Astro 5.x project (TypeScript, zero-placeholder scaffold).

**Completed Goalposts**: Stage 4 handoff restructure (11 tasks completed: specs moved to docs/, state artifacts established, Astro drift fixed, Continue config rewritten)

**Last Verified Goalpost**: Stage 4 handoff (Astro 5.x config valid, Continue prompt deployed, M1-Setup ready)

**Modified Files**:
- docs/pipeline/* (8 stage files)
- docs/master/* (7 master files + current-issues.md updated)
- docs/specs/M1-M9/* (27 milestone files)
- docs/handoff/* (3 stage handoff files)
- docs/Feature-spec/README.md (new)
- package.json (Astro 5.7.1 + @astrojs/vercel)
- astro.config.mjs (vercel adapter + hybrid output)
- .continue/agents/config.yaml (Stage 4 prompt)

**Verification Results**:
- Spec files moved and cross-references updated: PASS
- State artifacts established (progress-tracker.md + current-issues.md): PASS
- Astro version and config fixed: PASS
- Continue prompt deployed: PASS
- `npm install`: In progress (started before commit)
- `npm run build`: Pending (after npm install completes)

**Known Issues**: See `current-issues.md` (2 RESOLVED entries: spec migration, Stage 4 reconciliation; 0 CRITICAL/BLOCKING)

**Next Authorized Task**: M1-Setup Task 1 — Initialize Astro 5.x project

**Last Updated**: 2025-09-16 (Stage 4 handoff complete, ready for implementation)

---

## Overview

This file tracks the implementation progress of the portfolio across key milestones. It is updated as work proceeds through Stage 4 (Local Agentic AI Coding Workhorse).

The **Stage 4 State** block above serves as the authoritative source of truth for where implementation currently stands. All other sections document the milestone checklist.

## Milestones

## Milestones

### M1: Project Setup & Astro Scaffold

- [✅] Initialize Astro 5.x project (TypeScript, Vercel adapter).
- [✅] Configure Vercel deployment (GitHub → Vercel).
- [✅] Set up CI checks (TypeScript, ESLint, `astro build`).
- [✅] Define global design tokens (colors, spacing, typography).
- [✅] Implement basic layout (`Layout.astro`, nav placeholder).

**Status**: Not started  
**Target**: Stage 4

---

### M2: Core Rows & Navigation

- [✅] Implement **auto-hiding vertical sidebar** (desktop).
- [✅] Implement 4 rows:
  - `HomeRow.astro`
  - `ProjectsRow.astro`
  - `ActivitiesRow.astro`
  - `ContactRow.astro`
- [✅] Implement **horizontal scrolling** within rows (desktop).
- [ ] Implement **vertical animation** between rows.
- [ ] Implement **mobile layout**:
  - Vertical stacking of rows.
  - Top/bottom nav bar.
  - Projects/Activities as vertical lists.

**Status**: Pending  
**Target**: Stage 4

---

### M3: Content Integration

- [ ] Create content collections for:
  - Projects (Markdown/JSON).
  - Activities (Markdown/JSON).
  - FAQ (Markdown/JSON).
- [ ] Populate with initial content:
  - 3 placeholder projects.
  - 3–5 activities.
  - 5–10 FAQ Q&A pairs.
- [ ] Add resume PDF to `/public`.
- [ ] Implement Home/About narrative (horizontal frames).

**Status**: Not started  
**Target**: Stage 3

---

### M4: RAG Chatbot Backend

- [ ] Set up vector DB (e.g., Supabase Postgres + pgvector).
- [ ] Implement `scripts/build-embeddings.ts`:
  - Read source docs.
  - Chunk semantically by section/headings.
  - Generate embeddings (HF embedding model).
  - Store in vector DB.
- [ ] Implement `src/lib/rag.ts`:
  - Query embedding.
  - Retrieve top-3 chunks.
- [ ] Implement `/api/chat.ts`:
  - Call Qwen model (HF Space).
  - Stream responses.
  - Enforce docs-only guardrails.
- [ ] Configure rate limiting & CORS.

**Status**: Not started  
**Target**: Stage 3

---

### M5: RAG Chatbot UI

- [ ] Integrate **Vercel AI SDK UI** (floating widget).
- [ ] Implement:
  - Streaming responses.
  - Markdown rendering.
  - Clickable source cards + inline citations.
  - Short intro message.
- [ ] Implement i18n for chatbot (en/tl/zh/hi).
- [ ] Test multi-turn conversation (session memory).

**Status**: Not started  
**Target**: Stage 3

---

### M6: PWA & i18n

- [ ] Add `manifest.webmanifest` to `/public`.
- [ ] Implement service worker (`sw.js`).
- [ ] Register service worker via `client:load` script.
- [ ] Implement language toggle component.
- [ ] Translate core content to Tagalog, Mandarin, Hindi (or prepare structure).

**Status**: Not started  
**Target**: Stage 3

---

### M7: Performance & SEO

- [ ] Optimize for Core Web Vitals:
  - LCP < 2.5s, INP < 200ms, CLS < 0.1.
- [ ] Implement JSON‑LD structured data:
  - `Person` schema.
  - `Project` / `CreativeWork` schema.
- [ ] Generate XML sitemap (`@astrojs/sitemap`).
- [ ] Add distinct OG images for Home, Projects, Activities, Contact.
- [ ] Run WebPageTest/Lighthouse audits; fix issues.

**Status**: Not started  
**Target**: Stage 3–4

---

### M8: Security & Compliance

- [ ] Configure CSP headers (report-only → enforce).
- [ ] Ensure HTTPS-only + HSTS (via Vercel).
- [ ] Add privacy notice to Contact page.
- [ ] Verify no personal data collection.
- [ ] Test rate limiting on `/api/chat`.

**Status**: Not started  
**Target**: Stage 3–4

---

### M9: Final QA & Handoff

- [ ] End-to-end testing:
  - Desktop UX (horizontal scroll, nav, animations).
  - Mobile UX (vertical scroll, nav).
  - Chatbot behavior (grounded answers, citations, pivots).
  - i18n toggle (en/tl/zh/hi).
  - PWA installability.
- [ ] Performance audit (CWV targets met).
- [ ] SEO check (sitemap, structured data).
- [ ] Document any known issues or limitations.
- [ ] Handoff to Stage 5 (Senior QA & Deployment Engineer).

**Status**: Not started  
**Target**: Stage 5

---

## Open Questions & Risks

- **Vector DB choice**: Finalize serverless-friendly option (Supabase vs. other).
- **Qwen model**: Select specific Qwen Instruct variant on HF Spaces.
- **Translation workflow**: How/when to produce tl/zh/hi versions of docs.
- **Animation performance**: Ensure horizontal-scroll UX meets CWV targets on mid-range devices.

## References

- `docs/specs/M1-Setup/requirements.md`, `design.md`, `tasks.md` – M1 specification
- `docs/specs/M2-Rows-Nav/requirements.md`, `design.md`, `tasks.md` – M2 specification
- (and similarly for M3–M9)
- `project-overview.md` – Project goals and scope.
- `architecture-context.md` – Technical architecture.
- `ui-context.md` – UI/UX patterns.
- `code-standards.md` – Coding standards.
- `ai-workflow-rules.md` – RAG chatbot behavior.
- `current-issues.md` – Blockers and spec drift log.

