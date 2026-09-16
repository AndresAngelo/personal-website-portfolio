---
name: m3-content-design
description: Design for M3: Content Integration
---

# Design --- M3: Content Integration

## Overview

This milestone implements Astro Content Collections for Projects, Activities, and FAQ. Content is stored as Markdown files and rendered through dedicated components.

## Architecture

### Components

**Content Collections:**
- `src/content/projects/schema.ts` - Project schema
- `src/content/activities/schema.ts` - Activity schema
- `src/content/faq/schema.ts` - FAQ schema

**Content Card Components:**
- `ProjectCard.astro` - Renders individual project
- `ActivityCard.astro` - Renders individual activity
- `FAQCard.astro` - Renders FAQ item with collapsible answer

**Collection Pages:**
- `src/content/config.ts` - Content collection configuration

### Data Flow

```
Content File (Markdown)
    ↓
Content Collections API
    ↓
TypeScript Schema Validation
    ↓
Component Renders Content
    ↓
HTML Output

User Content Update
    ↓
Markdown File Modified
    ↓
Build Process Detects Change
    ↓
Updated HTML Generated
```

### Key Files

```
src/content/
├── projects/
│   ├── project1.md
│   └── schema.ts
├── activities/
│   ├── activity1.md
│   └── schema.ts
├── faq/
│   ├── faq1.md
│   └── schema.ts
└── config.ts

src/components/
├── ProjectCard.astro
├── ActivityCard.astro
└── FAQCard.astro

src/pages/
├── projects.astro
├── activities.astro
└── faq.astro
```

## Implementation Considerations

- Use Astro's `defineCollection` API
- Implement TypeScript schemas for validation
- Create reusable card components
- Support frontmatter metadata
- Implement proper error handling

### Media Fields Implementation

**Projects:**
- `heroImage`: Optional string - used for project hero banners
- `videoPitch`: Optional string - embed video content for project pitches
- `pinned`: Optional boolean - controls project ordering (pinned items appear first)

**Activities:**
- `backgroundImage`: Optional string - enhances visual appeal of activity items
- `mediaType`: Optional enum ['image', 'video', 'gallery'] - indicates content type
- `links.eventPage`: Optional string - URL to event details
- `links.video`: Optional string - URL to video recordings or demos

**FAQ:**
- `category`: Optional string - enables grouping and filtering of FAQ items
- `relatedProjects`: Optional string[] - links related projects to FAQ items for cross-referencing

### Sorting Logic for Pinned Projects

- Pinned projects (pinned: true) appear first in the list
- Within pinned projects, maintain original collection order
- Non-pinned projects maintain chronological or alphabetical order
- Default sort behavior excludes pinned projects from standard sorting

## Dependencies

- Astro 7.x Content Collections
- TypeScript
- Markdown parser

## References

- [M3 Requirements](./requirements.md)
- [Astro Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)