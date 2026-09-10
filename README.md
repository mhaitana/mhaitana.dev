# Matt Haitana — Portfolio

A personal portfolio website for Matt Haitana, a senior software engineer based in Melbourne, Australia.

## Tech stack

- **Next.js 15** with App Router
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (base-nova style)
- **Lucide Icons**
- **next-themes** for light/dark mode

## Features

- Responsive, accessible design with WCAG AA target
- Persistent light, dark and system theme selection
- Static site generation for performance
- SEO metadata, OpenGraph, Twitter cards, JSON-LD structured data
- Sitemap and robots.txt generation
- Multi-page architecture: Home, About, Worklog, Labs, Contact, Resume
- Expandable experience timeline on the About page
- Homepage production case studies sourced from career achievements
- Saved GitHub worklog with curated tools, grouped activity and accessible contribution summaries
- Email links and accessible clipboard copying on the Contact page
- Filterable studio projects with visible content before JavaScript
- Web and printable résumé from shared structured career data

## Getting started

```bash
npm install
npm run dev
```

## GitHub dashboard refresh

```bash
# Public data only
node scripts/fetch-github.mjs

# Include private contributions (languages + contribution graph)
GITHUB_TOKEN=ghp_xxx node scripts/fetch-github.mjs
```

This updates `lib/github-data.json`. Private repository names are never written to the file or shown on the site. To see private activity in the contribution graph, also enable **"Include private contributions on my profile"** in your GitHub profile settings.

Copy `.env.example` to `.env` if you want to store the token locally during development.


## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Deployment

See [Deployment.md](./Deployment.md).

## Structure

- `app/` — Next.js App Router pages
- `components/` — Reusable UI components and sections
- `lib/` — Data, utilities, and helper functions
- `public/` — Static assets

## Author

Matt Haitana — [GitHub](https://github.com/mhaitana) · [LinkedIn](https://www.linkedin.com/in/mhaitana)

## Verify changes

Node 24 is used for the built-in TypeScript unit tests. Browser tests use the locally installed Google Chrome.

```bash
npm run lint
npm run type-check
npm test
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal, against the production server:
npm run test:e2e
npm run resume:pdf
```

`TEST_BASE_URL` overrides the test/PDF server address. The browser suite covers all six routes at eight widths, both themes, keyboard controls, no JavaScript, reduced motion, text-spacing reflow, internal links, automated accessibility checks and print. Reports and captures are generated in `artifacts/` (gitignored).

After updating `lib/data.ts`, regenerate `public/resume.pdf` with `npm run resume:pdf` and include it with the source changes. The generator prints `/resume`, so there is no separate PDF content to maintain. Review the generated pages before publishing.

The GitHub worklog reads the committed snapshot only; `npm run sync-github` refreshes it. A stale label is intentional until a new snapshot is committed and deployed.
