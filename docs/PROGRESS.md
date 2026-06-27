# Progress & Next Steps

> Living document — update this file at the end of each work session so the next session (or next
> person) can pick up without re-deriving context. Keep "Next Steps" in priority order.
>
> Full narrative history of past sessions lives in `docs/PROGRESS-ARCHIVE.md` — read it only when
> you need the detailed story behind a past decision or incident. Default per-session read is just
> this file.

## Status as of 2026-06-28

Site is fully live on Cloudflare Pages with real business data end-to-end: WhatsApp, Instagram,
and the Web3Forms contact form all work in production. No pricing is shown anywhere (intentional,
owner direction). Full history → `docs/PROGRESS-ARCHIVE.md`.

**2026-06-28 (session 2) — Copy audit + ID translation sync.** Seven Sweeps copy-editing audit
applied to all EN copy updated earlier in the day; 6 additional fixes:

- `hero.subhead`: "chamber strings" → "strings" (konsisten dengan meta desc, lebih hangat)
- `formations.subhead`: hapus "for hire" (transaksional, tidak perlu di luar page title/SEO)
- `forPlannersPage.valueProps[0].blurb`: "booked once" → "once booked" (clarity)
- `galleryPage.subhead`: reframe dari brand claim → benefit couple ("browse by venue type to find your setting")
- `aboutPage.description` + `aboutPage.subhead`: tambah piano sebagai flagship instrument (aturan brand voice Rule 13 — piano harus disebut di About)

Setelah audit, 11 field ID yang belum tersinkron (8 dari sesi pagi + 6 dari audit ini) dimitranslasi:
formation taglines (duo/trio/quartet), `formations.subhead`, `formations.cta`, booking step 01 title,
`galleryPage.subhead`, `aboutPage.description/subhead`, `meta.description`, `valuePropsHeading`,
`valueProps[0].blurb`. Build 37 halaman clean; push ke main (commit `0b3b154`).

**2026-06-28 (session 1) — Marketing foundation sprint: 7 new docs/ files generated via parallel agent runs.**
Full marketing execution layer now exists in `docs/`:

- **`docs/SOCIAL-CONTENT-CALENDAR.md`** — Instagram content calendar 29 Jun–12 Jul 2026 (11 posts,
  14 days), 10 captions ready to post, hashtag sets, execution notes. Piano flagship Reels
  prioritized for 29 Jun & 3 Jul using existing video asset.
- **`docs/B2B-OUTREACH-PLAN.md`** (updated) — Wave 2 added: 6 personalized cold-email/DM drafts
  for named prospects (The Seven Agency, Poetyque Events, Luxury Weddings Indonesia, Alila Villas
  Uluwatu, Bali Wedding Solutions, Plan A) + 7-day follow-up template + reply-to-positive-response
  template. All brand voice rules observed; no prices, logistics-first CTAs.
- **`docs/DIRECTORY-SUBMISSIONS-PLAN.md`** — 26 directories across 6 tiers (A=Wedding Platforms,
  B=Local/Indonesia, C=Music Vendor, D=Review Platforms on hold, E=GEO/AI Citation, F=Music
  Profiles). SaaS-default directory list fully replaced with wedding-service equivalents. Positioning
  copy in 5 variants ready to paste. Tracker CSV included.
- **`docs/PR-PLAN.md`** — 15 media targets across 4 tiers (Tier A=Junebug/The Lane/GWS, needs
  styled shoot; Tier C=Jakarta Post/NOW! Bali/Bali Advertiser, pitchable now). 2 pitch drafts
  (Angle 1: human/emotion story; Angle 2: cliffside logistics). Styled shoot strategy to unlock
  Tier A. 3-month PR calendar Jul–Sep 2026. `/press` page flagged as prerequisite to build.
- **`docs/COMMUNITY-MARKETING-PLAN.md`** — 15 target communities (Tier 1: wedding planner FB groups;
  Tier 2: r/weddingplanning, r/Bali, destination wedding FB groups; Tier 3: Bali expat/vendor
  networks). 5 ready-to-use engagement templates. 30-day calendar: Week 1 = observe only, no
  posting; value-first rule enforced throughout.
- **`docs/CUSTOMER-RESEARCH.md`** (updated 2026-06-28 with real digital research) — Mode 2
  digital watering hole: Reddit r/weddingplanning + r/BigBudgetBrides, WeddingWire string quartet
  reviews, TikTok/Instagram wedding musician pages. 6 verified themes with verbatim quotes:
  (1) "Worth every penny" — price anxiety resolves post-ceremony; (2) "Guests can't stop talking
  about it" — social validation is the real JTBD; (3) Custom arrangement IS the product;
  (4) Ceremony/cocktail ≠ reception (separate buying decisions); (5) Planners value reliability
  over romance; (6) "Timeless" is the aesthetic buying reason. 2 full JTBD personas (couple +
  planner), VOC quote bank, 7-gap research backlog pending first real testimonials.
- **`docs/COMPETITOR-PROFILES.md`** (completed 2026-06-28) — 3 deep profiles from fresh
  Firecrawl scrapes: Silaen Music (co-existence, different product, 9 reviews benchmark),
  Bali Entertainment Agency (Allegra already outranks their pianist page at position 6.7),
  DIVO Music (88 reviews benchmark, Jakarta fly-in). 3 attack angles, comparison table,
  8 open keyword gaps, quarterly monitoring checklist.

**GSC audit finding (2026-06-28):** `live-music-bali-wedding-guide` (highest-value article, KD 4
vol 3600) has zero impressions — not yet indexed. Needs manual Request Indexing in GSC UI.
`wedding-pianist-bali` already at position 6.7 with 12% CTR (above average for a 1-week-old
article). GA4 token expired (`invalid_grant`) — re-auth needed before next analytics session.

**2026-06-23 — Genuine Indonesian translations added for all 5 Journal articles (owner
request), reversing the EN-only/noindex default.** Each article now has a real translation at
`src/content/articles/id/<slug>.md` (full frontmatter + body, internal links repointed to
`/id/...`), built following `.claude/brand-voice-guidelines.md` ID vocabulary.
`src/pages/id/journal/[slug].astro` renders the translation and drops `noindex` when one exists,
falling back to the EN body (still `noindex`) only for a future article that hasn't been
translated yet. `JournalList.astro` now shows the translated heading/excerpt on the `/id/journal`
listing. `astro.config.mjs`'s sitemap filter reads the `id/` translation folder directly
(`fs.readdirSync`) instead of blanket-excluding `/id/journal`, so only un-translated slugs stay
out of the sitemap. Per `docs/SEO-STRATEGY.md`, ID search demand for this category is still
near-zero — the translation's value is hreflang/UX completeness and trust for Indonesian-speaking
couples/families, not new ID-locale search traffic. `npm run lint && npm run build` clean;
verified via built HTML that `noindex` is gone, hreflang pairs are correct, and internal `/id/...`
links resolve. Updated `CLAUDE.md`, `.claude/article-seo-geo-aeo-guidelines.md`, and
`src/content/config.ts` comments to describe the new `id/<slug>.md` convention — write it for
every new article going forward, as part of publishing, not as a later task.

**2026-06-22 — Hidden post-wedding testimonial form shipped (`/share-your-story`); Web3Forms
delivery email switched to Gmail.** Two changes, confirmed working in production:

- **New testimonial-request form**: `/share-your-story` (+ `/id/share-your-story`), built to be
  sent directly to clients after their wedding (not in nav/footer, `noindex`, excluded from
  `sitemap.xml` — see `astro.config.mjs` filter). New component
  `src/components/sections/TestimonialForm.astro` (same Web3Forms pattern as `ContactForm.astro`)
  collects couple name, wedding date, venue, formation, the testimonial text, and a **required**
  public-display consent checkbox — the consent step is what unblocks Next-steps item #4 below
  (real testimonials were blocked on owner permission; this form captures that permission
  per-submission instead of needing a separate follow-up). Dedicated thank-you page
  (`/thank-you-testimonial` + `/id/` twin) rather than reusing the generic `/thank-you` inquiry
  copy. New i18n namespaces `testimonialFormPage` / `testimonialThankYou` in `src/i18n/ui.ts`
  (EN+ID). Submissions still land as plain email only — the owner still hand-creates the `.md`
  file in `src/content/testimonials/` after reviewing, same as before.
- **Web3Forms delivery email changed from `allegra@indonesiaistimewastudio.id` to
  `allegrachamberbali@gmail.com`**: checked DNS (MX/SPF correctly point at Hostinger mail) but
  found zero evidence the `allegra@` mailbox itself was ever created/active (no Web3Forms mail
  ever reached it). Owner created a fresh Web3Forms access key against the Gmail address instead
  and confirmed receipt by testing the live `/contact` form — that's the address both `/contact`
  and `/share-your-story` now deliver to. Updated `PUBLIC_WEB3FORMS_KEY` + `PUBLIC_CONTACT_EMAIL`
  in `.env`, the `.env.example` template, and the `site.ts` fallback default; owner separately
  updated the same two vars in the Cloudflare Pages dashboard and redeployed.
- `npm run lint && npm run build` clean; verified visually via Playwright screenshots (desktop +
  375px mobile, EN + ID) — consent-checkbox long label wraps cleanly on both locales.

**2026-06-25 — Competitor-gap action plan items 1-2 executed; all 4 Journal pillars now have an
article.** Closes out the `docs/MARKETING-SPRINT-2026-06.md` competitor-gap plan from 2026-06-21:

- **On-page targeting fix**: cross-checked the plan's literal "wedding pianist Bali" / "wedding
  string quartet Bali" targets against `docs/SEO-STRATEGY.md` and found those exact geo-suffixed
  phrases return zero search data — the validated opportunities are `wedding pianist` (KD 1) and
  the `string quartet` cluster, with "Bali" carried by the brand name itself. Updated Home title
  (dropped redundant "in Bali", now 57 char) and `/packages` title + H1 (now explicitly include
  "Wedding Pianist", was missing entirely — 64 char). Added a keyword-rich tagline inside the Home
  `<h1>` (previously brand-name-only) without touching the Approved Copy hero subhead.
- **Journal markdown audit**: benchmarked `/journal` rendering against an external markdown-styling
  reference. Found a real bug — the two tables already live in
  `live-music-bali-wedding-guide.md` had zero CSS (unreadable on mobile) — fixed table/th/td
  styling plus `hr`/`h4` (neither had any style), reusing only existing Allegra tokens.
- **2 new Journal articles**, filling the last 2 empty pillars (`for-planners`, `bali-venues`),
  full skill-delegation pipeline (content-strategy → copywriting → ai-seo → seo-audit → schema →
  copy-editing) for both:
  - `live-music-vendor-questions.md` (`for-planners`) — "What to Ask a Live Music Vendor Before
    You Book Them," a planner-vetting checklist built from confirmed `/for-planners` facts (tech
    rider on request, 24h response, outdoor logistics). Net-new keyword bet, not in
    `SEO-STRATEGY.md`. Inbound link added from `/for-planners` (`PlannerDownloads.astro`).
  - `cliffside-wedding-uluwatu.md` (`bali-venues`) — "Cliffside Wedding Live Music in Uluwatu,"
    built around the 3 real confirmed cliffside venue credits already in the trust strip (Alila
    Villas Uluwatu, Bvlgari Resort Bali, Stone Villas Uluwatu) — a genuine differentiator per
    `competitor-profiles/_summary.md` (4 of 5 competitors have zero reviews/credits). New OG image
    (`public/images/og-cliffside-uluwatu.jpg`, copied from the existing real hero photo, not
    generated). Inbound link added from `live-music-bali-wedding-guide.md`'s outdoor-logistics
    section.
  - ai-seo pass caught a vague unconfirmed claim ("Most couples time...") in 2 spots and a missing
    forward-CTA in the hook — both fixed before publish.
- `npm run lint && npm run build` clean (31 pages, 4 Journal articles × EN + `/id/` twin).

**2026-06-23 — Second Journal article shipped (`planning` pillar).** "How to Plan Live Music for
a Bali Wedding" (`src/content/articles/live-music-bali-wedding-guide.md`), targeting "musician for
wedding ceremony" (US vol 3600, KD 4 — Pillar 1 anchor from `SEO-STRATEGY.md` §3.1). Ran the full
skill-delegation pipeline end to end (content-strategy → copywriting → ai-seo → seo-audit → schema
→ copy-editing) plus fresh DataForSEO SERP/competitor research specifically for this article (not
just reused the 2026-06-18 SEO-STRATEGY.md research): confirmed no competitor (Silaen Music, LOVA
Band Bali, Bali Wedding Solutions, FixTheMusic, La Puja) publishes planning-guide content, only
vendor listing pages — real content gap. ai-seo pass caught and fixed two near-miss fabricated
claims before publish (an invented "June–September/December peak season" specific, and an
unverified "most requested" popularity claim) — neither sourced anywhere in the repo, both
softened to match only what's actually confirmed. Added inbound link from the first article
(`wedding-pianist-bali.md`) per the cross-link requirement. `npm run lint && npm run build` clean
(27 pages). Pushed to `main` → Cloudflare Pages auto-deploy triggered.

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

1. **`docs/PRICING-STRATEGY.md` added (2026-06-23), revised same day to anchor to Bali market
   data instead of Singapore/HK/US** — competitor research now includes real Bridestory
   marketplace pricing (SugarCoustic Trio/Quartet store SKUs, IDR — stale 2020 listing but real
   local evidence) cross-checked against the Luxima Bali wedding-budget guide; the price matrix
   is now IDR-denominated and anchored to that Bali evidence (Solo Full Package ≈ the documented
   USD 500 Bali floor; Quartet ≈ 2.5–3x the local generic-band floor, not a Singapore-level
   price). Status: **draft, internal B2B-quoting use only, not owner-approved, not for the live
   site**. Still needs: owner's real musician day-rate, travel-fee-per-zone (still TBC per
   `CLAUDE.md`), and a sign-off decision on whether/when to ever lift the site-wide pricing hide.
   **`docs/Allegra-Chamber-Bali-Pricing.html` added same day, revised same day to IDR** —
   standalone, on-brand client/WO/EO-facing pricing sheet built from that same matrix (single
   self-contained HTML file, Google Fonts CDN, brand color/type tokens from `global.css`, reuses
   approved `src/content/packages/*.md` formation copy; tagline corrected to "Live piano & string
   ensemble for weddings in Bali" to match the approved vocabulary order in
   `.claude/brand-voice-guidelines.md`). Lives in `docs/` (outside `src/`, never built into
   `dist/`) so it stays off the live site by construction — send it manually via WhatsApp/email
   on request, same pattern already planned for the `/for-planners` downloads. English only for
   now; ask the owner before treating the embedded prices as final-enough to send to a real
   client.
2. **Competitor-gap action plan items 1-2 are done** (2026-06-25, see above) — all 4 Journal
   pillars now have an article, and `/packages` + Home target the validated "wedding pianist" /
   "string quartet" keywords. Remaining items from the plan: item 3 (real testimonials, blocked on
   owner permission — see #4 below) and item 4 (paid ads, explicitly out of scope per
   `docs/MARKETING-SPRINT-2026-06.md` until the owner decides on a budget).
3. **Resume the B2B/organic sprint calendar** in `docs/MARKETING-SPRINT-2026-06.md` (Day 1 of 9 as
   of 2026-06-22). All execution assets now exist — owner action required:
   - **Google Business Profile setup** (highest leverage, 30 min — brief at `docs/GOOGLE-BUSINESS-PROFILE-BRIEF.md`)
   - **Directory submissions** — start with Bridestory + LinkedIn Company Page + Crunchbase (see `docs/DIRECTORY-SUBMISSIONS-PLAN.md`, Week 1 batch)
   - **B2B outreach Wave 2** — 6 draft emails/DMs ready in `docs/B2B-OUTREACH-PLAN.md`
   - **Community engagement** — join 5 planner FB groups this week, observe only (see `docs/COMMUNITY-MARKETING-PLAN.md`)
   - **PR: pitch Angle 2** to The Jakarta Post + NOW! Bali (Tier C, no styled shoot needed — see `docs/PR-PLAN.md`)
   - **Request Indexing** in GSC UI for `live-music-bali-wedding-guide` (zero impressions, critical)
   - **Build `/press` page** before any PR pitch (2–3h dev, prerequisite for all media outreach)
4. **Get the piano video from the owner** (they have it, haven't sent it yet) and build a video
   embed component — none exists yet, only `AudioSample.astro` for `<audio>`. Decide embed
   format with the owner first (raw file vs. YouTube/Instagram/Vimeo share link) since that
   changes the component shape.
5. **Content depth**: real testimonials are still pending, but the permission blocker is now
   solved — `/share-your-story` (2026-06-22, see above) collects consent per-submission, so this
   just needs the owner to send the link to past clients and wait for replies. `Testimonials.astro`
   on home stays commented out of `src/pages/index.astro` + `src/pages/id/index.astro` rather than
   showing placeholder/TODO text to visitors (2026-06-19, owner direction — no visible "TODO" copy
   on any live page). Re-enable its import + render line once 3+ real, consented quotes land in
   `src/content/testimonials/`. `MusicianProfiles.astro` on `/about` is done — reworked from 4 generic "TODO — Musician
   Name" placeholder cards into a real 2-person "Managed By" section (`aboutPage.team` in
   `src/i18n/ui.ts`): Fardian (Producer & Music Industry Professional) and Yessica Yosia Virginia
   Simanjuntak (Composer & Music Director), real studio photos in `src/assets/about/`. Also still
   needed: event photography for the non-piano venue types (beach/chapel/ballroom — only
   cliffside/garden have real photos so far). All owner-supplied,
   don't invent.
6. **Legal review before launch**: the Privacy Policy (`/privacy`) no longer shows a public
   "have this reviewed by a lawyer" TODO note (2026-06-19, same visible-TODO cleanup) — but the
   underlying task is still real and unresolved. Have the policy reviewed by a qualified lawyer;
   it's currently a good-faith draft, not legal advice. Also update its "Third-Party Services"
   section once analytics (e.g. Plausible or GA4 — see `.env.example`) is actually enabled.
7. Re-run the full Lighthouse mobile audit once the above real photography/content lands — it's
   clean at 100/100/100/100 today, but real images (vs. the lightweight CSS-gradient
   `Placeholder` component) are the one thing that could move Performance/CLS, so verify it holds.
8. Housekeeping, no urgency:
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
