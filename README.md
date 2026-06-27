# Matt Haitana — Portfolio

A world-class personal portfolio website for Matt Haitana, a senior software engineer based in Melbourne, Australia.

## Tech stack

- **Next.js 15** with App Router
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (base-nova style)
- **Framer Motion** for subtle animations
- **Lucide Icons**
- **next-themes** for light/dark mode

## Features

- Responsive, accessible design with WCAG AA target
- Light/dark theme toggle
- Static site generation for performance
- SEO metadata, OpenGraph, Twitter cards, JSON-LD structured data
- Sitemap and robots.txt generation
- Multi-page architecture: Home, About, GitHub, Contact, Resume
- Expandable experience timeline on the About page
- Integrated GitHub Activity summary on the Home page (contribution graph + top languages)
- Dedicated GitHub dashboard with public repos, languages, and activity
- Direct contact links layout (no form) on the Contact page

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

Copy `.env.example` to `.env.local` if you want to store the token locally during development.


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
