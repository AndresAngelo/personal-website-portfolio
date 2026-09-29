# Project Summary

## Product

AEA Personal Portfolio is an Astro-based personal portfolio for an AI engineering professional. It presents projects, activities, background information, contact details, and a resume download. A portfolio assistant provides document-grounded answers through a server-side RAG API.

## Current capabilities

- Astro server-rendered site with the Vercel adapter.
- Four primary portfolio areas: Home/About, Projects, Activities, and Contact.
- English and Spanish locale routing in the current implementation.
- Markdown content collections for projects, activities, and FAQ entries.
- Project and activity media stored under `public/Public materials/`.
- PWA manifest and service-worker support.
- Chat interface connected to `POST /api/chat`.
- Ingestion endpoint at `POST /api/ingest`.
- Vector health endpoint at `GET /api/status`.
- GitHub Actions validation and Vercel deployment workflow on `main`.
- API, maintenance, deployment, and deployment-checklist documentation.

## Technology and runtime

- Astro 7.x
- TypeScript
- Vercel adapter (`@astrojs/vercel`)
- npm
- ESLint and TypeScript checks
- Groq, Hugging Face, and Pinecone variables listed by the current runtime documentation/template
- Vercel deployment through GitHub Actions

## Repository map

| Area | Location | Purpose |
|---|---|---|
| UI components | `src/components/` | Astro rows, navigation, chat, modal, and shared UI. |
| Pages/API | `src/pages/` | Localized pages and server API routes. |
| Content | `src/content/` | Projects, activities, and FAQ Markdown entries. |
| Shared logic | `src/lib/` | i18n, RAG, ingestion, and service logic. |
| Public assets | `public/` | Manifest, media, service-worker assets, and downloadable materials. |
| Validation | `scripts/` | Content, milestone, API, build, and aggregate checks. |
| CI | `.github/workflows/ci.yml` | Install, build, lint, type-check, tests, and Vercel deployment. |
| Developer docs | `docs/` | API, maintenance, deployment, specs, and state ledgers. |
| Handoff package | `HANDOFF/` | Client/maintainer summary, content, training, and support documents. |

## Operating boundaries

- Keep RAG answers grounded in repository-provided documents.
- Keep provider credentials server-side; never commit or expose secrets.
- Preserve the four-row layout, locale behavior, established media folders, and dark-mode/accessibility intent unless an authorized change says otherwise.
- Do not deploy production from Stage 4. Production release belongs to the designated Stage 5/release owner.
- Treat the provider mismatch between `.vercel.json` and `.env.example` as unresolved until an authorized maintainer confirms the active runtime configuration.

## Known release state

The repository contains deployment preparation documentation but no claimed production deployment result. Browser acceptance and several automated checks remain environment-limited; see `docs/master/current-issues.md` and `FINAL_REVIEW.md` for the evidence and release blockers.

## Recommended maintainer path

1. Read this summary and `docs/README.md`.
2. Read `docs/MAINTENANCE.md` before editing content or shared components.
3. Read `docs/API.md` before changing API behavior.
4. Use `docs/DEPLOYMENT.md` and `DEPLOYMENT_CHECKLIST.md` for release preparation.
5. Resolve open issues and run validation in a normal terminal or CI before production approval.
