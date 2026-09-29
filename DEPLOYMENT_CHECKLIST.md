# Deployment Checklist

Use this checklist for every production release. Mark each item complete and retain the commit SHA, deployment URL, timestamps, and verification notes with the release record.

## Release information

- [ ] Release owner identified: ____________________
- [ ] Release/change summary recorded: ____________________
- [ ] Source branch and approved commit SHA recorded: ____________________
- [ ] Target environment confirmed as production.
- [ ] Rollback owner and communication path confirmed.

## Pre-deployment

- [ ] Pull request reviewed and approved.
- [ ] No uncommitted release changes remain outside the reviewed change.
- [ ] `npm.cmd ci` completes from the repository root.
- [ ] `npm.cmd run test:content` passes.
- [ ] `npm.cmd run test:api` passes.
- [ ] `npm.cmd run typecheck` passes.
- [ ] `npm.cmd run lint` passes.
- [ ] `npm.cmd run build` passes.
- [ ] `npm.cmd test` passes, or any documented limitation has release-owner approval.
- [ ] Supported-browser verification evidence is available, or the release is explicitly blocked pending browser verification.
- [ ] Content, media paths, localized routes, API behavior, and security-sensitive changes reviewed.

## Environment-variable verification

- [ ] Production provider settings were reviewed without printing secret values.
- [ ] `GROQ_API_KEY` is configured if chat is enabled.
- [ ] `HF_TOKEN` is configured if the Hugging Face integration is enabled.
- [ ] `PINECONE_API_KEY` is configured if vector-backed chat or ingestion is enabled.
- [ ] `PINECONE_INDEX_NAME` is set to the intended index.
- [ ] `PINECONE_CLOUD` is set to the intended cloud.
- [ ] `PINECONE_REGION` is set to the intended region.
- [ ] GitHub Actions contains `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
- [ ] Values are configured in the correct Vercel environment and are not committed to `.env`, source, logs, screenshots, or issues.
- [ ] The release owner confirmed the current runtime provider variables rather than relying on stale legacy references in `.vercel.json`.

## Build and deployment

- [ ] The approved change is merged to `main` only after CI review.
- [ ] GitHub Actions `build-and-deploy` completed `npm ci` successfully.
- [ ] Production build completed successfully.
- [ ] Lint, type check, and deterministic tests completed successfully.
- [ ] The Vercel deployment completed without function/build errors.
- [ ] Deployment URL recorded: ____________________
- [ ] Deployed commit SHA recorded: ____________________
- [ ] Deployment timestamp recorded: ____________________

## Post-deployment verification

- [ ] English route loads.
- [ ] Spanish route loads.
- [ ] Navigation and responsive layout work in the verification browser(s).
- [ ] Keyboard navigation, focus visibility, ARIA state changes, and reduced-motion behavior were checked.
- [ ] Chat launcher and chat UI load.
- [ ] `POST /api/chat` behavior matches `docs/API.md`; provider-unavailable behavior is understood if credentials are intentionally absent.
- [ ] `POST /api/ingest` contract/error behavior was verified without sending sensitive production data.
- [ ] `GET /api/status` returns healthy status, or a degraded status was investigated and explicitly accepted by the release owner.
- [ ] Manifest, static assets, resume link, and project/activity media load.
- [ ] Security headers and CSP were inspected.
- [ ] No unexpected console errors, failed function requests, exposed environment values, or redirect errors were found.
- [ ] Verification notes and screenshots/log references are attached to the release record.

## Rollback readiness and execution

- [ ] Last known-good deployment URL and commit SHA recorded: ____________________
- [ ] Rollback owner authorized to act: ____________________
- [ ] Application/data migration impact reviewed.
- [ ] If rollback is required, production traffic is returned to the known-good Vercel deployment or a reviewed revert is merged through the normal workflow.
- [ ] After rollback, the deployed commit, core routes, API status, security headers, and assets were rechecked.
- [ ] Incident details, logs, impact, rollback time, and follow-up actions recorded.

## Release sign-off

- Release owner: ____________________
- Verification completed by: ____________________
- Final status: [ ] Approved  [ ] Blocked  [ ] Rolled back
- Notes / follow-up issue: ____________________
