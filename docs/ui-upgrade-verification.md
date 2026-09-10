# Portfolio UI upgrade — verification

5 September 2026. Changes are local and have not been published.

## Changes and evidence

- Removed scroll-dependent visibility. All core sections render in their final state on the server, including without JavaScript.
- Rebuilt the homepage around three sourced Domain case summaries, a compact capability strip, selected career history, and two current studio projects. No new career metrics were invented.
- Tightened page spacing and fluid typography, softened the grid, retained blue accents and square geometry, and kept the footer dark in both themes.
- Added a native mobile navigation disclosure before desktop labels become cramped. Contact and theme controls remain visible; theme selection cycles through system, light and dark.
- Shared career dates, profile, skill groups and impact records in `lib/data.ts`. About uses native disclosures and evidence-oriented skill groups. Durations use inclusive calendar months to match the existing completed-role convention and update on daily revalidation.
- Worklog prioritises curated original public tools, groups activity and replaces hundreds of graph focus stops with an optional monthly table and a mobile monthly summary. The committed snapshot is validated and read without runtime GitHub requests; private records and contradictory activity are excluded.
- Labs starts with the project pipeline, announces filter results and preserves all project content without JavaScript. Individual project URLs do not exist in the canonical source, so cards use truthful case-study placeholders.
- Contact leads with email and copy controls, supports clipboard denial/unavailability and announces success or a selectable manual fallback.
- Regenerated the two-page, tagged PDF from `/resume`, using the same structured content as the website. Print removes navigation, footer, controls and decorative grid; light print colour-scheme overrides dark page backgrounds.

## Verification commands

- `npm run lint` — passed; generated reports are excluded, application rules are unchanged.
- `npm run type-check` — passed.
- `npm test` — 27 tests passed. Includes career dates/content references, Labs counts/empty stages, clipboard fallback/focus/feedback, GitHub transformations/freshness/missing/corrupt/empty/private-data cases.
- `npm run build` — passed; all six routes prerender successfully. The build trace includes `lib/github-data.json`.
- `npm run start -- --hostname 127.0.0.1 --port 3100` — production preview.
- `npm run test:e2e` — 36 tests passed in 2.5 minutes against the final production build. No Axe violations, opacity-hidden core content, horizontal page overflow or JavaScript page errors in the checked states.
- `npm run resume:pdf` — generated `public/resume.pdf`; two A4 pages, tagged PDF, all six roles, 14 achievement bullets, three skill groups and clickable contact URLs present. Both pages visually inspected; no clipping, blank pages or split role headings.
- `git diff --check` — passed.

The browser suite exercises all six routes at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 CSS pixels in light and dark themes; desktop and mobile-with-menu-open Axe scans; keyboard/skip/anchor/back/forward navigation; system preference and persisted themes; copy success/error paths; filters and expanders; no JavaScript; reduced motion and text spacing; forced colours; internal link/anchor resolution; PDF content type and print surfaces. Screenshots are captured at five representative widths in both themes. One worker avoids contention with other work on this computer; visual checks have a larger timeout because each includes eight viewports and two accessibility scans. Assertions remain unchanged.

## Screenshots

The interactive comparison at `artifacts/ui-review/comparison.html` contains 24 matched combinations: six routes × mobile/desktop × light/dark. Baselines were captured from the live site; after captures use the local production build. Additional tablet/laptop/wide captures and browser traces are under `artifacts/ui-review` and `artifacts/playwright-report`.

At the nominal 1440px desktop viewport, the homepage shrank from about 4,650px to 3,525px while bringing production evidence ahead of capabilities. Worklog shrank from about 4,784px to 2,938px. These are layout observations, not performance measurements.

## Performance

Baseline and after measurements use Lighthouse mobile defaults with headless Chrome on the same computer. The baseline is the deployed HTTPS site; after measurements are the local production build, so network conditions differ. Scores are lab measurements, not field Core Web Vitals or a 75th-percentile claim.

| Route | Build | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | ---: | ---: | ---: | ---: | --- | ---: | --- |
| Home | Before | 98 | 89 | 100 | 100 | 2.3s | 0 | 70ms |
| Home | After | 96 | 100 | 96 | 100 | 2.6s | 0 | 100ms |
| Worklog | Before | 90 | 90 | 100 | 100 | 3.0s | 0 | 200ms |
| Worklog | After | 98 | 100 | 96 | 100 | 2.5s | 0 | 40ms |

All measured after-build categories meet the 95-point target. Homepage lab LCP remains 0.1s above the 2.5s target in this single run; no field INP or percentile claims are made. The local best-practices deduction comes from the existing Vercel Analytics script returning 404 on a plain Next.js localhost server (`/_vercel/insights/script.js`); that endpoint is supplied by Vercel in deployment. Raw JSON and `performance-summary.json` are retained with the captures.

Commands:

```sh
npx lighthouse https://mhaitana.dev --quiet --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=artifacts/ui-review/lighthouse-before-home.json
npx lighthouse https://mhaitana.dev/github --quiet --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=artifacts/ui-review/lighthouse-before-github.json
npx lighthouse http://127.0.0.1:3100 --quiet --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=artifacts/ui-review/lighthouse-after-home.json
npx lighthouse http://127.0.0.1:3100/github --quiet --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=artifacts/ui-review/lighthouse-after-github.json
```

## Content confirmations and limitations

- Existing CoStar employment, reserve service, availability and Labs stages are retained from the repository. They have not been independently confirmed with Matt. Duration labels count both source calendar months; they do not claim day-level precision.
- Labs provides no verified individual product, waitlist or repository URLs. Add real destinations to `lib/labs.ts` when available. No fabricated screenshots or product links were added; the other studio repository was read only.
- GitHub data is the existing snapshot saved on 11 July 2026. It is explicitly labelled stale; `npm run sync-github` refreshes it for a future deployment. Tests verify failure-safe snapshot rendering rather than runtime API loading states, because pages no longer make runtime API requests.
- Automated Axe and browser keyboard tests are not proof of complete WCAG conformance. The live baseline was also inspected through the browser accessibility tree; a spoken VoiceOver/NVDA session and Safari/Firefox testing remain follow-up work.
- Reflow is tested down to 320px, plus text-spacing overrides. Native browser UI zoom at 200%/400% was not separately operated.
- Internal links and anchors are checked automatically. New external destinations were not invented; external ownership/product availability can change and was not exhaustively live-tested.
- Before/after screenshots were inspected; no fixed pixel-diff baselines are committed because this changes the layout. Generated reports and captures are intentionally gitignored.
- Production deployment and field performance measurement remain outside this local implementation.
