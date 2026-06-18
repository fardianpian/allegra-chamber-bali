# Progress & Next Steps

> Living document — update this file at the end of each work session so the next session (or next
> person) can pick up without re-deriving context. Keep "Next Steps" in priority order.

## Status as of 2026-06-19

### Done

- **Hosting migrated from Hostinger-FTP to Cloudflare Pages.** The original plan
  (`.github/workflows/deploy.yml`, GitHub Actions → `npm ci`/`npm run build` → FTP upload to the
  Hostinger sub-domain document root) never reached a working state in CI: Hostinger blocks
  GitHub Actions' runner IPs on FTP port 21 (`Error: Timeout (control socket)` — confirmed by
  testing the same host:port from a residential IP, which connected fine, vs. the GH Actions
  runner, which timed out), and ports 990 (implicit FTPS) / 22 (SFTP) are closed entirely on this
  Hostinger plan regardless of source IP — there was no protocol fallback available. Two earlier,
  real CI bugs were found and fixed along the way before this dead end (kept fixed, still valid):
  an incomplete `package-lock.json` missing top-level `@emnapi/core`/`@emnapi/runtime` entries
  (cross-platform `optionalDependencies` resolution bug — macOS-generated lockfile didn't fully
  resolve under Linux `npm ci`; fixed with a full `rm -rf node_modules package-lock.json && npm
install` regeneration), and a malformed `FTP_SERVER` secret (`ftp://undefined@...`, a glitchy
  hPanel UI copy artifact) corrected to the plain hostname.
  As an immediate stop-gap, did one manual deploy: `npm run build` → zip `dist/` → upload via
  Hostinger hPanel File Manager → extract. (Hit one nested-folder bug this way too — hPanel's
  extract created an `allegra-deploy/` subfolder instead of flattening into the target directory,
  so the site briefly 404'd/showed Hostinger's default placeholder until the files were moved up
  a level.) That confirmed the site renders correctly, but wasn't sustainable for "ongoing content
  updates happen in a Claude Code session" — every update would have meant a manual zip/upload
  cycle. Decided with the owner to switch the **hosting** layer to **Cloudflare Pages** instead
  (domain registration, DNS zone, and email stay on Hostinger — only the `allegra` subdomain's
  hosting target changed): created project `allegra-chamber-bali` git-connected to
  `fardianpian/allegra-chamber-bali` (`main` branch, build `npm run build`, output `dist`) via the
  Cloudflare dashboard (the Claude Code Cloudflare MCP integration's OAuth session is read-only —
  it can list/inspect Pages projects and domains but cannot create projects or add custom domains;
  those two steps needed the owner to click through the dashboard once, including adding this repo
  to the Cloudflare GitHub App's repository allowlist, since it was previously scoped to "only
  selected repositories" for a different project). Repointed the `allegra` DNS record at Hostinger
  from an `ALIAS` (Hostinger's own CDN) to a `CNAME` → `allegra-chamber-bali.pages.dev` via the
  Hostinger DNS API (delete old record + create CNAME, explicitly scoped to just that one record
  — not a zone-wide overwrite, to avoid touching MX/email or other subdomains). Verified end to
  end: push to `main` → Cloudflare auto-builds and deploys in under a minute, confirmed via the
  Pages API (`GET .../deployments`) and `curl` against both the `*.pages.dev` URL and the final
  custom domain once its SSL cert finished issuing. Disabled the old workflow (moved out of
  `.github/workflows/`, then deleted once confirmed unnecessary — git history has it if ever
  needed) and updated `CLAUDE.md`'s locked hosting decision + Stack & Hosting section to match.
  Also retired `public/.htaccess` (Apache/LiteSpeed-only, inert on Cloudflare's edge) in favor of
  a native `public/_headers` file carrying over just the still-relevant parts (security headers,
  cache-control for `/_astro/*`, `/images/*`, `/audio/*`) — HTTPS redirect and the custom 404 page
  don't need any config on Cloudflare Pages, both are automatic.
- Created the `allegra` subdomain itself (before the above) via direct Hostinger API calls —
  DNS auto-provisioned, confirmed resolvable, no hPanel manual clicking needed for that step.
- **Site is fully live with real business data — WhatsApp, Instagram, and the contact form all
  work end-to-end in production now.** Owner filled real values into `.env.example` directly
  (real WhatsApp number, real Instagram URL) — caught and explained that `.env.example` is never
  read by Astro/Vite at build time (only `.env` or actual platform env vars are), so editing it
  alone does nothing; created a local untracked `.env` with the real values for local dev/build
  parity, and the owner separately added the same variables as Cloudflare Pages **Production**
  environment variables (`PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_INSTAGRAM`, `PUBLIC_SITE_URL`,
  `PUBLIC_CONTACT_EMAIL`, `PUBLIC_WEB3FORMS_KEY` as plain text, since they're all `PUBLIC_`-
  prefixed and get inlined into the client bundle regardless of Cloudflare's "Secret" vs.
  "Plain text" toggle — that toggle only affects dashboard visibility, not what ships in the
  static output). **Found a real credential leak while reviewing the edit:** `PUBLIC_WEB3FORMS_KEY`
  in the tracked `.env.example` held a real Web3Forms access key (owner-confirmed), present since
  the repo's very first commit — `.env.example` is meant to hold placeholder values only, real
  ones belong in the gitignored `.env`. Fixed by replacing it with a generic placeholder in
  `.env.example` and committing that fix; owner separately rotated the key on web3forms.com and
  used the **new** key as the Cloudflare env var (confirmed the old key is no longer the one
  live — `/contact`'s rendered `access_key` field now matches the new value, not the leaked one).
  Triggered a redeploy (empty commit, since env var changes alone don't auto-redeploy) and
  verified via `curl` against the live custom domain: WhatsApp CTAs all link to the real number,
  Instagram footer link is real, and the contact form's hidden `access_key` field matches the
  rotated key — not just that the build succeeded.

## Status as of 2026-06-18

### Done

- **First real photography on the site: 3 owner-supplied wedding pianist photos wired in.**
  Owner provided 3 real photos (grand piano at a cliffside ocean-view ceremony with florals;
  a Korg keyboard at a daytime garden/lagoon setting; an upright piano at a night reception under
  string lights) from `/Users/fardian.fp/Downloads/Allegra-jessica-foto/`, explicitly to focus SEO
  on the piano angle — `docs/SEO-STRATEGY.md` §3.0 already flagged "wedding pianist" (KD 1) as the
  single best keyword opportunity in the whole strategy, so this closes that gap with real proof
  instead of placeholder copy. This is the **first real `<Image>` usage in the codebase** — every
  image before this was either the CSS-gradient `Placeholder` component or a static file in
  `public/`. Added `image`/`imageAlt` optional fields to the `packages` content collection schema
  (`src/content/config.ts`, switched to the `({ image }) => z.object(...)` function form so the
  `image()` Zod helper is available) and colocated the cliffside grand-piano photo at
  `src/content/packages/solo-piano.jpg`, referenced from `solo.md` — renders above the Solo
  formation's body copy in `PackagesList.astro` (new `astro:assets` `Image` import, `loading="lazy"`,
  `aspect-[3/2] object-cover`). The other two photos went to `src/assets/gallery/` and into
  `GalleryGrid.astro`: a `realPhotos` lookup keyed by venue `type` (`cliffside`/`garden`) swaps the
  _first_ generated tile of a matching type from the `Placeholder` component to a real `<Image>`,
  leaving the rest as placeholders — alt text follows the `"{type} ceremony/reception with live
wedding pianist, Bali"` pattern from `docs/SEO-STRATEGY.md` §9 (adapted for piano instead of
  string ensemble). Also set `ogImage="/images/og-packages-piano.jpg"` on both `/packages` and
  `/id/packages` (a plain copy in `public/images/`, since `BaseLayout`'s `ogImage` prop takes a
  public URL string, not an `astro:assets`-managed import) so sharing the Packages link now shows
  the real piano photo instead of the generic default. Updated `galleryPage.subhead` /
  `placeholderNote` (EN+ID) to stop claiming "every photo is a placeholder" now that 2 aren't.
  Astro's build-time image pipeline compressed all 3 (e.g. the Solo photo: 1150kB → 126kB WebP)
  automatically — no manual optimization needed, satisfying CLAUDE.md §8. Re-ran the full
  Lighthouse mobile audit on `/packages` and `/gallery` after adding real photos (the concern:
  real images vs. lightweight CSS placeholders could regress Performance/CLS) — both still
  **100/100/100/100**, LCP 1.3–1.4s, CLS 0. Verified the Gallery type filter still correctly
  shows/hides the real-photo tiles, and that `/id/gallery` renders the same 2 real photos, via
  Playwright before and after the Lighthouse re-check.
- **Pricing hidden site-wide (owner direction, 2026-06-18) + Large Ensemble composition confirmed.**
  Owner decided pricing should not be shown at all for now, rather than the previous "TODO"
  placeholder convention — and in checking this, found the previous convention had a real leak:
  every package card was literally rendering the dev string `"TODO: confirm price with owner"` as
  live, customer-facing text (the `priceFrom` field in every `packages/*.md` file was set to that
  literal string, not left empty — so the `item.data.priceFrom || pkg.priceTbd` fallback in
  `PackagesList.astro` never even reached the `pkg.priceTbd` placeholder, since the TODO string
  itself counted as a truthy price). Fixed by removing the `priceFrom` field from all 5
  `packages/*.md` files, deleting the price column from `PackagesList.astro`'s `<dl>` (now
  `sm:grid-cols-2`: Ideal for / Set length only — no price column at all), removing the now-unused
  `priceLabel`/`priceTbd` i18n keys, and rewriting `pricingNote` from a "TODO" disclaimer into a
  normal "message us for a quote" line (EN+ID). Also caught and fixed the identical bug pattern in
  `setLengthTbd` (`duo`/`large-ensemble`/`solo`/`trio` had literal `setLength: 'TODO'` — same leak,
  smaller scale) and in two `/faq` answers where "TODO: ... before launch" was embedded mid-sentence
  inside an otherwise normal-reading customer answer (deposit policy + travel fee questions) —
  reworded both without inventing numbers. **Large Ensemble composition signed off** (quartet +
  piano + double bass, 6 musicians) — owner confirmed piano must be in the default/first-presented
  lineup but the composition stays customisable on request. Removed every `(TBC)` /
  "TBC: owner to confirm..." instance: homepage `formations.items` tagline (EN+ID), and
  `large-ensemble.md`'s `summary` field and dev comment, both rewritten to state the confirmed
  composition + customisable note as fact, not a pending question. Verified with
  `npm run build` + a Playwright text-content check (`bodyText.includes('TODO')` → false,
  `homeText.includes('TBC')` → false) plus a full-page screenshot of `/packages`.
- **Full Lighthouse mobile audit (all 11 built pages, EN+ID) — now 100/100/100/100 everywhere.**
  Ran real `lighthouse` CLI (not just lint/build) against `astro preview` for every page. Found
  every single page stuck at Accessibility 95–96 (Performance/Best Practices/SEO were already 100) due to **one systemic root cause**, not per-page issues: `--color-taupe: #9c9183` (the
  palette value sampled directly from the owner's logo file, "locked" per CLAUDE.md) only has a
  2.79:1 contrast ratio against the Ivory background — WCAG AA needs 4.5:1 for the ~30 places
  across the codebase that use it as muted text color (eyebrow labels, subheads, captions,
  placeholder notes). Asked the owner how to handle changing a locked brand color for an
  accessibility hard-requirement; they chose darkening it. Changed `--color-taupe` to `#6d665c`
  in `src/styles/global.css` (5.12:1 contrast, same warm gray-brown hue family) and updated the
  documented hex in CLAUDE.md's palette line with the rationale.
  **Second bug found while verifying the fix:** darkening taupe exposed a separate, pre-existing
  cascade bug — `.eyebrow` in `global.css` was an _unlayered_ CSS rule setting `color:
var(--color-taupe)` directly, and per CSS Cascade Layers spec, unlayered rules always beat
  Tailwind's `@layer utilities` regardless of source order or specificity. This silently broke
  every dark-background eyebrow site-wide (`Eyebrow.astro` + `text-ivory/70` in `FinalCTA`,
  `StudioConnection`, and `Footer.astro`'s `text-ivory/50` Quick Links/Contact labels) — they were
  always rendering in taupe instead of the intended light ivory tone, just invisibly so before
  because the _original_ lighter taupe happened to still pass contrast against the dark Ink
  background, masking the bug. Fixed by wrapping `.eyebrow` in `@layer components` in
  `global.css` so component-level Tailwind utility overrides work as authored. Verified the fix
  with Playwright (`getComputedStyle` color check on the footer eyebrow + a light-background
  eyebrow) before re-running the full 11-page audit, which is what got every page to 100 a11y.
- **`/404`** (`src/pages/404.astro`, single global page, no `/id/` variant) — found and fixed a
  real bug while building this: `public/.htaccess` pointed `ErrorDocument 404` at
  `/404/index.html`, assuming Astro's `build.format: 'directory'` setting applied to it. It
  doesn't — Astro always emits `404.astro` as a flat `/404.html` regardless of that setting (this
  is intentional Astro behavior, not a config bug on our side). Confirmed with an actual
  `npm run build` (`dist/404.html`, not `dist/404/index.html`) and fixed the `.htaccess` path to
  match. Because Apache's `ErrorDocument` is one path for the entire domain — it can't know
  whether the broken link was under `/id/`— the page itself is bilingual on one route rather than
  split into EN/ID copies like every other page: English message primary, Indonesian translation
  as a secondary line directly below it. Added a new `noindex` prop to `BaseLayout.astro` (skips
  canonical/hreflang `<link>` tags, which would otherwise point at a nonexistent `/id/404`, and
  emits `<meta name="robots" content="noindex, follow">` instead) — this is the first page in the
  codebase that needs that prop; no other page was touched. CTAs: Back to Home, View Packages,
  WhatsApp. Verified the dev server actually serves this page with a real `404` HTTP status for
  an unmatched route (not just that the file renders), plus desktop/mobile screenshots and a
  button click-through, via Playwright.
- **`/privacy`** (EN+ID, `src/pages/privacy/`, `src/pages/id/privacy/`) — new `privacyPage` i18n
  namespace in `src/i18n/ui.ts`: intro paragraph + 9 sections (Information We Collect, How We Use
  It, Third-Party Services, Cookies, Data Retention, Your Rights, Children, Changes, Contact),
  each typed `'list' | 'paragraphs'` and rendered by new `PrivacyContent.astro`. Content is a
  good-faith description of what the site **actually** does today (Web3Forms processes the
  contact/partnership forms, WhatsApp deep-links carry no server-side data collection, no
  cookies/analytics script is wired up despite `PUBLIC_PLAUSIBLE_DOMAIN`/`PUBLIC_GA4_ID` existing
  as commented-out placeholders in `.env.example`) — not a generic template.
  Ends with a visible `legalNote`: "TODO: have this policy reviewed by a qualified lawyer before
  launch" — this is a good-faith draft, not legal advice, per CLAUDE.md §9 placeholder policy.
  `Footer.astro` already linked to `/privacy` with a hardcoded English "Privacy Policy" string;
  added `footer.privacyLink` i18n key (EN/ID) and swapped the hardcode for it so the footer link
  is correctly localized on `/id/*` pages too — pre-existing gap, fixed as part of this page's
  scope since it touched the same link. Verified visually with Playwright (desktop 1440px, mobile
  390px, `/id/privacy`, footer link click-through).
- **`/faq`** (EN+ID, `src/pages/faq/`, `src/pages/id/faq/`) — `FAQPage` JSON-LD (new `getFaqJsonLd()`
  in `src/lib/jsonld.ts`, combined with `getBreadcrumbJsonLd()` in the page's `jsonLd` array prop).
  New `faqPage` i18n namespace in `src/i18n/ui.ts` with 9 question/answer pairs per locale, built
  around the PAA topics from `docs/SEO-STRATEGY.md` §7/§9: cost, ceremony duration, trio vs.
  quartet, outdoor/cliffside venues, song requests, the wedding-pianist solo option (piano flagship
  tie-in), booking lead time + deposit, Bali-wide travel coverage, and how to check availability.
  Cost/duration answers are deliberately generic (no invented numbers) and route to WhatsApp/contact
  for a quote. (Deposit policy and travel-fee answers were later reworded on 2026-06-18 — see
  "Pricing hidden site-wide" above — to drop the inline "TODO" phrasing they originally had.)
  New `FaqList.astro` — native
  `<details>/<summary>` accordion, no JS, so it degrades cleanly and needs no client-side script
  (unlike `RepertoireList`/`GalleryGrid`'s vanilla-JS filters). Page ends with the shared `FinalCTA`.
  `nav.faq` and the `/faq` header/footer links already existed before this page was built — adding
  the route was the only missing piece. Verified visually with Playwright (desktop 1440px, mobile
  390px, `/id/faq`, accordion open/close, header nav-link click-through).
- **SEO audit + fixes across all built pages** — user asked to check the whole site against
  `docs/SEO-STRATEGY.md`. Found and fixed two issues:
  1. **Missing `<h1>` on every inner page.** `PageHeader.astro` → `SectionHeading.astro` was
     rendering its heading as `<h2>`, not `<h1>` — only Home (`Hero.astro`) and Thank-you had a
     real H1. Fixed by adding a `level?: 'h1' | 'h2'` prop to `SectionHeading.astro` (default
     `h2`, unchanged for its other ~10 callers) and passing `level="h1"` from `PageHeader.astro`
     only. Also bumped the per-formation headings in `PackagesList.astro` from `<h3>` to `<h2>`
     (they were skipping a heading level since Packages had no other H2).
  2. **Title/H1/meta rewrites from §9 applied** to Home, Packages, Repertoire, Gallery, About
     (EN only — see rationale below). Added dedicated `title`/`description` i18n keys to
     `packagesPage`/`repertoirePage`/`galleryPage`/`aboutPage` (both locales, for type parity —
     `ui.en`/`ui.id` must share keys) instead of the old `${heading} — Allegra Chamber Bali` /
     `subhead`-as-description pattern, so the `<title>` tag could lead with the primary keyword
     while the visible H1 stays thematically related but not a literal duplicate (per §6
     checklist). Packages' Solo block now says "wedding pianist" in its summary + body copy
     (`src/content/packages/solo.md`) right under the H2, satisfying §9's instruction without
     renaming the shared `name: Solo` field (which also feeds the WhatsApp inquiry message).
     **EN-only, ID titles/headings left untouched on purpose:** §8 of the SEO doc found zero
     measured search volume for the Indonesian equivalents of these clusters ("musisi pernikahan
     bali", "jasa musik pernikahan", etc.) — even ID-locale searchers type English vendor terms.
     Forcing keyword phrasing into the ID titles would be inventing unvalidated copy, not applying
     data. The one exception is `/for-planners`, where §8 explicitly found real ID-locale volume
     for the literal English phrase "wedding planner bali" — that page's ID title already uses it.
     Home's H1 (`Hero.astro`'s "Allegra Chamber Bali") was deliberately left as the brand wordmark,
     not rewritten to a keyword phrase — it's the confirmed-final brand identity (see "Brand logo
     confirmed final" below), so only `meta.title`/`meta.description` changed for Home.
- **`/for-planners`** (EN+ID) — B2B page per `docs/BRIEF.md` §8.6 and `docs/SEO-STRATEGY.md` §7/§9
  (primary keyword "wedding planner bali", title already keyword-first from the start). New
  components: `PlannerValueProps.astro` (3-item trust grid: reliable/
  tech rider/fast communication, same visual pattern as About's philosophy grid),
  `PlannerDownloads.astro` (4 download rows — Tech Rider, Stage Plot, Repertoire Sheet, High-Res
  Logo Pack — all showing "Coming soon" since none of these files exist yet per
  `docs/BRIEF.md` §17; do not link them to fake/placeholder files), `PartnershipForm.astro` (B2B
  variant of `ContactForm.astro` — fields are name/company/email/phone/role/message instead of
  the couple-facing wedding-date/venue/formation fields; posts to the same Web3Forms endpoint with
  a distinct `subject` so the owner's inbox can tell inquiry types apart). New `forPlannersPage`
  i18n namespace in `src/i18n/ui.ts`. Verified visually with Playwright (desktop 1440px, mobile
  390px, `/id` page) — like other pages, full-page screenshots taken immediately after load can
  show blank `.reveal` sections that haven't scrolled into the IntersectionObserver yet; scroll
  through the page first (or wait) before judging a screenshot as broken.
- **`/about`** (EN+ID) — brand story ("Why Allegra"), 3-item philosophy grid (Live / Tailored /
  Refined), musician profiles section (`MusicianProfiles.astro` — 4 placeholder cards, real
  names/photos/bios deliberately withheld per CLAUDE.md §9 until the owner confirms), and a
  dark-band "Part of Indonesia Istimewa Studio" paragraph (`StudioConnection.astro` — text only, no
  link, since no confirmed studio URL exists anywhere in config). New `AboutStory.astro` for the
  story+philosophy half. Ends with the shared `FinalCTA`.
- **`/gallery`** (EN+ID) — `GalleryGrid.astro` renders 20 `Placeholder` tiles (4 per venue type:
  cliffside/beach/garden/chapel/ballroom — the `venues` schema enum, not invented venue names) with
  the same vanilla-JS filter-button pattern as `RepertoireList.astro`. No real photography collection
  exists yet; tiles are generated directly from the type enum rather than from the (currently
  3-of-5-types-only) `venues` collection, so the filter has something to show for every category.
  Replace with a real photo collection once the owner provides event photography — don't just swap
  `Placeholder` for `<img>` without also adding per-photo `data-type` tagging.
- **`/repertoire`** (EN+ID) — full song list from the `repertoire` collection (all songs, not just
  `featured`), with vanilla-JS client-side filtering by `moment` and `genre` (two independent button
  rows, AND logic between them, no framework — static-only per CLAUDE.md). New
  `RepertoireList.astro`. Shows a "no results" message when a filter combination matches nothing
  (currently all 3 seeded songs are `genre: classical`, so any non-classical genre filter empties
  the list — expected until more repertoire is added). Ends with a "request a custom arrangement"
  CTA linking to `/contact`. Filter interactivity verified with Playwright (active-state styling,
  show/hide logic, reset-to-all).
- **`/packages`** (EN+ID, `src/pages/packages/`, `src/pages/id/packages/`) — renders all 5 formations
  from the `packages` content collection (sorted by `order`), each as an `<article id="{formation}">`
  with `scroll-mt-28` so the homepage Formations cards' `#solo`/`#duo`/`#trio`/`#quartet`/
  `#large-ensemble` anchors land below the sticky header. New shared components: `PageHeader.astro`
  (lightweight inner-page header, no full-bleed photo — reuse this for `/repertoire`, `/gallery`,
  `/about`, etc.), `PackagesList.astro` (renders collection body via `render()` from `astro:content`,
  not the deprecated `entry.render()`). Each package has a per-formation WhatsApp inquiry CTA. New
  `getBreadcrumbJsonLd()` helper in `src/lib/jsonld.ts` — reuse for every inner page per CLAUDE.md §5.
- **`/contact`** (EN+ID) + **`/thank-you`** (EN+ID) — `ContactForm.astro` posts directly to
  `https://api.web3forms.com/submit` (static-only, no Node backend — per CLAUDE.md). Fields: name,
  email, phone, wedding date, venue/area, formation dropdown, message; honeypot `botcheck` checkbox
  per Web3Forms' anti-spam convention; hidden `redirect` field points to the locale's `/thank-you`.
  Sidebar offers WhatsApp + `mailto:` as alternatives. Form will not actually deliver until
  `PUBLIC_WEB3FORMS_KEY` is set — a visible `TODO` note under the submit button says so; this is
  intentional per CLAUDE.md placeholder policy, not a bug to "fix" by hiding the note.
- **Foundation:** `.prettierrc.json` (tabs, single-quote, no semi — matches the starter kit's existing
  unformatted style), `.prettierignore`, `tsconfig.json` (was missing entirely — added
  `astro/tsconfigs/strict`). `npm run lint` and `npm run build` both clean.
- **i18n:** manual dictionary at `src/i18n/ui.ts` (EN default + ID at `/id/`), `src/i18n/utils.ts`
  (`useTranslations`, `getLocalizedPath`), hreflang wired in `BaseLayout`.
- **Layout:** `BaseLayout.astro` (meta/OG/hreflang/JSON-LD slot/reveal-on-scroll script),
  `Header.astro` (sticky, desktop nav, mobile hamburger menu, lang toggle, WhatsApp CTA),
  `Footer.astro` (3-column, studio line to Indonesia Istimewa Studio).
- **Brand wordmark:** `src/components/ui/Logo.astro` — reusable, `tone` (ink/ivory) + `size`
  (sm/md/lg) props. Used in Header and Footer instead of duplicated inline markup.
- **UI primitives:** `Button` (primary/gold/outline/ghost), `Eyebrow`, `Placeholder` (gradient
  stand-in for missing photography, never fake stock), `SectionHeading`.
- **Media:** `WhatsAppCTA` (wa.me deep-link with pre-filled message), `AudioSample` (native
  `<audio>`, falls back to "Sample coming soon" when no file).
- **Homepage** (`src/pages/index.astro` + `src/pages/id/index.astro`), all 10 sections from brief
  §8.1: Hero, TrustStrip, Formations, FeaturedAudio, Moments, HowBookingWorks, Testimonials,
  GalleryPreview, ForPlannersStrip, FinalCTA. JSON-LD `MusicGroup` + `LocalBusiness` via
  `src/lib/jsonld.ts`.
- **Content collections seeded** (all real, non-`_example` files so they actually render):
  `packages/` (solo, duo, trio, string-quartet, large-ensemble — pricing all `TODO`),
  `repertoire/` (Canon in D, Air on the G String, Spring–Vivaldi — public domain, safe to publish
  as-is), `testimonials/` (3× `TODO` placeholder), `venues/` (3× `TODO` placeholder).
- Verified visually with Playwright (desktop 1440px, mobile 390px, mobile menu open, `/id` page) —
  reveal-on-scroll animations confirmed working when actually scrolled through.

### Confirmed decisions this session (don't re-ask)

- **Piano is a flagship offering, not an afterthought.** Solo now lists piano alongside violin/cello
  (`src/content/packages/solo.md`, homepage Formations card tagline/blurb in `src/i18n/ui.ts`,
  CLAUDE.md formations line). Duo/Trio/String Quartet each got a one-line "Piano +" upsell sentence
  in their markdown body (e.g. "Piano + Quartet swaps piano in alongside the strings") — Large
  Ensemble already includes piano by default, so it was left unchanged. Per
  `docs/SEO-STRATEGY.md` §3.0, "Piano +" combo phrases have zero measured search demand in any
  locale — this is on-page upsell copy only, not a keyword target or separate page/H1. "wedding
  pianist" (KD 1, US vol 720) is real secondary-keyword territory for the Packages Solo block.
- **Large Ensemble composition:** string quartet + piano + double bass (6 musicians). Still marked
  `TBC` in `src/content/packages/large-ensemble.md` pending the owner's final sign-off, but this is
  the working default for all copy.
- **Brand logo confirmed final** (owner supplied a screenshot, analyzed pixel-by-pixel):
  - Wordmark "Allegra" → Cormorant Garamond, weight 500, upright (confirmed by rendering the
    self-hosted font and comparing letterforms — `g` shape, `A` apex, serif bracketing all match).
  - Subtitle "Chamber Bali" → in the **source logo file** it is sans-serif (Inter-like), but the
    owner explicitly chose to keep it **serif (Cormorant, inherited from the wordmark)** in the
    site's `Logo.astro` instead of matching the source file exactly. This was a deliberate
    override — do not "fix" it back to sans-serif without asking again.
  - Colors sampled directly from the logo PNG: ink `#1E1C19`, taupe `#9C9183`, background
    `≈#F7F3EC` — all already exactly match the tokens in `CLAUDE.md` / `global.css`. No new colors.
  - Favicon regenerated to match: ivory bg + ink "A" (Georgia/serif), no gold box.

### Still open — owner must provide, do not invent

- Pricing per formation + travel fee per Bali area + deposit policy — owner decided (2026-06-18)
  to keep this hidden from the live site for now rather than show a placeholder; see above. Still
  needs real figures eventually, just no longer urgent/blocking.
- Real venue names, real testimonials (with permission), real event photography for non-piano
  formations.
- ~~Final sign-off on Large Ensemble instrumentation~~ — confirmed 2026-06-18, see above.
- ~~Piano photo documentation~~ — 3 real photos received and wired into Packages/Gallery,
  2026-06-18, see above. **Piano video is still pending** (owner has it, hasn't sent it yet) — no
  video player component exists anywhere in the codebase yet (only `AudioSample.astro` for
  `<audio>`), so wiring that in will need a new component, not just an asset drop-in.
- ~~WhatsApp business number, Instagram handle, Web3Forms account~~ — resolved 2026-06-19, see
  above. Real values are live and end-to-end functional (owner manually tested both: a real
  `/contact` submission arrived via Web3Forms, and the WhatsApp CTA opened a chat with the
  pre-filled message on a real phone — automated Playwright testing of the form itself got
  blocked by Web3Forms' Cloudflare anti-bot challenge, so this needed a real human test instead).
  ~~Hostinger FTP credentials~~ — no longer needed, hosting moved to Cloudflare Pages
  (2026-06-19), git push deploys automatically.

## Next steps (priority order)

1. **Get the piano video from the owner** (they have it, haven't sent it yet) and build a video
   embed component — none exists yet, only `AudioSample.astro` for `<audio>`. Decide embed
   format with the owner first (raw file vs. YouTube/Instagram/Vimeo share link) since that
   changes the component shape.
2. **Content depth**: real venue names, real testimonials (with permission), and event
   photography for the non-piano venue types (beach/chapel/ballroom — only cliffside/garden have
   real photos so far). All still owner-supplied, don't invent.
3. Re-run the full Lighthouse mobile audit once the above real photography/content lands — it's
   clean at 100/100/100/100 today, but real images (vs. the lightweight CSS-gradient
   `Placeholder` component) are the one thing that could move Performance/CLS, so verify it holds.
4. Housekeeping, no urgency: delete the orphaned manual-deploy leftovers on the old Hostinger
   document root (`domains/indonesiaistimewastudio.id/public_html/allegra/` — `test.html` and any
   stray files from the one-time zip upload; DNS no longer points there so nothing serves them,
   but they're still taking up space), and optionally remove the now-unused `FTP_*` GitHub
   Secrets on the repo (harmless to leave, just dead weight).

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
