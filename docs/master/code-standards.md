---
name: code-standards
description: Coding standards and conventions for the personal portfolio (Astro + TypeScript + Vercel). This file defines language, structure, styling, and quality rules.
---

# Code Standards — Personal Portfolio (AEA)

## Language & Tooling

- **Language**: TypeScript (`.astro` + `.ts`).
- **Framework**: Astro 7.x (hybrid mode).
- **Package manager**: npm (or pnpm, consistent across team).
- **Linting**: ESLint + Astro ESLint plugin.
- **Type checking**: `tsc --noEmit` in CI.

## Project Structure

Follow a clear, component-driven structure:

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
      sw.js
    lib/
      i18n.ts
      rag.ts
  api/
    chat.ts
  scripts/
    build-embeddings.ts
  package.json
  astro.config.mjs
  tsconfig.json
  vercel.json
```

## Component Conventions

- **One component per file** (e.g., `SidebarNav.astro`).
- **Scoped CSS** via `<style>` in `.astro` components.
- Global CSS only for:
  - Design tokens (colors, spacing, typography).
  - Base resets.
- Use **TypeScript interfaces/types** for component props where applicable.

## Styling

- **Component-scoped `<style>`** in `.astro` files.
- Global tokens in `src/styles/global.css`:
  - `--color-bg`, `--color-fg`, `--color-accent`, etc.
  - `--spacing-*`, `--radius-*`, `--font-*`.
- Dark mode default:
  - Tokens defined for both `light` and `dark` themes.
  - Toggle via `[data-theme]` attribute on `<html>` or `<body>`.

## TypeScript

- Strict mode enabled in `tsconfig.json`.
- No `any` unless absolutely necessary (with comment).
- Prefer **interfaces** for structured data (e.g., `Project`, `Activity`).

Example:

```ts
export interface Project {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  role: string;
  techStack: string[];
  links: {
    repo?: string;
    demo?: string;
    caseStudy?: string;
  };
}
```

## Content (Markdown/JSON)

- Projects, activities, FAQ stored as **Markdown** or **JSON**.
- Use **content collections** (Astro) for type-safe access.
- Example (Markdown frontmatter for projects):

```md
---
title: "Project X"
tagline: "AI pipeline for Y"
problem: "..."
role: "..."
techStack: ["Astro", "TypeScript", "Supabase"]
links:
  repo: "https://github.com/..."
  demo: "https://..."
---
```

## API Routes

- Serverless functions under `/api` (e.g., `/api/chat.ts`).
- Use **Vercel serverless** runtime.
- Validate inputs; handle errors gracefully.
- Rate limiting implemented at this layer.

## RAG Chatbot Code

- Embedding generation in `scripts/build-embeddings.ts`.
- Retrieval logic in `src/lib/rag.ts`.
- `/api/chat.ts`:
  - Embeds query.
  - Retrieves top-3 chunks.
  - Calls Qwen model (HF Space).
  - Streams response with citations.

## Performance

- Minimize JS on static pages.
- Use **islands architecture** for heavy components (e.g., chat widget).
- Lazy-load non-critical assets (images, videos).
- Ensure CWV targets:
  - LCP < 2.5s, INP < 200ms, CLS < 0.1.

## Security

- No secrets in code; use **Vercel environment variables**.
- CSP headers configured in `vercel.json` or Astro middleware.
- HTTPS-only (enforced by Vercel + HSTS).

## Testing & QA

- No formal test suite required in v1.
- Manual QA:
  - Check CWV via WebPageTest/Lighthouse.
  - Verify chatbot behavior (grounded answers, citations).
  - Test i18n toggle (en/tl/zh/hi).
  - Test PWA installability.

## CI/CD

- GitHub Actions (or Vercel built-in) for:
  - TypeScript type check.
  - ESLint.
  - `astro build`.
- Embeddings regenerated on every deploy.

## References

- `06-Concept-Decisions-Portfolio.md` – Canonical concept decisions.
- `architecture-context.md` – Technical architecture.
- `ui-context.md` – UI/UX patterns.
- `ai-workflow-rules.md` – RAG chatbot behavior.
