# Project: allegra.indonesiaistimewastudio.id

> Persistent context for Claude Code. Read this first. `docs/BRIEF.md` has the full original
> spec (sitemap detail, acceptance criteria, asset checklist) — read it only on-demand, see
> § Session Workflow (Token Discipline) below.

## Brand

Allegra Chamber Bali — live chamber/ piano & string ensemble for weddings in Bali.
Sub-brand of Indonesia Istimewa Studio. Audience: couples (mostly international
destination weddings), wedding planners, venues, event organizers.
Languages: **English (primary) + Indonesian (secondary)**.

## Brand Voice

- Tone/vocabulary/approved-copy source of truth: `.claude/brand-voice-guidelines.md`
  (generated 2026-06-19 from Notion). **Read it before writing any user-facing copy**
  (hero, About, packages, FAQ, social captions).
- Authority split: this CLAUDE.md wins for technical/visual facts (hex codes, hosting,
  stack); the guidelines file wins for tone/vocabulary/approved copy. The Notion brand-voice
  database is the upstream source but has known-stale fields (old Taupe hex, old
  Hostinger-FTP hosting) — don't pull those two facts from Notion, use this file instead.
- Piano is a flagship instrument across all formations, not an add-on — see "Signature
  Sound" rule in the guidelines file before describing any formation as "just a string
  quartet."

## Marketing Context

- `.agents/product-marketing.md` is the shared context file all 45 installed marketing skills
  (`.claude/skills/`) read before doing any work — update it instead of re-explaining project
  context inside individual skill conversations.
- Authority split: this CLAUDE.md + `.claude/brand-voice-guidelines.md` remain the source of
  truth; `.agents/product-marketing.md` is a derived summary for the skills pack — when either
  authoritative file changes, update `.agents/product-marketing.md` to match.
- Several installed skills assume a SaaS product with accounts/subscriptions and are
  low-priority for this one-time-booking business (`paywalls`, `onboarding`, `signup`,
  `churn-prevention`, `revops`, `aso`) — see the Applicability Notes callout in
  `.agents/product-marketing.md`.
- No ESP/CRM exists yet — WhatsApp is the only live comms channel, so output from `emails`/`sms`
  skills is draft-only until an ESP/CRM is chosen.

## Confirmed decisions (locked)

- Sub-domain (final): `allegra.indonesiaistimewastudio.id`
- Hosting (revised 2026-06-18): **Cloudflare Pages**, git-connected to `fardianpian/allegra-chamber-bali`
  (push to `main` → auto build & deploy). Domain registration, DNS zone, and email
  (`allegra@indonesiaistimewastudio.id`) stay on **Hostinger** — only the `allegra` subdomain's
  DNS record was changed to a CNAME pointing at `allegra-chamber-bali.pages.dev`. Switched away
  from the original Hostinger-FTP plan because it had no working CI deploy path (Hostinger
  blocked GitHub Actions' runner IPs on every available FTP/FTPS/SFTP port) — full incident
  history in `docs/PROGRESS-ARCHIVE.md`. Still **static-only (Astro SSG)**. No Node SSR, no serverless.
- Languages: English default + Indonesian (`/id/`) with hreflang.
- Formations offered (5): Solo (Violin/Cello/Piano), Duo, Trio, String Quartet, Large Ensemble.
  Piano is a flagship offering — solo piano is a Solo option, and (revised 2026-07-09, supersedes
  the original "Piano +" upsell model) piano is now **included as standard, not a paid add-on**,
  in Duo (violin + cello + piano, 3 musicians), Trio (+ viola, 4 musicians), and String Quartet
  (+ 2nd violin, 5 musicians) — Large Ensemble already included piano by default. `/packages` copy
  should describe piano as bundled into these formations, not as a separate "Piano +" upsell line.
  See `docs/PRICING-STRATEGY.md` §7 for the pricing derivation behind this change.
- Large Ensemble composition (revised 2026-07-09, supersedes the 2026-06-18 6-musician version):
  **4 violins, 2 violas, 2 cellos, double bass, and piano — 10 musicians by default.** Piano must
  stay in the default/first-presented lineup; the exact instrumentation is customisable per client
  on request, and additional musicians beyond the default 10 are available at a per-musician rate
  (see the client-facing pricing sheet, `docs/Allegra-Chamber-Bali-Pricing.html`).
- Pricing is intentionally **not displayed** anywhere on the live site (owner direction,
  2026-06-18) until real figures exist — no price field, column, or "TODO" placeholder text.
  `packages/*.md` has no `priceFrom`; don't reintroduce one without the owner's real numbers.
- Implementation: fully by Claude Code; the owner supplies assets & accounts.

## Aesthetic

- Romantic luxury, editorial, warm, refined. Light & airy. NOT dark, NOT loud, NOT boho.
- Palette: Warm Ivory #F7F3EC bg, Charcoal #1E1C19 ink, Champagne Gold #C2A36B accent,
  Deep Sage #3E5247 depth, Warm Taupe #6D665C muted (darkened from the logo-sampled #9C9183 —
  that value only had a 2.79:1 contrast ratio on Ivory, failing WCAG AA's 4.5:1 for the eyebrow
  labels/subheads/captions it's used for; #6D665C keeps the same warm gray-brown hue at 5.12:1).
- Type: Cormorant Garamond / Playfair (serif headings) + Inter (body) + serif italic (quotes).
  Self-host via @fontsource.
- Motion: subtle fade-in on scroll (300ms ease-out, 12px lift). Respect prefers-reduced-motion.
- Real Bali wedding/venue photography is the hero; UI is the frame.
- 80/15/5 color rule: 80% ivory/charcoal, 15% taupe/sage, 5% gold accent.

## Stack & Hosting (CRITICAL)

- Astro 5 with `output: 'static'`. TailwindCSS v4. MDX content collections.
- Deploy target: **Cloudflare Pages** (git-connected), NOT Vercel, NOT Node SSR.
  Build command `npm run build`, output dir `dist`. `.github/workflows/deploy.yml` (the old
  Hostinger-FTP workflow) is disabled — Cloudflare's own git integration builds and deploys
  on every push to `main`, no GitHub Actions step needed for deploy.
- Forms via Web3Forms/Formspree (no Node backend). WhatsApp deep-link is the primary CTA.
- Clean URLs, HTTPS redirect, custom 404.
- Bilingual EN (default) + ID (`/id/`) with hreflang.

## Sitemap (v2)

/, /repertoire, /packages, /gallery, /about, /for-planners, /faq, /journal, /journal/[slug],
/contact, /thank-you, /privacy, /404

`/journal` (added 2026-06-21) is the SEO/GEO/AEO content hub — an Astro content collection
(`src/content/articles/`), not a hand-built page per article. See "Journal / Article Content"
below before writing or planning any article.

## Journal / Article Content

- Writing guide + SEO/GEO/AEO checklist + content pillars + skill-delegation table:
  `.claude/article-seo-geo-aeo-guidelines.md`. **Read it before drafting, editing, or planning
  any `/journal` article** — pillar choice, on-page SEO, and AEO/FAQ structure all live there.
- Collection schema: `src/content/config.ts` → `articles`. One markdown file per article in
  `src/content/articles/`; `pillar` must be one of the 4 enum values defined in the schema and
  guide — don't invent a 5th pillar ad hoc. Two title-like fields exist on purpose: `title`
  (`<title>`/meta tag, keeps the brand suffix) and `heading` (on-page H1/breadcrumb, no suffix)
  — don't collapse them back into one field, a 2026-06-21 audit found that bug in the first
  article (H1 was rendering the brand name twice).
- EN is the primary write target — `docs/SEO-STRATEGY.md` confirms ID search demand is
  near-zero, so a translation's SEO value is hreflang/UX completeness and trust for
  Indonesian-speaking couples/families, not direct ID-locale search traffic. As of 2026-06-23
  (owner request), every published article has a genuine Indonesian translation at
  `src/content/articles/id/<slug>.md` (same `articles` collection/schema, nested folder so its
  `slug` is `id/<slug>`) — `src/pages/id/journal/[slug].astro` renders that translation and is
  indexable when one exists. For a **new** article, write the `id/<slug>.md` translation as part
  of publishing it, not as a later task — until that file exists, the page falls back to the EN
  body under `noindex` (2026-06-21 audit: declaring `lang="id"` over English body content is a
  real hreflang/language-mismatch issue, not cosmetic — `BaseLayout`'s `noindex` prop exists for
  exactly this "no real bilingual pair" case). `astro.config.mjs`'s sitemap filter reads the
  `id/` translation folder directly, so an un-translated slug is automatically kept out of the
  sitemap until its translation file is added.
- Per-article FAQ entries (frontmatter `faq` field) render on-page **and** as `FAQPage` JSON-LD
  — this is the primary AEO mechanism, don't skip it.

## Work Rules

1. Mobile-first. Breakpoints: 375, 768, 1280, 1536.
2. Lighthouse mobile target: Performance 95 / A11y 100 / Best Practices 95 / SEO 100.
3. Core Web Vitals: LCP < 2.0s, INP < 200ms, CLS < 0.05.
4. Every UI change: run `npm run lint && npm run build`.
5. JSON-LD: MusicGroup + LocalBusiness (home), FAQPage (faq), BreadcrumbList.
6. Conventional commits (feat:, fix:, design:, chore:).
7. No SSR, no serverless. Everything must work as static files served by Cloudflare Pages.
8. Optimize all images (AVIF/WebP, lazy). Gallery must not block LCP. `astro:assets`
   `<Image>` needs explicit `format="avif" quality={70}` props — it does not convert
   format automatically.
9. Do NOT invent prices, stats, testimonials, or venue names. If real content isn't
   available yet, comment out the section's import + render line (e.g. Testimonials) rather
   than rendering a literal "TODO" string — visitors must never see "TODO" on the live site.
   `TODO` is still fine inside code comments / YAML frontmatter comments, just never in
   rendered copy.
10. `src/i18n/ui.ts` is large — `Read` the specific line range before `Edit`ing it; editing without reading that exact range first will be rejected.
11. After hand-editing markdown tables in `docs/*.md`, run `npx prettier --write <file>` — `npm run lint` runs `prettier --check .` repo-wide and will fail on unformatted tables.
12. If `astro check`/`build` prints "Duplicate id ... found" right after you edit a content-collection file (e.g. `src/content/packages/*.md`), it's a stale content-layer cache, not a real duplicate — rerun once before investigating.
13. Before writing/editing any user-facing copy, check `.claude/brand-voice-guidelines.md` for
    tone, vocabulary (use/avoid), and reusable Approved Copy blocks — don't freelance the voice.
14. When attaching images to an enumerated `i18n/ui.ts` items array (formations, moments,
    team members, etc.), add a literal-typed id field to each item (e.g. `formation`,
    `moment`, `person`) and key the image-lookup object off that field — not off array
    order, which silently breaks if items get reordered or filtered.
15. Never pre-rotate a source photo with `sips -r <deg>` before importing it. Astro's image
    pipeline (Sharp) auto-orients from EXIF on build; a `sips` rotation can leave the EXIF
    `orientation` tag intact, causing a double-rotation that's invisible in Preview/Read but
    wrong in the built output. Check first with
    `node -e "require('sharp')('file.jpg').metadata().then(console.log)"` — if `orientation`
    is already set, let the build handle it, or pre-fix with `sharp(file).rotate().toFile(out)`
    (auto-orients and clears the tag) instead of `sips`.
16. `.container-max` (`margin-inline:auto`, unlayered CSS) breaks if it's ever used as a
    direct child of a `flex` container — the auto margins shrink-and-center it instead of
    letting it stretch, and no Tailwind utility class can override this (cascade-layers
    priority). Use plain `w-full` + padding utilities instead of `.container-max` inside any
    JS-toggled flex layout (e.g. the mobile nav menu).
17. Same cascade-layers root cause as #16 also affects `.container-max` combined with a Tailwind
    `max-w-*` utility (e.g. `max-w-2xl`) on the same element — `.container-max`'s own
    `max-width: var(--content-max)` (1280px, unlayered) always wins over a layered Tailwind
    utility regardless of class order, so the element silently never narrows to the `max-w-*`
    value (found 2026-06-22 on the Journal article body, `container-max max-w-2xl`). This is
    **intentional/accepted as-is** on `/journal/[slug].astro` (+ `/id/` twin) — the owner wants
    the wide article column kept, so don't "fix" it by swapping in `.reading` again. If a true
    narrow reading column is ever wanted elsewhere, `.reading` (`max-width: var(--reading-max)`,
    720px, unlayered, defined right after `.container-max` in `global.css`) is the class that
    actually overrides it by cascade source-order — just confirm with the owner first, since
    narrowing the column is a visible width change, not just a bugfix.
18. No Playwright devDependency in `package.json` — for ad-hoc visual verification of a UI
    change (dev server + screenshot), reuse the cached install instead of `npm install`ing one:
    find the module via `find ~/.npm/_npx -maxdepth 3 -iname playwright`, find a full Chromium
    binary via `find ~/Library/Caches/ms-playwright -iname "*.app"` and pass it as
    `executablePath` (the cached `headless_shell` build is often missing/stale and
    `chromium.launch()` fails without an explicit path). Pass `reducedMotion: 'reduce'` to
    `newContext()`, or full-page screenshots come out faded below the fold (`.reveal` elements
    are `opacity:0` until their `IntersectionObserver` fires on real scroll).
19. Web3Forms' submit endpoint (`api.web3forms.com/submit`) sits behind Cloudflare
    bot-protection that blocks headless/automated submissions with a "Verify you are human"
    challenge — don't try to end-to-end test real form delivery via Playwright; have the owner
    submit a real test from an actual browser and confirm the email arrives instead.
20. DNS resolving correctly for a domain's mail (MX/SPF via `dig MX <domain>`) does NOT mean a
    specific mailbox on it was ever created or is receiving mail — that only proves the domain's
    mail routing exists. The only real test for whether a `PUBLIC_CONTACT_EMAIL`/Web3Forms
    delivery address is live is a real form submission + inbox check.
21. Astro's `define:vars` directive wraps an inline `<script>`'s body in an IIFE to scope the
    injected variables — any `function` declared inside (e.g. the GA4/gtag.js stub
    `function gtag(){dataLayer.push(arguments)}`) becomes local to that IIFE, never `window.gtag`.
    `gtag.js` still loads and silently drains the `js`/`config` commands already queued in
    `window.dataLayer` (so `Tag Assistant` reports the tag as "found" and Realtime can show a
    stale debug hit), but it never fires the actual `page_view` collect request — found
    2026-06-22, confirmed via Playwright that `typeof window.gtag` was `undefined` and zero
    `google-analytics.com/g/collect` requests fired even from a real (non-headless-flagged)
    browser context. Fix: use `set:html={`...`}` with the value template-interpolated into the
    string at build time instead of `define:vars` — this emits the literal, unwrapped Google
    snippet (`BaseLayout.astro`'s GA4 tag is the reference implementation). Don't reach for
    `define:vars` on any inline script that defines top-level functions meant to be callable
    globally (GA4, GTM, any other vendor snippet using the global-stub-function pattern).

## Session Workflow (Token Discipline)

- Default per-session reads: this file (automatic) + only the "Status as of"/"Next steps"
  section of `docs/PROGRESS.md` (kept short on purpose). Do NOT read `docs/PROGRESS-ARCHIVE.md`,
  `docs/BRIEF.md`, `docs/SEO-STRATEGY.md`, `docs/system-design.md`,
  `.agents/product-marketing.md`, `.claude/brand-voice-guidelines.md`, or
  `.claude/article-seo-geo-aeo-guidelines.md` at session start — read them on-demand, only when
  the task actually needs them (writing copy → brand-voice-guidelines; marketing-skill work →
  product-marketing.md; debugging a past incident/CI history → PROGRESS-ARCHIVE.md; any
  `/journal` article work → article-seo-geo-aeo-guidelines.md).
- For any large file whose location is already known, `Read` a targeted `offset`/`limit` range
  instead of the whole file — same principle as rule #10 for `src/i18n/ui.ts`, generalized to
  every large file in the repo.
- Prefer direct `Read`/`Grep`/`Bash` for a lookup in one known file/location. Reserve
  Explore/general-purpose subagents for genuinely broad or ambiguous searches across many
  files/unknown locations — not as the default for every task.

## Open questions (confirm with owner before finalizing copy)

- Pricing per formation + travel fee per Bali area + deposit policy — owner decided (2026-06-18)
  to hide pricing UI entirely until real figures exist, rather than show a placeholder. Do NOT
  re-add a price field/column/TODO string anywhere until the owner gives real numbers.
- Brand visual: existing logo/palette/font, or use the proposal above?
- Audio/video + wedding photos availability + usage permission from clients/planners. Piano
  player photo/video is the one exception already in hand (2026-06-18) — see
  `docs/PROGRESS-ARCHIVE.md`.
