# Maintenance Guide

## Content updates

Portfolio content is managed through Markdown or MDX files in:

- `src/content/projects/`
- `src/content/activities/`
- `src/content/faq/`

Astro validates frontmatter through `src/content.config.ts` and the collection schemas. A malformed entry can fail the build; run the content check after editing content:

```powershell
npm.cmd run test:content
```

Use lowercase, hyphen-separated media filenames. Store custom media under the established `public/Public materials/` structure:

- `public/Public materials/Projects/`
- `public/Public materials/Activities/`
- `public/Public materials/faq/`

Update references in frontmatter when replacing media. Do not move the established media folders without updating the stage handoff and all content references.

## Component changes

Reusable UI components live in `src/components/`; page composition lives in `src/pages/`; shared document structure lives in `src/layouts/`. Preserve the four-row layout, dark-mode default, locale routing, and accessible controls described in the root README and component API notes.

When changing interactive components, verify keyboard behavior, focus visibility, ARIA state changes, responsive breakpoints, and reduced-motion behavior. For the chat UI, also verify the API error state when provider credentials are unavailable.

## Environment and provider configuration

Use `.env.example` as the safe list of expected variables. Keep secrets in local environment configuration or the deployment provider; never commit `.env` values or provider tokens. Provider-backed RAG behavior cannot be fully verified without the corresponding credentials.

## Validation workflow

From the project root, run:

```powershell
npm.cmd run test:content
npm.cmd run test:m4
npm.cmd run test:m5
npm.cmd run test:m6
npm.cmd run test:m7
npm.cmd run test:m8
npm.cmd run test:api
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Run the focused command for the area you changed, then run the full deterministic suite when practical:

```powershell
npm.cmd test
```

The build uses the Vercel adapter and may report non-blocking route warnings. Treat TypeScript, lint, test, and build errors as blockers until investigated.

## Troubleshooting

### Content validation fails

Check the edited file against the relevant schema and confirm required fields, URL values, ISO dates, and array values are valid.

### Chat returns a provider configuration error

Confirm the required server-side provider key is available in the local environment. Do not solve this by adding a client-side key.

### API tests fail outside Astro

Run the repository test command so the existing test runner and test environment are used. Directly importing an Astro API route without its normal context or environment can produce misleading errors.

### Development server is blocked by PowerShell

Use the Windows command shim explicitly:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Change checklist

Before handing off a maintenance change:

- Update the relevant content/schema/component documentation.
- Run the focused test and validation commands.
- Check responsive and keyboard behavior for UI changes.
- Confirm no secrets or generated output were added.
- Review `docs/master/current-issues.md` for known limitations.
