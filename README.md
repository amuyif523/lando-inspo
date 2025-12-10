# Neural Architect Portfolio

Futuristic, cyberpunk-inspired portfolio for **Amanuel Fikremariam** (AI architect & ML/data engineer).

## Features
- Hero with boot sequence, particle background, and cyberpunk profile.
- Data Command Center with live GitHub activity/stats and contribution heatmap.
- Neural Core 3D viewer with system capability tiles.
- Terminal with interactive commands (`help`, `skills`, `projects`, `contact`).
- Projects Arsenal with module selection and inquiry drawer wired to the contact API.
- Contact form hitting `/api/contact` plus inquiry submission from the drawer.
- Performance/A11y: lazy-loaded 3D/particles, reduced-motion support, aria labels.
- SEO/Legal: Open Graph/Twitter metadata, sitemap/robots, 404, privacy, and terms pages.
- Analytics: Vercel Analytics embedded.

## Tech Stack
- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4
- Framer Motion
- React Three Fiber + Drei + Three.js
- Lucide React
- Vercel Analytics

## Getting Started
```bash
npm install
npm run dev
# lint/test
npm run lint
```

## Key Paths
- `src/app/page.tsx` — page composition.
- `src/components/` — UI components (Hero, DataHub, NeuralNetwork, TerminalSection, ProjectsSection, etc.).
- `src/content/` — structured content for profile, projects, stats.
- `src/lib/data.ts` — GitHub activity adapters with fallbacks.
- `src/app/api/contact/route.ts` — contact submission handler.
- `src/app/(privacy|terms|not-found|sitemap|robots).tsx` — supporting pages/endpoints.

## Deployment
- Optimized for Vercel. Update `metadataBase` in `src/app/layout.tsx` if deploying to a different domain.
