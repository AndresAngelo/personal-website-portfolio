# AEA Website Portfolio

An AI-enhanced personal portfolio website built with Astro, featuring intelligent search capabilities powered by RAG (Retrieval-Augmented Generation).

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
│   ├── resume.pdf           # Resume download
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

## 🚀 Getting Started

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
- `title` - Project name
- `tagline` - Short description
- `heroImage` - Optional hero image URL (place in public/projects/)
- `videoPitch` - Optional video pitch URL (YouTube/Vimeo)
- `description` - Detailed description
- `pinned` - Pin this project to the top (true for personal portfolio)
- `links` - Optional links (repo, demo, caseStudy)

### Activities Collection
- `title` - Activity name
- `date` - Activity date
- `description` - Brief description
- `backgroundImage` - Optional background image URL (place in public/activities/)
- `mediaType` - Type of media: image, video, or gallery
- `links` - Optional links (eventPage, video)

### FAQ Collection
- `question` - Question text
- `answer` - Answer text
- `category` - Category for organizing
- `relatedProjects` - Array of related project slugs

## 🔍 Media Files

This project uses media files to enhance your portfolio with visual content:

### Resume PDF
- **Location**: `public/resume.pdf`
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
The project includes a baseline RAG implementation for intelligent search:

- `src/lib/rag.ts` - Document chunking and retrieval
- `api/chat.ts` - Edge API for chat interactions
- `src/components/ChatWidget.astro` - Chat UI component
- `scripts/build-embeddings.ts` - Generate embeddings for content

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

1. **Prepare media files**: Add your resume, project images, and activity backgrounds to the `public/` folder
2. **Add content**: Edit or create files in `src/content/projects/`, `src/content/activities/`, or `src/content/faq/`
3. **Reference media**: Use relative paths to link media files (e.g., `/projects/my-hero.jpg`)
4. The site automatically rebuilds during development
5. View changes at `http://localhost:4321`

## 🎯 Next Steps

1. **Replace placeholder files** with your actual content (see Placeholder Files section above)
2. **Prepare media files**:
   - Add your resume PDF to `public/resume.pdf`
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







