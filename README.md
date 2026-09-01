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
│   └── resume.pdf           # Resume download
├── .kiro/                    # Kiro IDE configuration
├── HANDOFF/                  # Project handoff documentation
│   ├── STAGE1-TO-STAGE2-HANDOFF.md
│   └── STAGE2-TO-STAGE3-HANDOFF.md
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
- `problem` - Problem statement
- `role` - Your role in the project
- `techStack` - Array of technologies used
- `links` - Optional links (repo, demo, caseStudy)

### Activities Collection
- `title` - Activity name
- `date` - Activity date
- `description` - Brief description

### FAQ Collection
- `question` - Question text
- `answer` - Answer text

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

1. Add content to `src/content/projects/`, `src/content/activities/`, or `src/content/faq/`
2. Use the provided YAML frontmatter structure
3. The site automatically rebuilds during development
4. View changes at `http://localhost:4321`

## 🎯 Next Steps (From HANDOFF)

See the `HANDOFF/` folder for detailed specifications and implementation notes:
- STAGE1-TO-STAGE2-HANDOFF.md
- STAGE2-TO-STAGE3-HANDOFF.md

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

For questions or support, please open an issue in this repository.
