---
name: m2-rows-nav-design
description: Design for M2: Core Rows & Navigation
---

# Design --- M2: Core Rows & Navigation

## Overview

This milestone implements the primary content rows that structure the portfolio: Home, Projects, Activities, and Contact. Each row provides a distinct section with appropriate components and styling.

## Architecture

### Components

**Row Components:**
- `HomeRow.astro` - Hero section with intro content
- `ProjectsRow.astro` - Project grid with cards
- `ActivitiesRow.astro` - Timeline/grid of activities
- `ContactRow.astro` - Contact form and info

**Navigation:**
- `SidebarNav.astro` - Vertical navigation with scroll detection
- Enhanced with Intersection Observer for active section tracking

### Data Flow

```
User Interaction (Click Nav)
    ↓
Smooth Scroll to Section
    ↓
Intersection Observer Detects Section
    ↓
Update Active Navigation State
    ↓
Highlight Active Nav Item

Component Render
    ↓
Fetch Content Data
    ↓
Render Cards/Grid
    ↓
Apply Animations
```

### Key Files

```
src/components/
├── HomeRow.astro
├── ProjectsRow.astro
├── ActivitiesRow.astro
├── ContactRow.astro
└── SidebarNav.astro

src/styles/
└── rows.css

src/pages/
├── index.astro (includes all rows)
└── layouts/
    └── Layout.astro (updated for row structure)
```

## Implementation Considerations

- Use CSS Grid for responsive layouts
- Implement smooth scroll with JavaScript
- Use Intersection Observer API for active section tracking
- Implement lazy loading for images
- Animate components on entry using CSS transitions

## Dependencies

- Astro 7.x
- CSS Grid/Flexbox
- Intersection Observer API
- Smooth Scroll Polyfill (for older browsers)

## References

- [M2 Requirements](./requirements.md)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)