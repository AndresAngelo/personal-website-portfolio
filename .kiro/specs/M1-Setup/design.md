---
name: m1-setup-design
description: Design for M1: Project Setup & Astro Scaffold
---

# Design --- M1: Project Setup & Astro Scaffold

## Overview

This milestone establishes the infrastructure foundation for the AEA Personal Portfolio. It includes project configuration, CI/CD pipeline setup, and the base layout architecture.

## Architecture

### Components

**Core Components:**
- `Layout.astro` - Main layout wrapper
- `SidebarNav.astro` - Navigation sidebar
- `HomeRow.astro` - Home section component (scaffold)
- `ContactRow.astro` - Contact section component (scaffold)

**Infrastructure:**
- `astro.config.mjs` - Astro configuration
- `vercel.json` - Vercel deployment config
- `.github/workflows/ci.yml` - GitHub Actions workflow

### Data Flow

```
User Request
    ↓
Vercel (Deployment)
    ↓
Astro SSR/Static Generation
    ↓
Layout.astro (Wrapper)
    ↓
SidebarNav.astro + Content Rows
    ↓
HTML Output
```

### Key Files

```
.kiro/specs/M1-Setup/
├── requirements.md
├── design.md
└── tasks.md

src/
├── components/
│   ├── Layout.astro
│   └── SidebarNav.astro
├── layouts/
│   └── Layout.astro
└── pages/
    ├── index.astro
    └── contact.astro

.github/workflows/
└── ci.yml

astro.config.mjs
vercel.json
tsconfig.json
```

## Implementation Considerations

- Use Astro's `output: "hybrid"` config for flexibility
- Implement responsive design with CSS Grid/Flexbox
- Configure Vercel headers for optimization
- Set up proper build steps for production

## Dependencies

- Astro 7.x
- TypeScript
- Vercel CLI
- GitHub Actions

## References

- [Astro Configuration](https://docs.astro.build/en/reference/configuration-reference/)
- [Vercel Configuration](https://vercel.com/docs/configuration)
- [GitHub Actions Docs](https://docs.github.com/en/actions)