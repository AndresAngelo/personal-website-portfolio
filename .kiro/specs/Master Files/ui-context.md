---
name: ui-context
description: UI/UX patterns, layout, and interaction model for the personal portfolio (Astro + RAG chatbot). This file defines the visual structure, navigation, and responsive behavior.
---

# UI Context — Personal Portfolio (AEA)

## Design Principles

- **Desktop-first**, then mobile.
- **Horizontal-scroll “presentation” UX** on desktop.
- **Conventional vertical UX** on mobile.
- **Dark mode default**, with light/dark toggle.
- **Minimal branding**; content and clarity over visual identity.
- **Rich animations**, primarily CSS-based, within CWV targets.

## Layout & Navigation

### Desktop

**Auto-hiding vertical sidebar** (left):

- Lists 4 rows: **Home**, **Projects**, **Activities**, **Contact**.
- Gradient underlayer behind the nav.
- Behavior:
  - Reveals on hover/proximity (left edge).
  - Retracts when idle (Windows taskbar–style).
- Clicking a nav item triggers a **vertical animation** to that row.

**Rows (full-viewport sections)**:

1. **Home / About**
   - Horizontal frames for narrative:
     - Hero (name, role, short intro).
     - Background / story parts.
     - Skills / positioning.
     - CTA (e.g., “View Projects”, “Download Resume”).
   - User scrolls **horizontally** through frames.

2. **Projects**
   - Horizontal gallery of project cards.
   - Clicking a card opens a **modal** with:
     - Title + tagline.
     - Problem statement.
     - Role & contributions.
     - Tech stack.
     - Links (repo, demo, case study).
     - Architecture placeholders.
     - Embedded videos (if any).
   - Media placeholders: **low-res blurred** with correct aspect ratio.

3. **Activities**
   - Horizontal timeline/gallery of:
     - Talks.
     - Hackathons.
     - Community engagement.
   - Optional modals for details.

4. **Contact**
   - Single full-viewport panel.
   - Content:
     - Email (`mailto:` link).
     - Phone number.
     - General location (e.g., “San Pedro, Calabarzon, PH”).
     - LinkedIn, GitHub links.
     - Resume PDF download link.
   - Privacy notice (short) included here.

**Scroll behavior**:

- Within a row: **horizontal scroll** is primary.
- Between rows: **vertical animation** triggered by nav clicks.

### Mobile

- **Conventional vertical scrolling**:
  - Rows stacked: Home → Projects → Activities → Contact.
- Navigation:
  - Top or bottom nav bar (no auto-hide sidebar).
- Within rows:
  - Projects/Activities: **vertical lists** (fallback from horizontal carousels).
  - Home: vertical scroll for narrative.
  - Contact: single panel.

## Theming

- **Dark mode default**.
- Light/dark toggle:
  - Implemented via CSS variables (design tokens).
  - Preference persisted in `localStorage`.
- Minimal branding; neutral color palette driven by theme.

## Typography & Spacing

- Use **standard Astro/Tailwind breakpoints** (`sm`, `md`, `lg`, `xl`, `2xl`).
- Clear hierarchy:
  - `<h1>`: page/row title.
  - `<h2>`: section headings.
  - `<h3>`: subsections (if needed).
- Generous whitespace; minimal visual noise.

## Animations

- **Horizontal frame shifts** between sections in a row.
- **Scroll-triggered animations** for “presentation” feel.
- Primarily **CSS transitions & keyframes**.
- Optional JS-based animations via islands only where needed.

## Internationalization (i18n)

- Languages: **English (default)**, **Tagalog**, **Mandarin**, **Hindi**.
- Language toggle component:
  - Updates site copy (nav labels, row content, etc.).
  - Updates chatbot UI labels and response language.
- All content authored in English first, then translated.

## Chatbot UI

- **Floating widget** (bottom-right) on all pages.
- Built with **Vercel AI SDK UI**.
- Features:
  - **Streaming responses**.
  - **Markdown rendering**.
  - **Clickable source cards** + inline citations.
  - Short intro message when opened.
  - “Sources” section in each answer.

## Accessibility

- No dedicated a11y patterns for v1.
- Semantic HTML by default:
  - `<nav>`, `<main>`, `<section>`, `<footer>`.
  - Proper heading hierarchy.
- Reasonable color contrast (especially in dark mode).

## PWA

- **Installable**:
  - `manifest.webmanifest` in `/public`.
  - Service worker (`sw.js`) registered via `client:load` script.
- Offline support for static assets (optional, basic).

## References

- `06-Concept-Decisions-Portfolio.md` – Canonical concept decisions.
- `project-overview.md` – High-level project overview.
- `architecture-context.md` – Technical architecture.
- `code-standards.md` – Coding standards (including CSS/tokens).
