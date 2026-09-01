---
name: progress-tracker
description: Implementation milestones, status, and next steps for the personal portfolio (Astro + RAG chatbot). This file tracks progress across stages and highlights open questions.
---

# Progress Tracker — Personal Portfolio (AEA)

## Overview

This file tracks the implementation progress of the portfolio across key milestones. It is updated as work proceeds through Stage 2 (Scaffold & Environment Architect) and Stage 3 (Spec-Driven Builder).

## Milestones

### M1: Project Setup & Astro Scaffold

- [ ] Initialize Astro 7.x project (hybrid mode, TypeScript).
- [ ] Configure Vercel deployment (GitHub → Vercel).
- [ ] Set up CI checks (TypeScript, ESLint, `astro build`).
- [ ] Define global design tokens (colors, spacing, typography).
- [ ] Implement basic layout (`Layout.astro`, nav placeholder).

**Status**: Not started  
**Target**: Stage 2

---

### M2: Core Rows & Navigation

- [ ] Implement **auto-hiding vertical sidebar** (desktop).
- [ ] Implement 4 rows:
  - `HomeRow.astro`
  - `ProjectsRow.astro`
  - `ActivitiesRow.astro`
  - `ContactRow.astro`
- [ ] Implement **horizontal scrolling** within rows (desktop).
- [ ] Implement **vertical animation** between rows.
- [ ] Implement **mobile layout**:
  - Vertical stacking of rows.
  - Top/bottom nav bar.
  - Projects/Activities as vertical lists.

**Status**: Not started  
**Target**: Stage 2–3

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
- [ ] Handoff to Stage 4 (Senior QA & Deployment Engineer).

**Status**: Not started  
**Target**: Stage 4

---

## Open Questions & Risks

- **Vector DB choice**: Finalize serverless-friendly option (Supabase vs. other).
- **Qwen model**: Select specific Qwen Instruct variant on HF Spaces.
- **Translation workflow**: How/when to produce tl/zh/hi versions of docs.
- **Animation performance**: Ensure horizontal-scroll UX meets CWV targets on mid-range devices.

## References

- `06-Concept-Decisions-Portfolio.md` – Canonical concept decisions.
- `project-overview.md` – Project goals and scope.
- `architecture-context.md` – Technical architecture.
- `ui-context.md` – UI/UX patterns.
- `code-standards.md` – Coding standards.
- `ai-workflow-rules.md` – RAG chatbot behavior.
