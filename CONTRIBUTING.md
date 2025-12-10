# Contributing

## Local Setup
1) Install dependencies: `npm install`
2) Run dev server: `npm run dev`
3) Lint before pushing: `npm run lint` (also available as `npm test`)

## Pull Requests
- Keep PRs focused by sprint goal.
- Ensure sections use shared primitives (SectionHeader, StatCard) and tokens from `globals.css`.
- Respect `prefers-reduced-motion` and accessibility labels for new interactive elements.

## CI
GitHub Actions runs `npm run lint` on pushes/PRs to `main` (`.github/workflows/ci.yml`). Fix or annotate lint findings before merging.
