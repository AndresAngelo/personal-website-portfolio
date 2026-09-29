# AEA Website Portfolio

An AI-enhanced personal portfolio built with Astro, Vercel server rendering, structured content collections, bilingual routing, PWA support, and a RAG-powered portfolio assistant.

## Documentation

- [Developer documentation](docs/README.md)
- [Component and API reference](docs/API.md)
- [Content and maintenance guide](docs/MAINTENANCE.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Deployment checklist](DEPLOYMENT_CHECKLIST.md)
- [Handoff package](HANDOFF/README.md)
- [Final review](FINAL_REVIEW.md)
- [Stage 4 progress](docs/master/progress-tracker.md)
- [Known issues](docs/master/current-issues.md)

Production deployment procedures and rollback checklists are scheduled for M9 Task 9.7; this README documents local development and the current project structure.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Modern static site builder
- **Adapter**: `@astrojs/vercel` - Serverless deployment to Vercel
- **Features**: 
  - Sitemap generation (`@astrojs/sitemap`)
  - Edge API functions
  - Content collections
  - PWA support (manifest.webmanifest)
  - RAG-powered chat widget

## 📁 Project Structure

```
AEA-Website-Portfolio/
├── api/                      # Edge API functions
│   └── chat.ts              # Chat interface endpoint
├── scripts/                  # Build-time scripts
│   └── build-embeddings.ts  # Embedding generation
├── src/
│   ├── components/           # Astro components
│   │   ├── ActivitiesRow.astro
│   │   ├── ChatWidget.astro
│   │   ├── ContactRow.astro
│   │   ├── HomeRow.astro
│   │   ├── Layout.astro
│   │   ├── ProjectModal.astro
│   │   ├── ProjectsRow.astro
│   │   └── SidebarNav.astro
│   ├── content/              # Content collections
│   │   ├── activities/
│   │   ├── projects/
│   │   └── faq/
│   ├── lib/
│   │   ├── i18n.ts          # Internationalization
│   │   └── rag.ts           # RAG implementation
│   ├── scripts/             # Client-side scripts
│   │   └── sw.js            # Service worker
│   └── styles/
│       └── global.css       # Global styles
├── public/                   # Static assets
│   ├── manifest.webmanifest # PWA manifest
│   ├── Public materials/faq/AAndres-resume-AUG2026.pdf # Resume download
│   ├── projects/            # Project media (hero images, videos)
│   └── activities/          # Activity media (background images)
├── .kiro/                    # Kiro IDE configuration
├── HANDOFF/                  # Project handoff documentation
│   ├── STAGE1-TO-STAGE2-HANDOFF.md
│   ├── STAGE2-TO-STAGE3-HANDOFF.md
│   └── STAGE3-TO-STAGE4-HANDOFF.md
├── astro.config.mjs          # Astro configuration
└── vercel.json               # Vercel deployment config
```

## 🧩 Component API

Page composition is defined by `src/pages/index.astro` and `src/pages/[lang]/index.astro`. The main reusable component contracts are:

| Component | Props / contract | Responsibility |
|---|---|---|
| `HomeRow` | `title`, `subtitle`, `ctaText`, `ctaUrl` | Hero/introduction row and primary call to action. |
| `ProjectsRow` | Uses the projects content collection | Renders project cards and project details. |
| `ActivitiesRow` | `title` | Renders the activity timeline from the activities collection. |
| `ExperienceRow` | `title` | Renders the experience section. |
| `ContactRow` | `title`, `subtitle`, `email` | Renders contact information and links. |
| `SidebarNav` | No public props | Section navigation with active state and mobile menu behavior. |
| `ChatWidget` | No public props | Launcher, chat panel, messages, citations, input, persistence, and API interaction. |
| `LanguageSelector` | Optional `currentLanguage` (`en` or `es`) | Persists the preferred locale and navigates to the localized route. |
| `CookieConsent` | No public props | Stores essential cookie preference and exposes settings controls. |

Chat subcomponents are documented by their source interfaces: `ChatHeader` accepts optional `title` and `eyebrow`; `ChatInput` accepts optional `maxLength` and `placeholder`; `ChatMessages` accepts `messages` and `emptyMessage`; and `CitationDisplay` accepts optional citation records with `source`, `content`, `href`, and `score`.

See [`docs/API.md`](docs/API.md) for endpoint contracts and [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) before changing shared components.



### Prerequisites

- Node.js (v18+ recommended)
- npm or bun package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build static site
npm run build

# Preview the build locally
npm run preview
```

## 📝 Content Collections

The project uses Astro's Content Collections feature for structured content management:

### Projects Collection

Files live in `src/content/projects/` and are validated by `src/content/projects/schema.ts`.

- `title`, `description`, `tags`, `image`, `link` — required project card fields.
- `heroImage`, `videoPitch`, `pinned`, `tagline`, `problem`, `role`, `techStack` — optional presentation fields.
- `links` — optional `repo`, `demo`, and `caseStudy` URLs.

### Activities Collection

Files live in `src/content/activities/` and are validated by `src/content/activities/schema.ts`.

- `title`, `date` (`YYYY-MM-DD`), `description`, `location` — required timeline fields.
- `backgroundImage`, `mediaType` (`image`, `video`, or `gallery`) — optional media fields.
- `links` — optional `eventPage` and `video` URLs.

### FAQ Collection

Files live in `src/content/faq/` and are validated by `src/content/faq/schema.ts`.

- `question`, `answer` — required FAQ content.
- `category`, `relatedProjects` — optional organization and project relationships.

Create Markdown or MDX files with YAML frontmatter matching the relevant schema. The collections are registered in `src/content.config.ts`.

### Content workflow

1. Add or edit a file in the appropriate collection directory.
2. Add media under `public/Public materials/Projects/`, `Activities/`, or `faq/` when needed.
3. Use lowercase, hyphen-separated media filenames and update frontmatter paths.
4. Run `npm.cmd run test:content`.
5. Run `npm.cmd run typecheck` and `npm.cmd run build` before sharing the change.


## 🔍 Media Files

This project uses media files to enhance your portfolio with visual content:

### Resume PDF
- **Location**: `public/Public materials/faq/AAndres-resume-AUG2026.pdf`
- Replace this file with your actual resume PDF
- The file is linked from the Contact section

### Background Images
- **No background images currently** (will be added during implementation)
- Background images for activities should be placed in `public/activities/`

### Project Media
- **Hero Images**: Place project hero images in `public/projects/` subfolder
- **Video Pitches**: Embed videos from YouTube or Vimeo via the `videoPitch` field
- Reference media using relative paths: `heroImage: "/projects/my-project-hero.jpg"`

### Activity Media
- **Background Images**: Place activity background images in `public/activities/` subfolder
- **Media Types**: Supports image, video, or gallery types via `mediaType` field
- Reference media using relative paths: `backgroundImage: "/activities/my-activity-bg.jpg"`

**Note**: When adding media files, use lowercase filenames with hyphens for consistency (e.g., `my-project-hero.jpg`).

## 📄 Placeholder Files

The project includes sample content files to help you get started:

- **Sample files location**: `src/content/activities/sample-activity.md`, `src/content/projects/sample-project.md`, `src/content/faq/sample-faq.md`
- **Comments indicate**: Where to add your real content and which fields are optional
- **Media files**: Should be added to the appropriate `public/` subfolders
- **Personal portfolio**: The sample project is pinned to the top for demonstration purposes

**Tip**: Edit the sample files or create new files with your actual content, following the same YAML frontmatter structure.

## 🔍 AI Features

### RAG-Powered Chat

The portfolio assistant is rendered by `src/components/ChatWidget.astro` and uses the `POST /api/chat` route. The service layer lives in `src/lib/rag.ts`; ingestion is implemented in `src/lib/ingestion.ts` and exposed through `POST /api/ingest`; vector health is exposed through `GET /api/status`.

Read the complete request and response contracts in [`docs/API.md`](docs/API.md). Provider credentials are server-only and must be supplied through environment configuration.

## 🌐 Deployment

### Vercel (Recommended)

The project is configured for automatic deployment to Vercel:

1. Connect your repository to Vercel
2. The build command `astro build` runs automatically
3. Output directory: `./dist`

### Manual Deployment

```bash
npm run build
# Deploy the ./dist directory to your hosting provider
```

## 🔒 Security Headers

The `vercel.json` includes security headers for production:

- Content-Security-Policy
- Strict-Transport-Security

## 📱 PWA Support

The project includes a web app manifest (`public/manifest.webmanifest`) for progressive web app capabilities.

## 🛡️ Configuration

### Astro Config (`astro.config.mjs`)

- Output mode: `hybrid` (SSG + SSR)
- Adapter: Vercel
- Integrations: Sitemap

## 📚 Development Workflow

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` for local provider configuration.
3. Start the development server with `npm run dev` and use the local URL printed by Astro.
4. Add content and media using the workflow above.
5. Run focused tests for changed behavior, then `npm.cmd run typecheck`, `npm.cmd run lint`, and `npm.cmd run build`.
6. Review `docs/master/current-issues.md` and update documentation when behavior or known limitations change.

On Windows systems where PowerShell blocks script shims, invoke npm explicitly as `npm.cmd` or `& "C:\Program Files\nodejs\npm.cmd"`.

## 📚 Further Documentation

- [`docs/README.md`](docs/README.md) — documentation index and developer path
- [`docs/API.md`](docs/API.md) — API and component contracts
- [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) — content, validation, and troubleshooting
- [`docs/specs/M9-QA-Handoff/`](docs/specs/M9-QA-Handoff/) — approved QA and handoff specifications
- [`docs/handoff/STAGE3-TO-STAGE4-HANDOFF.md`](docs/handoff/STAGE3-TO-STAGE4-HANDOFF.md) — implementation boundaries and stage context

## 🎯 Next Steps

1. **Replace placeholder files** with your actual content (see Placeholder Files section above)
2. **Prepare media files**:
   - Add the current resume PDF to `public/Public materials/faq/AAndres-resume-AUG2026.pdf`
   - Create project hero images and place them in `public/projects/`
   - Add activity background images to `public/activities/`
3. **Review HANDOFF documentation** for detailed specifications and implementation notes:
   - `HANDOFF/STAGE1-TO-STAGE2-HANDOFF.md`
   - `HANDOFF/STAGE2-TO-STAGE3-HANDOFF.md`
4. **Customize the design** to match your personal brand (see `src/styles/global.css`)
5. **Deploy to Vercel** when ready for production

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For questions or support, please open an issue in this repository.







