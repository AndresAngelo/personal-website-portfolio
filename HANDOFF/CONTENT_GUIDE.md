# Content Guide

Portfolio content is repository-managed. A content edit is a code change: review it, validate it, and deploy it through the normal branch/CI workflow.

## Collections

| Collection | Directory | Required content | Optional content |
|---|---|---|---|
| Projects | `src/content/projects/` | See the project schema and existing entries for required title/description/card fields. | Media, tagline, pinned state, problem, role, tech stack, and links. |
| Activities | `src/content/activities/` | Title, date, description, and location according to the collection schema. | Background media, media type, and event/video links. |
| FAQ | `src/content/faq/` | Question and answer. | Category and related project slugs. |

The authoritative schemas are in the collection configuration/source files. Do not guess fields when adding a new entry; compare with a current valid entry and run validation.

## Editing workflow

1. Choose the correct collection directory.
2. Create or edit a Markdown/MDX entry using the existing frontmatter shape.
3. Use ISO dates (`YYYY-MM-DD`) for activity dates.
4. Keep URLs valid and use stable project slugs.
5. Add media under the established folders:
   - `public/Public materials/Projects/`
   - `public/Public materials/Activities/`
   - `public/Public materials/faq/`
6. Use lowercase, hyphen-separated media filenames and update frontmatter references.
7. Keep public content free of secrets, private data, and provider credentials.
8. Run:

```powershell
npm.cmd run test:content
npm.cmd run typecheck
npm.cmd run build
```

9. Review the rendered page and relevant localized route in a browser-capable environment.
10. Submit the change through the reviewed branch/CI workflow.

## Media rules

- Keep the established `public/Public materials/` directory structure.
- Confirm every referenced file exists and loads after build.
- Avoid unnecessarily large media; optimize assets before committing them.
- Do not place credentials, private documents, or unapproved personal data in `public/`.

## RAG content

The assistant is intended to answer from portfolio documents, including resume, projects, activities, and FAQ content. When adding information that should be available to the assistant, use the approved content collections or documented ingestion workflow. Do not add claims that are not supported by the portfolio owner’s source material.

## Common mistakes

- Invalid frontmatter or missing required fields.
- Dates that are not ISO formatted.
- Broken media paths or moving established media folders.
- Duplicate or unstable slugs.
- Adding credentials or private contact information.
- Editing generated `.astro/` output instead of source content.
- Omitting content validation before review.

See `docs/MAINTENANCE.md` for component/content validation and `docs/API.md` for ingestion contract details.
