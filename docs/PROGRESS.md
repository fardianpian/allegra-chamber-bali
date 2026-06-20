# Progress & Next Steps

> Living document — update this file at the end of each work session so the next session (or next
> person) can pick up without re-deriving context. Keep "Next Steps" in priority order.
>
> Full narrative history of past sessions lives in `docs/PROGRESS-ARCHIVE.md` — read it only when
> you need the detailed story behind a past decision or incident. Default per-session read is just
> this file.

## Status as of 2026-06-21

Site is fully live on Cloudflare Pages with real business data end-to-end: WhatsApp, Instagram,
and the Web3Forms contact form all work in production. No pricing is shown anywhere (intentional,
owner direction). Full history → `docs/PROGRESS-ARCHIVE.md`.

**2026-06-21 — Journal/article system shipped.** New `/journal` content hub (EN +
`/id/journal` structural twin) for SEO/GEO/AEO content: `articles` content collection
(`src/content/config.ts`), listing page with pillar filter (`JournalList.astro`), article detail
template with per-article FAQ block + `Article`/`FAQPage`/`BreadcrumbList` JSON-LD
(`getArticleJsonLd` in `lib/jsonld.ts`). Nav updated (Header + Footer). One seed article live:
"Wedding Pianist in Bali: What to Expect" (`src/content/articles/wedding-pianist-bali.md`),
targeting the best-opportunity keyword from `SEO-STRATEGY.md` §3.0 ("wedding pianist", KD 1).
Writing guide + 4 content pillars + skill-delegation pipeline: see
`.claude/article-seo-geo-aeo-guidelines.md` (also linked from `CLAUDE.md` § Journal / Article
Content). `npm run lint && npm run build` both clean (25 pages); verified visually via Playwright
screenshots (desktop nav fits 8 links, listing/filter/article render correctly).

## Next steps (priority order)

1. **Write more Journal articles** using `.claude/article-seo-geo-aeo-guidelines.md` — only 1 of
   the 4 pillars (Piano & Repertoire) has an article so far. Planning and For-Planners/B2B pillars
   are good next picks (ties into the outreach work in
   `docs/MARKETING-SPRINT-2026-06.md`).
2. **Get the piano video from the owner** (they have it, haven't sent it yet) and build a video
   embed component — none exists yet, only `AudioSample.astro` for `<audio>`. Decide embed
   format with the owner first (raw file vs. YouTube/Instagram/Vimeo share link) since that
   changes the component shape.
3. **Content depth**: real testimonials (with permission) are still pending — `Testimonials.astro`
   on home stays commented out of `src/pages/index.astro` + `src/pages/id/index.astro` rather than
   showing placeholder/TODO text to visitors (2026-06-19, owner direction — no visible "TODO" copy
   on any live page). Re-enable its import + render line once real, permission-cleared quotes
   land. `MusicianProfiles.astro` on `/about` is done — reworked from 4 generic "TODO — Musician
   Name" placeholder cards into a real 2-person "Managed By" section (`aboutPage.team` in
   `src/i18n/ui.ts`): Fardian (Producer & Music Industry Professional) and Yessica Yosia Virginia
   Simanjuntak (Composer & Music Director), real studio photos in `src/assets/about/`. Also still
   needed: event photography for the non-piano venue types (beach/chapel/ballroom — only
   cliffside/garden have real photos so far). All owner-supplied,
   don't invent.
4. **Legal review before launch**: the Privacy Policy (`/privacy`) no longer shows a public
   "have this reviewed by a lawyer" TODO note (2026-06-19, same visible-TODO cleanup) — but the
   underlying task is still real and unresolved. Have the policy reviewed by a qualified lawyer;
   it's currently a good-faith draft, not legal advice. Also update its "Third-Party Services"
   section once analytics (e.g. Plausible or GA4 — see `.env.example`) is actually enabled.
5. Re-run the full Lighthouse mobile audit once the above real photography/content lands — it's
   clean at 100/100/100/100 today, but real images (vs. the lightweight CSS-gradient
   `Placeholder` component) are the one thing that could move Performance/CLS, so verify it holds.
6. Housekeeping, no urgency:
   - ~~Remove the now-unused `FTP_*` GitHub Secrets~~ — done 2026-06-19 (`gh secret delete` for
     `FTP_PASSWORD`/`FTP_SERVER`/`FTP_SERVER_DIR`/`FTP_USERNAME`, confirmed `gh secret list` empty).
   - Still open: delete the orphaned manual-deploy leftovers on the old Hostinger document root
     (`domains/indonesiaistimewastudio.id/public_html/allegra/` — `test.html` and any stray files
     from the one-time zip upload; DNS no longer points there so nothing serves them, but they're
     still taking up space). Owner chose to skip this for now (2026-06-19) rather than hand over a
     Hostinger API token — do via hPanel File Manager manually whenever convenient, low priority.

## SEO

- **`docs/SEO-STRATEGY.md`** — data-driven keyword strategy (DataForSEO + Firecrawl, retrieved
  2026-06-18). Key takeaway: head term should be "musician for wedding ceremony" cluster, not
  "string quartet"; ID-language pages should not be expected to drive organic traffic (near-zero
  measured demand); no competitor has a fully structured website in this niche — the gap is in
  Allegra's own page titles/meta, not site architecture. §3.0 (added same day, after the piano
  flagship decision): "wedding pianist" is the best KD opportunity in the whole document (KD 1,
  US vol 720) — real secondary keyword for the Packages Solo block; "Piano +" combo phrases have
  zero measured demand everywhere tested, so they stay upsell copy only.

## Reference links

- Notion brief (source of truth, copied into `docs/BRIEF.md`):
  https://app.notion.com/p/21e60412d3c64122b6ad57f7cd5549cc
- Design reference (structure/layout pattern, not literal content):
  https://floral-manga-rapid.figma.site
