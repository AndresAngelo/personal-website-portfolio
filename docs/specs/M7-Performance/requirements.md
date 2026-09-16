---
name: m7-performance-requirements
description: Requirements for M7: Performance & SEO
---

# Requirements --- M7: Performance & SEO

## Introduction

This milestone focuses on optimizing the portfolio for performance and search engine visibility, including Core Web Vitals optimization, structured data, and sitemap generation.

**Scope:**
- Core Web Vitals optimization (LCP, FID, CLS)
- Structured data for SEO
- XML sitemap generation
- Image optimization
- Code splitting and lazy loading

**Out of Scope:**
- Advanced caching strategies
- CDN configuration
- Complex analytics implementation
- A/B testing

## Glossary

| Term | Definition |
|------|------------|
| CWV | Core Web Vitals (LCP, FID, CLS) |
| LCP | Largest Contentful Paint |
| FID | First Input Delay |
| CLS | Cumulative Layout Shift |

## Requirements

### Requirement 7.1: Core Web Vitals

**User Story:** As a visitor, I want fast loading, so that I have a good experience.

#### Acceptance Criteria

1. LCP < 2.5s on desktop
2. FID < 100ms on desktop
3. CLS < 0.1 on desktop
4. Performance score > 90 in Lighthouse
5. CWV metrics pass Google Search Console

### Requirement 7.2: Image Optimization

**User Story:** As a visitor, I want fast image loading, so that I can see content quickly.

#### Acceptance Criteria

1. All images optimized for web
2. Responsive images with srcset
3. WebP format where supported
4. Lazy loading for below-fold images
5. Proper image dimensions specified

### Requirement 7.3: Structured Data

**User Story:** As a search engine, I want structured data, so that I can understand the content.

#### Acceptance Criteria

1. JSON-LD structured data added
2. Schema.org markup forPerson, Project, Activity
3. Markup validates with Google Rich Results Test
4. Updated on content changes
5. Error handling for missing data

### Requirement 7.4: Sitemap

**User Story:** As a search engine, I want a sitemap, so that I can crawl the site efficiently.

#### Acceptation Criteria

1. XML sitemap at `/sitemap.xml`
2. Includes all public pages
3. Updates on content changes
4. Includes last modified dates
5. Supports i18n with hreflang

### Requirement 7.5: Code Splitting

**User Story:** As a visitor, I want quick page loads, so that I don't wait for unused code.

#### Acceptance Criteria

1. Code split by route
2. Dynamic imports for heavy components
3. Critical CSS inlined
4. Async loading for non-critical scripts
5. Bundle size monitored

### Requirement 7.6: Accessibility

**User Story:** As a user with disabilities, I want the site to be accessible, so that I can use it.

#### Acceptance Criteria

1. Passes WCAG 2.1 AA standards
2. Keyboard navigation works
3. Screen reader compatible
4. Color contrast > 4.5:1
5. Alt text for all images

## Constraints

- Must use Astro's built-in optimization features
- All images must use `<img>` with width/height
- Structured data must follow Schema.org
- Sitemap must be auto-generated
- Performance must meet Google's Core Web Vitals thresholds

## References

- [Google Core Web Vitals](https://developer.chrome.com/docs/lighthouse/web-performance/)
- [Schema.org](https://schema.org/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)