---
name: stage1-to-stage2-handoff
description: Handoff documentation from Stage 1 (Research & Specs Hub) to Stage 2 (Scaffold & Environment Architect) for the personal portfolio project. This file summarizes what was decided, what is out of scope, and what Stage 2 should consume next.
---

# Stage 1 → Stage 2 Handoff — Personal Portfolio (AEA)

## Handoff Summary

This handoff package transfers the complete **Stage 1 spec set** for the **personal portfolio (Astro + RAG chatbot)** to **Stage 2 (Scaffold & Environment Architect)**. Stage 2 will use these specs in **Google AI Studio** to generate a zero-placeholder, Kiro-ready project scaffold.

## What Was Decided (Stage 1 Outputs)

Stage 1 has produced the following artifacts:

### 1. Canonical Concept Decisions

- **`06-Concept-Decisions-Portfolio.md`**  
  Consolidated decisions across all 6 concept areas:
  1. UI Framework & Rendering Model (Astro 7.x, hybrid, dark-first, PWA, i18n).
  2. Information Architecture, Content & UX (4 rows, horizontal-scroll desktop, vertical mobile).
  3. Security, Privacy & Compliance (no personal data, ephemeral chats, CSP, HTTPS/HSTS).
  4. AI / RAG Chatbot Architecture (Qwen on HF Spaces, serverless vector DB, docs-only, citations).
  5. Hosting, Deployment & DevOps (Vercel, Git-based CI/CD, embeddings rebuilt on deploy).
  6. Performance, SEO & Analytics (CWV targets, basic SEO, JSON‑LD, sitemap).

### 2. Six Master Spec Files

1. **`project-overview.md`**  
   - Purpose, goals, primary visitors, top actions.  
   - Core sections (Home, Projects, Activities, Contact).  
   - Key features, non-goals, success criteria.

2. **`architecture-context.md`**  
   - System overview (Astro + Vercel + RAG chatbot).  
   - High-level components (frontend, UI/UX, chatbot, content, DevOps).  
   - Data flow (static content + RAG pipeline).  
   - Security model, performance model, hosting & environments.  
   - Indicative file structure.

3. **`ui-context.md`**  
   - Design principles (desktop-first, dark default, minimal branding).  
   - Layout & navigation (auto-hide sidebar, rows, scroll behavior).  
   - Theming, typography, animations.  
   - i18n, chatbot UI, accessibility, PWA.

4. **`code-standards.md`**  
   - Language & tooling (TypeScript, Astro, ESLint).  
   - Project structure, component conventions.  
   - Styling (scoped CSS, design tokens).  
   - Content (Markdown/JSON collections).  
   - API routes, RAG code organization.  
   - Performance, security, CI/CD, testing/QA.

5. **`ai-workflow-rules.md`**  
   - Knowledge sources (resume, projects, activities, FAQ).  
   - Core rules (docs-only, retrieval, citations, multi-turn).  
   - Language behavior, pivot behavior, tone & style.  
   - Safety & guardrails, latency & streaming, error handling.  
   - Implementation notes, example interactions.

6. **`progress-tracker.md`**  
   - Milestones M1–M9 (setup, rows, content, RAG backend/UI, PWA/i18n, performance/SEO, security, final QA).  
   - Status (all not started), targets per stage.  
   - Open questions & risks.  
   - References to other specs.

## What Is Out of Scope

The following are explicitly **out of scope** for this project (v1):

- **Blog / writing section**.  
- **Contact form** (mailto/links only).  
- **Third-party analytics** (no GA, Plausible, Fathom; Vercel analytics optional).  
- **Authentication or admin panel** (fully public site).  
- **Custom domain** (use `*.vercel.app` initially).  
- **Dedicated staging environment** (production + preview only).  
- **External monitoring tools** (Vercel logs only).  
- **Aggressive SEO strategy** (basic on-page SEO + structured data only).  
- **Open Graph / Twitter Card priority** (distinct OG images per section, but low priority).

## What Stage 2 Should Consume Next

Stage 2 (Google AI Studio) should:

1. **Ingest all 7 spec files**:
   - `06-Concept-Decisions-Portfolio.md`
   - `project-overview.md`
   - `architecture-context.md`
   - `ui-context.md`
   - `code-standards.md`
   - `ai-workflow-rules.md`
   - `progress-tracker.md`

2. **Use these specs to design the scaffold**:
   - Astro 7.x project structure (hybrid mode, TypeScript).  
   - Folder layout matching `architecture-context.md` (components, pages, api, scripts, lib).  
   - Design tokens and global CSS per `ui-context.md` and `code-standards.md`.  
   - Content collections for projects, activities, FAQ.  
   - Placeholder routes for `/api/chat` (serverless function stub).  
   - PWA scaffolding (manifest, service worker registration).  
   - i18n structure (en/tl/zh/hi toggle, translation-ready content).

3. **Prepare for RAG integration** (without full implementation)**:
   - Create directories for:
     - `scripts/build-embeddings.ts`
     - `src/lib/rag.ts`
     - `api/chat.ts`
   - Add stubs/comments indicating where embeddings, retrieval, and Qwen integration will go.
   - Do **not** implement full RAG logic; just ensure the structure is ready.

4. **Produce a zero-placeholder, running Astro app**:
   - All dependencies installed.  
   - Basic layout and nav scaffolded (sidebar stub, row sections as placeholders).  
   - Dark mode default with theme toggle stub.  
   - Sample content (1–2 projects, 1–2 activities, sample FAQ) to demonstrate structure.  
   - App builds, renders, and runs in preview with zero setup errors.

5. **Generate `HANDOFF.md` for Stage 3**:
   - Folder map.  
   - Spec locations (e.g., `.kiro/specs/` or equivalent).  
   - Environment overview (Vercel, HF Spaces, vector DB).  
   - Dependencies manifest.  
   - Immutable boundaries (what Stage 3 must not change without re-spec).

## Handoff Checklist (Stage 1 Completion)

Per `stage-1-research-and-specs-hub.md`, Stage 1 confirms:

- [x] The 6 master spec files are **complete and internally consistent**.  
- [x] Research is **source-backed and citation-ready** (via `06-Concept-Decisions-Portfolio.md`).  
- [x] This handoff documentation clearly summarizes:
  - **What was decided** (7 spec files).  
  - **What is out of scope** (listed above).  
  - **What Stage 2 should consume next** (ingest specs, scaffold Astro, prepare RAG structure).  
- [x] The output can be **pasted directly into Stage 2** without further editing.  
- [x] Another human can read this handoff and understand what Stage 1 did in **under 5 minutes**.

## Instructions for Stage 2

When you (Stage 2) receive this handoff:

1. Read `06-Concept-Decisions-Portfolio.md` first for the full decision context.  
2. Read the 6 master specs to understand:
   - Project goals and constraints.  
   - Architecture and file structure.  
   - UI/UX patterns and responsive behavior.  
   - Coding standards and RAG workflow rules.  
   - Implementation milestones and open questions.  
3. Use Google AI Studio to:
   - Generate the Astro 7.x scaffold.  
   - Apply design tokens and basic layout.  
   - Create content collections and sample content.  
   - Prepare RAG-related directories and stubs.  
4. Export as ZIP or push to GitHub, with `HANDOFF.md` for Stage 3.

## References

- `stage-1-research-and-specs-hub.md` – Stage 1 role and handoff requirements.  
- `stage-2-scaffold-and-environment-architect.md` – Stage 2 role and expectations.  
- `5-Stage-Modular-AI-Engineering-Pipeline.md` – Overall pipeline architecture.  
