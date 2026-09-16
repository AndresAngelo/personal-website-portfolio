---
name: project-overview
description: High-level overview of the personal portfolio project (Astro + RAG chatbot). This is the entry point for understanding scope, goals, visitors, and success criteria.
---

# Project Overview — Personal Portfolio (AEA)

## Purpose

This project is a **personal portfolio website** for an AI engineering professional, built with **Astro 7.x** and hosted on **Vercel**. It showcases:

- Projects (AI/engineering work).
- Activities (talks, hackathons, community engagement).
- A concise narrative about the author (Home/About).
- Contact information and resume (PDF).

It also includes a **minimal RAG chatbot** that answers questions strictly from provided documents (resume, projects, activities, FAQ) with citations and source cards.

## Goals

- Provide a **fast, visually engaging portfolio** with a distinctive horizontal-scroll desktop UX and conventional mobile UX.
- Enable visitors (recruiters, peers) to:
  - Understand your background and positioning.
  - Explore your projects and activities.
  - Ask an AI assistant questions about your background, projects, and resume.
  - Contact you easily.
- Maintain a **low-operational-overhead** stack:
  - No auth, no CMS, no analytics beyond Vercel logs.
  - Content driven by Markdown/JSON in the repo.
  - Deployed via Git → Vercel with CI checks.

## Primary Visitors

- **Technical recruiters / HR**.
- **Community / peers** (AI engineers, collaborators).

## Top Visitor Actions

1. **View projects**.
2. **Chat with the AI bot** to learn more about you.
3. **Contact you** (email/links).

## Core Sections (Rows)

The site is organized into 4 rows:

1. **Home / About** – Narrative “story” of your career.
2. **Projects** – Horizontal gallery of project cards + modals.
3. **Activities** – Horizontal timeline/gallery of talks, hackathons, community work.
4. **Contact** – Contact info, location, social links, resume PDF download.

## Key Features

- **Desktop UX**:
  - Auto-hiding vertical sidebar (left) for row navigation.
  - Horizontal scrolling within each row.
  - Vertical animation when switching rows.
- **Mobile UX**:
  - Conventional vertical scrolling.
  - Rows stacked vertically.
  - Projects/Activities as vertical lists.
- **RAG Chatbot**:
  - Floating widget (bottom-right).
  - Strictly docs-only answers with citations.
  - Multi-turn, language-aware (en/tl/zh/hi).
  - Streaming responses, Markdown, clickable source cards.
- **PWA**:
  - Installable, with manifest + service worker.
- **i18n**:
  - English (default), Tagalog, Mandarin, Hindi.
  - Language toggle affects site copy and chatbot language.

## Non-Goals (Out of Scope)

- No blog or writing section in v1.
- No contact form (mailto/links only).
- No analytics beyond Vercel logs.
- No authentication or admin panel.
- No custom domain initially.

## Success Criteria

- **Performance**: Meets Core Web Vitals “good” thresholds on mobile:
  - LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **UX**:
  - Desktop horizontal-scroll experience feels smooth and “presentation-like”.
  - Mobile UX is simple, fast, and conventional.
- **Chatbot**:
  - Answers are grounded in docs, with citations.
  - Latency ≤ 10s per query.
- **Maintainability**:
  - Adding/updating projects or activities is straightforward (edit Markdown/JSON → push → deploy).
  - No complex ops or monitoring.

## References

- `06-Concept-Decisions-Portfolio.md` – Canonical decisions across all 6 concept areas.
- `architecture-context.md` – Technical architecture and stack.
- `ui-context.md` – UI/UX patterns, layout, and interaction model.
- `ai-workflow-rules.md` – RAG chatbot behavior and constraints.
