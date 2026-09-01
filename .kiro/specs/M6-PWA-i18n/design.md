---
name: m6-pwa-i18n-design
description: Design for M6: PWA & i18n
---

# Design --- M6: PWA & i18n

## Overview

This milestone implements PWA capabilities and internationalization support, enabling offline access and multilingual content delivery.

## Architecture

### Components

**PWA Components:**
- `public/manifest.webmanifest` - Web app manifest
- `src/scripts/sw.js` - Service worker script
- `src/scripts/register-sw.js` - Service worker registration

**i18n Components:**
- `src/lib/i18n.ts` - Translation utilities
- `LanguageSelector.astro` - Language switcher component
- `src/content/i18n/` - Translation files

### Data Flow

```
User Visits Site
    ↓
Service Worker Registers
    ↓
Cache Assets (SW)
    ↓

User Changes Language
    ↓
Update Locale in State
    ↓
Load Translations
    ↓
Re-render Components
    ↓
Update URL

Request for Resource
    ↓
Service Worker Intercept
    ↓
Check Cache
    ↓
Return Cache or Network
```

### Key Files

```
public/
└── manifest.webmanifest

src/
├── scripts/
│   ├── sw.js                  # Service worker
│   └── register-sw.js         # Registration
├── lib/
│   └── i18n.ts                # Translation utilities
├── components/
│   └── LanguageSelector.astro # Language picker
├── content/
│   └── i18n/
│       ├── en.json
│       └── es.json
└── pages/
    ├── [lang]/
    │   ├── index.astro
    │   └── [...slug].astro
    └── index.astro             # Redirect to default lang

src/config.ts
└── i18nConfig.ts              # i18n settings
```

## Implementation Considerations

- Use Astro's built-in i18n routing
- Implement cache-first strategy for static assets
- Use network-first for API calls
- Include language parameter in all navigation
- Handle missing translations gracefully

## Dependencies

- Astro 7.x i18n support
- Service Worker API
- Web Manifest API

## References

- [M6 Requirements](./requirements.md)
- [Astro i18n Guide](https://docs.astro.build/en/guides/i18n/)