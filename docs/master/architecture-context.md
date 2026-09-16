---
name: architecture-context
description: Technical architecture and stack for the personal portfolio (Astro + Vercel + RAG chatbot). This file defines the system components, data flow, and hosting model.
---

# Architecture Context — Personal Portfolio (AEA)

## System Overview

The portfolio is a **static/hybrid Astro site** hosted on **Vercel**, with a **serverless RAG chatbot** that answers questions from your documents (resume, projects, activities, FAQ).

### High-Level Components

1. **Frontend (Astro)**
   - Astro 7.x in **hybrid mode** (`output: 'hybrid'`).
   - TypeScript (`.astro` + `.ts`).
   - Component-driven architecture with scoped CSS.
   - PWA (manifest + service worker).
   - i18n (en/tl/zh/hi) with language toggle.

2. **UI/UX**
   - Desktop:
     - Auto-hiding vertical sidebar (left) for row navigation.
     - 4 rows: Home, Projects, Activities, Contact.
     - Horizontal scrolling within rows; vertical animation between rows.
   - Mobile:
     - Conventional vertical scrolling.
     - Rows stacked; Projects/Activities as vertical lists.

3. **RAG Chatbot**
   - Floating widget (bottom-right) using **Vercel AI SDK UI**.
   - Backend: serverless `/api/chat` route on Vercel.
   - LLM: **Qwen Instruct model** on **Hugging Face Space**.
   - Embeddings: same provider (HF ecosystem).
   - Vector store: **serverless-friendly DB** (e.g., Supabase Postgres + pgvector).
   - Multi-turn, streaming, Markdown, clickable source cards.
   - Strictly docs-only answers with citations.

4. **Content**
   - All content in **Markdown/JSON** in the repo:
     - Home/About narrative.
     - Projects (title, tagline, problem, role, tech stack, links, placeholders).
     - Activities (talks, hackathons, community).
     - FAQ (Q&A pairs).
     - Resume (PDF in `/public`).
   - Content updates: edit → push → auto-deploy.

5. **Hosting & DevOps**
   - **Vercel**:
     - Astro site + serverless functions.
     - Preview deployments for branches; production on `main`.
   - CI checks (TypeScript, ESLint, `astro build`).
   - Embeddings regenerated on every deploy.
   - Secrets via Vercel environment variables.

## Data Flow

### Static Content

1. Author edits Markdown/JSON in repo.
2. Push to branch → Vercel preview.
3. Merge to `main` → Vercel production deploy.
4. Astro builds static pages + hybrid routes.

### RAG Chatbot

1. **Build time**:
   - Build script reads source docs (resume, projects, activities, FAQ).
   - Chunks them semantically by section/headings.
   - Generates embeddings (HF embedding model).
   - Stores embeddings in vector DB (e.g., Supabase + pgvector).
2. **Runtime**:
   - User opens chat widget, types a question.
   - Frontend calls `/api/chat` (serverless function).
   - `/api/chat`:
     - Embeds the query (same embedding model).
     - Retrieves top-3 chunks from vector DB.
     - Calls Qwen model (HF Space) with:
       - System prompt: “Answer only from provided docs; say ‘I don’t know’ if not found.”
       - Retrieved chunks as context.
     - Streams response back to client.
   - UI displays:
     - Streaming text (Markdown-rendered).
     - Inline citations + “Sources” panel with clickable chunks.

## Security Model

- **No authentication**; fully public site.
- `/api/chat`:
  - CORS-restricted to your domain.
  - Rate-limited per IP/session.
- **CSP** (Content Security Policy) enforced via headers.
- **HTTPS-only** with HSTS.
- No personal data collection; ephemeral chats.

## Performance Model

- **Core Web Vitals targets** (mobile, p75):
  - LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Astro’s **islands architecture**:
  - Heavy interactions (chat widget, animations) as islands.
  - Base site is zero-JS where possible.
- **Desktop-first** design, with mobile fallback to vertical lists.

## Hosting & Environments

- **Vercel**:
  - Production: `main` branch.
  - Preview: all other branches.
- **No custom domain** initially.
- **Same secrets** across prod and preview.
- **No external monitoring**; Vercel logs only.

## File Structure (Indicative)

```text
/
  public/
    resume.pdf
    favicon.ico
    manifest.webmanifest
  src/
    components/
      Layout.astro
      SidebarNav.astro
      HomeRow.astro
      ProjectsRow.astro
      ActivitiesRow.astro
      ContactRow.astro
      ChatWidget.astro
      ProjectModal.astro
    pages/
      index.astro
    styles/
      global.css
    scripts/
      sw.js (service worker)
    lib/
      i18n.ts
      rag.ts
  api/
    chat.ts (serverless function)
  scripts/
    build-embeddings.ts
  package.json
  astro.config.mjs
  tsconfig.json
  vercel.json
```

## References

- `06-Concept-Decisions-Portfolio.md` – Canonical concept decisions.
- `project-overview.md` – High-level project overview.
- `ui-context.md` – UI/UX patterns and interaction details.
- `code-standards.md` – Coding standards and conventions.
- `ai-workflow-rules.md` – RAG chatbot behavior and constraints.
- `progress-tracker.md` – Implementation milestones and status.
