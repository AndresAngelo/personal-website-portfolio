---
name: m6-pwa-i18n-requirements
description: Requirements for M6: PWA & i18n
---

# Requirements --- M6: PWA & i18n

## Introduction

This milestone implements Progressive Web App (PWA) capabilities and internationalization (i18n) support for the portfolio, enabling offline access and multilingual content.

**Scope:**
- PWA manifest and service worker
- Offline capability with cache-first strategy
- Internationalization support (English, Spanish)
- Language selector component
- Translated content collections

**Out of Scope:**
- Additional languages beyond English/Spanish
- Complex translation workflows
- Advanced PWA features (background sync)
- Server-side rendering optimization

## Glossary

| Term | Definition |
|------|------------|
| PWA | Progressive Web App |
| i18n | Internationalization |
| Service Worker | Script that runs in background, enables offline features |
| Cache-First Strategy | Load from cache first, fallback to network |

## Requirements

### Requirement 6.1: PWA Manifest

**User Story:** As a user, I want to install the site, so that I can access it like an app.

#### Acceptation Criteria

1. Web manifest file exists at `/.well-known/webmanifest`
2. Includes name, short_name, and description
3. Defines icon assets for all sizes
4. Sets display mode to standalone
5. Specifies theme and background colors

### Requirement 6.2: Service Worker

**User Story:** As a user, I want offline access, so that I can view content without internet.

#### Acceptance Criteria

1. Service worker registered on page load
2. Caches critical assets on install
3. Cache-first strategy for static assets
4. Network-first strategy for API calls
5. Handles fetch events for all requests

### Requirement 6.3: Language Support

**User Story:** As a Spanish speaker, I want the site in my language, so that I can understand the content.

#### Acceptance Criteria

1. English and Spanish supported
2. Language selector available
3. Content translates for key pages
4. URL includes language code (/es/...)
5. Default language fallback works

### Requirement 6.4: Translation Management

**User Story:** As a developer, I want manageable translations, so that I can add new languages.

#### Acceptance Criteria

1. Translation files in structured format
2. Key-based translation system
3. TypeScript types for translation keys
4. Missing key detection in dev mode
5. Easy to add new languages

### Requirement 6.5: Language Selector

**User Story:** As a user, I want to switch languages, so that I can choose my preferred language.

#### Acceptance Criteria

1. Language selector in header
2. Shows current language
3. Lists available languages
4. Updates URL on selection
5. Persists preference in localStorage

## Constraints

- Must use Astro 7.x internationalization routing
- Service worker must cache < 50MB
- PWA must pass Lighthouse PWA audit
- Translations must be in JSON format
- URL structure: /{lang}/{path}

## References

- [Astro i18n Routing](https://docs.astro.build/en/guides/i18n/)
- [Web App Manifest](https://web.dev/manifest/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)