# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is the parent workspace's `mhaitana.dev` project — Matt Haitana's personal portfolio site. The parent `/Users/techtana/Projects/CLAUDE.md` describes the multi-project workspace; this file is project-specific.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `app/globals.css`, PostCSS plugin in `postcss.config.mjs` — no `tailwind.config.ts`)
- shadcn/ui (`components.json`; only `components/ui/button.tsx` is generated so far), `class-variance-authority` + `tailwind-merge` via `lib/utils.ts`'s `cn`
- Framer Motion for animations, `lucide-react` for icons, `next-themes` for light/dark
- Package manager: **npm** (`package-lock.json`)

## Commands

```bash
npm run dev           # next dev
npm run build         # next build
npm run lint          # eslint (flat config, no args — lints whole project)
npm run sync-github   # node scripts/fetch-github.mjs — regenerates lib/github-data.json
```

There is no test runner and no `type-check` script. Type-check via `npx tsc --noEmit` if needed.

## GitHub data flow (important)

The GitHub dashboard is **not** fetched at request time. `scripts/fetch-github.mjs` pulls data from the GitHub REST + GraphQL APIs and writes a **committed** `lib/github-data.json`. The site reads that file at build/request time through `lib/github.ts`, which wraps reads in `next/cache`'s `unstable_cache` and bucket repo languages into categories (`CATEGORY_MAPPINGS`).

- Without `GITHUB_TOKEN`: public repos/events/languages only, no contribution graph.
- With `GITHUB_TOKEN` (scopes `repo`, `read:user`): private contributions included in language aggregates and the contribution calendar. **Private repo names are never written to the JSON or shown on the site** — preserve this when editing the script.
- `GITHUB_USERNAME` (default `mhaitana`) overrides the target account.
- The script loads `.env` via `process.loadEnvFile`; copy `.env.example` → `.env` for local tokens (`.env` is gitignored, `.env.example` is committed).

When editing GitHub logic, keep `lib/github-types.ts` as the single source of truth for shapes — `lib/github.ts` re-exports from it.

## Content sources (where to edit what)

Most page content is data-driven, not hardcoded in JSX:

- **Experience / skills** → `lib/data.ts` (`experiences`, `skillCategories`). Consumed by `/about` and `/resume`.
- **Labs pipeline** → `lib/labs.ts`. The header comment notes this file **mirrors a canonical source at `~/Projects/haitechlabs/src/data/projects.ts`** — keep them in sync when changing labs content.
- **GitHub dashboard** → `lib/github-data.json` (generated, see above) + `lib/github.ts` / `lib/github-types.ts`.
- **Contact links** → hardcoded array in `app/contact/page.tsx`.
- **SEO metadata / OpenGraph / JSON-LD** → `app/layout.tsx` (root metadata + theme), `components/structured-data.tsx`, per-page `export const metadata`.

## Architecture notes

- **Layout & theming**: `app/layout.tsx` mounts `Providers` (`next-themes`, `attribute="class"`, system default), `Navbar`, `Footer`, `SkipNav`, and Vercel `Analytics`. Fonts (`Archivo`, `Space_Grotesk`) come from `next/font/google` and are exposed as CSS variables. `suppressHydrationWarning` is intentional on `<html>`/`<body>` because `next-themes` toggles the class before hydration.
- **Routing**: App Router pages under `app/<route>/page.tsx`. Existing routes: `/`, `/about`, `/github`, `/contact`, `/resume`, `/labs`. `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts` are generated.
- **Path alias**: `@/*` → project root (so `@/components/...`, `@/lib/...`).
- **Images**: `next.config.ts` allows `next/image` remote patterns only for `avatars.githubusercontent.com`. Add other hosts there if needed.
- **Print styles**: `/resume` uses a `no-print` class and `PrintButton` for print-to-PDF — preserve those classes when editing the resume page.
- **Labs gating**: `LabProject.requestDetails` gates deeper info behind the contact form; pitches are intentionally one-line (see comment block at top of `lib/labs.ts`).

## Hardcoded domain

`https://mhaitana.dev` is referenced directly in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`, `app/robots.ts`, and `components/structured-data.tsx`. If deploying under a different domain, update all four (`Deployment.md` calls this out).

## Deployment

Vercel is the target (see `Deployment.md`). The site is effectively static — `output: "export"` works if a fully static build is needed, but is **not** currently set in `next.config.ts`.