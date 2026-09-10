# Portfolio UI upgrade — 5 September 2026

The supplied review is the implementation brief. Its claims are checked against the repository and live site; it does not authorise publishing or unrelated external changes.

## Confirmed baseline

- The homepage at 1440px is 4,651px tall with 12 reveal wrappers at opacity zero before scrolling. The shared Framer Motion wrapper is the cause, not empty content.
- Homepage evidence is subordinate to capabilities and an extensive contribution graph.
- Role durations are hardcoded. About includes arbitrary proficiency scores.
- Labs cards lead to the same studio URL. Canonical source contains no individual project destinations.
- The mobile header hides theme access in its menu; desktop navigation begins before its labels fit comfortably.
- GitHub snapshot and live fetching have diverged; freshness and fallback need explicit treatment.

## Implementation

1. Replace visibility-dependent reveals with server-rendered wrappers. Tighten shared spacing, bounded typography, focus states, print rules and mobile navigation.
2. Build the homepage around sourced impact, compact capability context, selected experience and two current projects.
3. Share dated career records across About, homepage and résumé. Use evidence-led skill groups and native disclosures.
4. Lead Worklog with selected owned public tools; group activity and make the contribution calendar secondary with a monthly summary. Preserve public/private boundaries and intentional saved-data fallbacks.
5. Bring the Labs project grid forward, clarify filters/counts and use honest destination states. Add accessible email copying.
6. Verify route navigation, responsive themes, reduced motion, no JavaScript, interactions, print and PDF. Add regression tests for the changed behaviour; run lint, types and production build.

Screenshots and machine-readable results are stored in artifacts/ui-review. Testing limitations and remaining content confirmations will be recorded in docs/ui-upgrade-verification.md.
