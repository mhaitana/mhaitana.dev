# Deployment Guide

## Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Keep the default framework preset (`Next.js`).
4. Add environment variables if needed (see below).
5. Deploy.

Vercel will automatically build and deploy each push to the default branch.

## Environment variables

### GitHub Personal Access Token (optional)

To include private contributions in the language breakdown and contribution graph, set `GITHUB_TOKEN` in your build environment.

```bash
# Build locally with private contributions
GITHUB_TOKEN=ghp_xxx node scripts/fetch-github.mjs
npm run build
```

Token requirements:
- Create a classic token at https://github.com/settings/tokens
- Scope: `repo` (to read your own private repos) and `read:user`
- Scope `read:org` is not required unless you want org-owned repos you created
- Do **not** commit the token. Add it to your hosting provider's environment variables, not the repo.

### Why a token is optional

Without a token the dashboard still works perfectly. It shows:
- Public repositories
- Public events
- Language stats from public repos only
- No contribution graph

With a token it additionally shows:
- Language stats across all your repos (public + private)
- A full contribution graph for the last year (public + private, if enabled in your GitHub profile)

Private repository names are never written to `lib/github-data.json` or shown on the site.

## Refreshing GitHub data

```bash
# Public only
node scripts/fetch-github.mjs

# Include private contributions
GITHUB_TOKEN=ghp_xxx node scripts/fetch-github.mjs
```

Then commit the updated `lib/github-data.json` and deploy.

## Custom domain

Update `metadataBase` in `app/layout.tsx` and the hardcoded `https://mhaitana.dev` references in:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `components/structured-data.tsx`

## Pre-deployment checklist

- [ ] Replace placeholder testimonials with real quotes.
- [ ] Add a real professional photo in `app/about/page.tsx`.
- [ ] Add real project screenshots.
- [ ] Wire up the contact form to a backend or service.
- [ ] Upload or generate a downloadable `public/resume.pdf`.
- [ ] Run `node scripts/fetch-github.mjs` to refresh GitHub data.
- [ ] Verify Lighthouse scores.
- [ ] Verify heading hierarchy and semantic HTML.
- [ ] Add Google site verification token if using Search Console.

## Static export (optional)

To export a fully static site, add the following to `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

Then run `npm run build`. The static files will be in the `dist` directory.

> Note: `output: "export"` disables API routes and some dynamic features. The current contact form is client-side only and works with static export.
