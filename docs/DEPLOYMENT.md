# Deployment Guide

This guide describes the repository’s documented deployment path. It prepares a release for Stage 5 verification; it does not perform a production deployment.

## Supported deployment path

The application is an Astro server-rendered site using `@astrojs/vercel`. The repository’s recommended target is Vercel, with deployment initiated by the GitHub Actions workflow after a successful push to `main`.

### Prerequisites

- Node.js 20 (the CI workflow uses Node 20; Node.js 18 or newer is required by the project documentation).
- npm.
- A Vercel project connected to this repository.
- GitHub Actions secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
- Runtime provider variables configured in Vercel for the API routes. Use the current `.env.example` as the source of truth for the application runtime variables.
- No secrets committed to the repository or copied into documentation.

### Automated deployment through GitHub Actions

1. Make the intended change on a non-production branch.
2. Run the local validation commands listed in the checklist below.
3. Open a pull request and confirm the CI job can install dependencies, build, lint, type-check, and run the deterministic tests.
4. Merge the approved pull request into `main`.
5. The `build-and-deploy` job in `.github/workflows/ci.yml` runs `npm ci`, `npm run build`, ESLint, TypeScript checking, and `npm test`.
6. When the `main` branch job succeeds, the Vercel action deploys using the three Vercel GitHub secrets.
7. Record the deployed commit SHA, deployment URL, verification result, and any follow-up issue in the release record or project issue tracker.

Do not treat a deployment as successful merely because the workflow completed. Complete the post-deployment checks in `DEPLOYMENT_CHECKLIST.md`.

### Manual build and provider deployment

For a provider other than the repository’s automated Vercel workflow, build the application with:

```powershell
npm.cmd ci
npm.cmd run build
```

The configured production build command is `astro build`, and the generated output directory is `dist`. The Astro configuration uses server output and the Vercel adapter, so deploying `dist` to an arbitrary static host is not equivalent to deploying the application with its server/API runtime. Confirm that an alternative host supports the required Astro server output before using a manual provider flow.

## Environment variables

The following variables are listed in `.env.example` and are server-side only:

| Variable | Purpose | Required when |
|---|---|---|
| `GROQ_API_KEY` | Chat provider credential used by the RAG chat route. | Chat requests are enabled. |
| `HF_TOKEN` | Hugging Face provider credential used by the RAG/embedding integration. | The configured Hugging Face integration is enabled. |
| `PINECONE_API_KEY` | Pinecone vector database credential. | Vector-backed chat or ingestion is enabled. |
| `PINECONE_INDEX_NAME` | Pinecone index name; the template defaults to `default`. | Pinecone is enabled. |
| `PINECONE_CLOUD` | Pinecone deployment cloud; the template defaults to `aws`. | Pinecone is enabled. |
| `PINECONE_REGION` | Pinecone deployment region; the template defaults to `us-east-1`. | Pinecone is enabled. |

Set values in the deployment provider’s encrypted environment settings for the production environment. Do not expose them as public/browser variables, place them in client-side code, or copy values from `.env` into Vercel, GitHub, documentation, screenshots, or issues.

### Configuration consistency note

The current repository contains legacy provider references in `.vercel.json` (`QWEN_API_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`) while `.env.example` and the current API documentation identify Groq, Hugging Face, and Pinecone variables. This guide intentionally does not invent or silently reconcile those configurations. Before production release, Stage 5 must confirm which provider configuration the deployed runtime actually uses and remove or update stale provider references through an authorized change.

## Build and release validation

Run these from the repository root before merging:

```powershell
npm.cmd run test:content
npm.cmd run test:api
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd test
```

If a command is unavailable or fails because of the local environment, record the exact command, exit result, and limitation. Do not bypass a failed check without documenting the reason.

## Post-deployment verification

Use the deployed URL and verify:

1. The default English route and the Spanish route load successfully.
2. Navigation, responsive layout, keyboard controls, and the chat launcher work in a supported browser.
3. `POST /api/chat` returns the documented success or provider-configuration response; do not submit real personal or secret data.
4. `POST /api/ingest` rejects malformed or unauthorized test input according to the API contract; do not ingest sensitive data into production during a smoke test.
5. `GET /api/status` returns either the documented healthy response or a documented degraded response that is investigated before release approval.
6. Static assets, the manifest, security headers, resume link, and project media load as expected.
7. No browser console errors, unexpected redirects, exposed environment values, or failed serverless function requests are present.
8. The deployed commit SHA matches the approved source revision.

Record the URL, commit, timestamp, browser/runtime used, endpoint outcomes, and unresolved findings.

## Troubleshooting

### CI fails during dependency installation

Confirm that `package-lock.json` is committed and consistent with `package.json`, the configured Node version is supported, and the workflow is using `npm ci` from the repository root. Do not replace `npm ci` with an unpinned install for a release build.

### Build fails on content validation or generated routes

Run `npm.cmd run test:content` locally and inspect the changed Markdown frontmatter, collection schema, route parameters, and referenced media paths. Restore or correct the invalid content before retrying the deployment.

### Type check or lint fails

Run the failing command locally, fix the reported source issue, and rerun the complete validation sequence. Do not suppress errors or increase lint allowances as a deployment workaround.

### Chat or vector status reports provider configuration errors

Verify the production environment contains the variables required by the current runtime implementation and that values are configured for the correct Vercel environment. Review `docs/API.md` and deployment logs without printing secret values. If the runtime/provider mismatch described above remains unresolved, stop release approval and escalate it as a configuration issue.

### API routes return 404 or server errors

Confirm the deployment uses the Astro server output and Vercel adapter, inspect the deployment function logs, and verify that the deployed commit includes the API route files. A static-only host cannot serve these server routes without an appropriate server runtime.

### Security headers or assets are incorrect

Inspect the deployed response headers and browser network requests. Compare them with `.vercel.json`, `astro.config.mjs`, and the committed public assets. Treat a CSP violation or missing security header as a release blocker until investigated.

### Deployment is healthy but the UI is stale

Confirm the deployed commit SHA and cache headers, then trigger a new deployment only through the approved workflow. Do not delete production data or change provider settings as an initial cache workaround.

## Rollback procedure

Rollback is a provider operation and must be performed by an authorized release owner; this Stage 4 guide does not execute it.

### Vercel rollback

1. Stop the release and record the failed deployment URL, commit SHA, timestamp, symptoms, and relevant logs.
2. Identify the last deployment that passed the complete post-deployment checklist.
3. In Vercel, use the project’s deployment history to promote that known-good deployment to production using the provider’s rollback/redeployment action. Do not delete the deployment before the replacement is verified.
4. Confirm the production URL serves the known-good commit and rerun the post-deployment checks, especially the API health/status route and security-header checks.
5. If the deployment is managed exclusively through GitHub Actions, revert the faulty change in a reviewed branch and merge the revert to `main` after the incident owner approves it. Do not force-push or rewrite shared history.
6. Preserve deployment logs and open an incident or issue describing the cause, impact, rollback, and corrective action.

### Rollback limitations

Application rollback does not automatically reverse database, vector-index, content, or external-provider changes. Before release, identify whether a change has a data migration or irreversible provider effect and create a separate, authorized recovery plan. Do not claim a rollback is complete until both the application and any affected external state have been assessed.

## Release ownership and escalation

Production access, Vercel project settings, GitHub secrets, provider credentials, and rollback authority belong to the project’s designated release owner. If no release owner is assigned, deployment is not ready for production. Keep support and incident contacts in the handoff package rather than adding personal credentials or secrets here.

## Related documentation

- [Deployment checklist](../DEPLOYMENT_CHECKLIST.md)
- [API reference](./API.md)
- [Maintenance guide](./MAINTENANCE.md)
- [Documentation index](./README.md)
- [CI workflow](../.github/workflows/ci.yml)
- [Environment variable template](../.env.example)
