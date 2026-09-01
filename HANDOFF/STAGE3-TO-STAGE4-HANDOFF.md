Stage 3 -> Stage 4 Handoff
Spec-Driven Documents Generator

Folder Map

    .kiro/specs/M1-Setup/
    .kiro/specs/M2-Rows-Nav/
    .kiro/specs/M3-Content/
    .kiro/specs/M4-RAG-Backend/
    .kiro/specs/M5-RAG-UI/
    .kiro/specs/M6-PWA-i18n/
    .kiro/specs/M7-Performance/
    .kiro/specs/M8-Security/
    .kiro/specs/M9-QA-Handoff/

    Each milestone contains:
    - requirements.md - User stories and acceptance criteria (EARS notation)
    - design.md - Technical architecture and implementation details
    - tasks.md - Discrete implementation tasks with dependencies

Spec Locations

    All 27 spec files created in .kiro/specs/ subdirectories

Media Files Location

    Custom media organization at public/Public materials/
    Subfolders:
    - Activities/ - Activity photos and media
    - Projects/ - Project photos, videos, and media
    - faq/ - FAQ-related assets including resume.pdf

    Specific files:
    - Resume PDF: public/Public materials/faq/resume.pdf
    - Project media: Photos and videos in public/Public materials/Projects/
    - Activity media: Photos in public/Public materials/Activities/

Environment Overview

    Hosting: Vercel (Hybrid mode)
    Vector DB: Supabase Postgres / pgvector (M4)
    LLM Provider: Hugging Face Spaces (Qwen Instruct) (M4)

Dependencies Manifest

    @astrojs/vercel, @astrojs/sitemap, ai, eslint

Immutable Boundaries

    Astro 7.x hybrid output mode, 4-Row layout model, Docs-only RAG logic
    Custom media folder structure: public/Public materials/ (Activities/, Projects/, faq/)

Spec Summary

    Total Milestones: 9
    Total Files: 27 (3 files per milestone)

Milestone Breakdown

    M1: Project Setup & Infrastructure (18 tasks, ~7 hours)
    M2: Core Rows & Navigation (15 tasks, ~6 hours)
    M3: Content Integration (12 tasks, ~5 hours)
    M4: RAG Chatbot Backend (18 tasks, ~8 hours)
    M5: RAG Chatbot UI (12 tasks, ~5 hours)
    M6: PWA & i18n (10 tasks, ~4 hours)
    M7: Performance & SEO (8 tasks, ~4 hours)
    M8: Security & Compliance (6 tasks, ~3 hours)
    M9: Final QA & Handoff (10 tasks, ~5 hours)

Known Ambiguities

    Vector DB choice: Supabase Postgres + pgvector (recommended)
    Qwen model variant: Qwen2.5-Instruct (default)

"Do Not Change" Boundaries

    Astro 7.x hybrid mode
    4-row layout architecture
    Docs-only RAG logic
    Dark mode default
    Zero analytics (platform default only)

Areas Needing Implementation Focus

    RAG pipeline (M4): Vector DB setup, embeddings generation, chat API
    UI/UX animations (M2): Smooth transitions, performance monitoring
    i18n support (M6): Translation workflow and content management
    Security headers (M8): CSP configuration, rate limiting
    E2E testing (M9): Test coverage for all major user flows

EOF