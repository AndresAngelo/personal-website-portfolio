---
name: m3-content-requirements
description: Requirements for M3: Content Integration
---

# Requirements --- M3: Content Integration

## Introduction

This milestone integrates content collections for Projects, Activities, and FAQ data. Content is stored in Markdown files and managed through Astro's content collections API, enabling non-technical content management.

**Scope:**
- Projects content collection with Markdown files
- Activities content collection with Markdown files
- FAQ content collection with Markdown files
- Content card components that render from collections
- Content management workflow for non-technical users

**Out of Scope:**
- RAG chatbot integration (M4, M5)
- PWA features (M6)
- Performance optimization (M7)
- Security hardening (M8)
- Advanced content editing interface

## Glossary

| Term | Definition |
|------|------------|
| Content Collection | Group of content files managed by Astro |
| Markdown Frontmatter | Metadata at the top of Markdown files |
| Content Schema | Type definition for content structure |

## Requirements

### Requirement 3.1: Projects Collection

**User Story:** As a content manager, I want to add projects through Markdown files, so that I can manage content without coding.

#### Acceptance Criteria

1. Projects are stored in `src/content/projects/` directory
2. Each project has a Markdown file with frontmatter
3. Frontmatter includes: title, description, tags, image, link
4. Projects display in ProjectsRow component
5. Project cards show all relevant information

#### Media Fields (New)

1. `heroImage`: Optional hero image URL for the project
2. `videoPitch`: Optional video pitch URL (YouTube/Vimeo)
3. `pinned`: Optional boolean to pin projects to the top of the list

### Requirement 3.2: Activities Collection

**User Story:** As a content manager, I want to add activities through Markdown files, so that I can document my experience easily.

#### Acceptance Criteria

1. Activities are stored in `src/content/activities/` directory
2. Each activity has a Markdown file with frontmatter
3. Frontmatter includes: title, date, description, location
4. Activities display in ActivitiesRow component
5. Timeline shows activities in chronological order

#### Media Fields (New)

1. `backgroundImage`: Optional background image URL for the activity
2. `mediaType`: Optional enum of 'image', 'video', or 'gallery'
3. `links.eventPage`: Optional URL to the event page
4. `links.video`: Optional URL to related video content

### Requirement 3.3: FAQ Collection

**User Story:** As a visitor, I want to find answers to common questions, so that I can get information quickly.

#### Acceptance Criteria

1. FAQ items are stored in `src/content/faq/` directory
2. Each FAQ has a Markdown file with frontmatter
3. Frontmatter includes: question, answer, category
4. FAQ displays as collapsible cards
5. Search/filter functionality for categories

#### Enhanced Fields (New)

1. `category`: Optional string for organizing FAQ items by topic
2. `relatedProjects`: Optional array of project slugs that this FAQ relates to

### Requirement 3.4: Content Schema Validation

**User Story:** As a developer, I want content validation, so that content editors don't break the site.

#### Acceptance Criteria

1. TypeScript schemas define content structure
2. Invalid content files cause build errors
3. Required fields are enforced
4. Proper error messages guide content editors
5. Schema updates without breaking existing content

### Requirement 3.5: Content Card Components

**User Story:** As a visitor, I want to see content in cards, so that information is digestible.

#### Acceptance Criteria

1. Project cards display all project information
2. Activity cards display timeline items
3. FAQ cards have expandable answers
4. Cards are responsive and accessible
5. Hover states provide interactivity

### Requirement 3.6: Pinned Projects Feature

**User Story:** As a site owner, I want to pin important projects to the top of the list, so that visitors see my personal portfolio first.

#### Acceptance Criteria

1. Projects with `pinned: true` display above non-pinned projects
2. Pinned projects maintain their relative order among themselves
3. Non-pinned projects maintain chronological or alphabetical order
4. Pinned indicator is visible in the UI (optional)
5. Default behavior excludes pinned projects from normal sorting

## Constraints

- Must use Astro Content Collections API
- Content files must use Markdown format
- Frontmatter must be YAML format
- Schemas must be TypeScript-based
- All content must be accessible through components

## References

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown Frontmatter](https://jekyllrb.com/docs/front-matter/)
- [TypeScript Schema Validation](https://typescriptlang.org)