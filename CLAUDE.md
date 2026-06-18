# Project: allegra.indonesiaistimewastudio.id

> Persistent context for Claude Code. Read this first, then `docs/BRIEF.md` for the full spec.

## Brand

Allegra Chamber Bali — live chamber/string ensemble for weddings in Bali.
Sub-brand of Indonesia Istimewa Studio. Audience: couples (mostly international
destination weddings), wedding planners, venues, event organizers.
Languages: **English (primary) + Indonesian (secondary)**.

## Confirmed decisions (locked)

- Sub-domain (final): `allegra.indonesiaistimewastudio.id`
- Hosting (revised 2026-06-18): **Cloudflare Pages**, git-connected to `fardianpian/allegra-chamber-bali`
  (push to `main` → auto build & deploy). Domain registration, DNS zone, and email
  (`allegra@indonesiaistimewastudio.id`) stay on **Hostinger** — only the `allegra` subdomain's
  DNS record was changed to a CNAME pointing at `allegra-chamber-bali.pages.dev`. Switched away
  from the original Hostinger-FTP plan because Hostinger blocks GitHub Actions' runner IPs on
  port 21 (confirmed via direct port testing), and ports 990/22 are closed entirely on that
  hosting plan — no working CI deploy path existed under the old setup. Still **static-only
  (Astro SSG)**. No Node SSR, no serverless.
- Languages: English default + Indonesian (`/id/`) with hreflang.
- Formations offered (5): Solo (Violin/Cello/Piano), Duo, Trio, String Quartet, Large Ensemble.
  Piano is a flagship offering — solo piano is a Solo option, and a "Piano +" upgrade
  (Piano + Duo/Trio/Quartet) is sellable as an add-on within Duo/Trio/Quartet (Large Ensemble
  already includes piano in its default composition). Sold as on-page upsell copy within
  `/packages`, not as a separate keyword/page — see `docs/SEO-STRATEGY.md` §3.0 for why.
- Large Ensemble composition (confirmed 2026-06-18, no longer TBC): string quartet + piano +
  double bass (6 musicians). Piano must stay in the default/first-presented lineup; the exact
  instrumentation is customisable per client on request.
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

## Sitemap (v1)

/, /repertoire, /packages, /gallery, /about, /for-planners, /faq, /contact, /thank-you, /privacy, /404

## Work Rules

1. Mobile-first. Breakpoints: 375, 768, 1280, 1536.
2. Lighthouse mobile target: Performance 95 / A11y 100 / Best Practices 95 / SEO 100.
3. Core Web Vitals: LCP < 2.0s, INP < 200ms, CLS < 0.05.
4. Every UI change: run `npm run lint && npm run build`.
5. JSON-LD: MusicGroup + LocalBusiness (home), FAQPage (faq), BreadcrumbList.
6. Conventional commits (feat:, fix:, design:, chore:).
7. No SSR, no serverless. Everything must work as static files served by Cloudflare Pages.
8. Optimize all images (AVIF/WebP, lazy). Gallery must not block LCP.
9. Do NOT invent prices, stats, testimonials, or venue names — use placeholders marked TODO until the owner provides real data.
10. `src/i18n/ui.ts` is large — `Read` the specific line range before `Edit`ing it; editing without reading that exact range first will be rejected.
11. After hand-editing markdown tables in `docs/*.md`, run `npx prettier --write <file>` — `npm run lint` runs `prettier --check .` repo-wide and will fail on unformatted tables.
12. If `astro check`/`build` prints "Duplicate id ... found" right after you edit a content-collection file (e.g. `src/content/packages/*.md`), it's a stale content-layer cache, not a real duplicate — rerun once before investigating.

## Open questions (confirm with owner before finalizing copy)

- Pricing per formation + travel fee per Bali area + deposit policy — owner decided (2026-06-18)
  to hide pricing UI entirely until real figures exist, rather than show a placeholder. Do NOT
  re-add a price field/column/TODO string anywhere until the owner gives real numbers.
- Brand visual: existing logo/palette/font, or use the proposal above?
- Audio/video + wedding photos availability + usage permission from clients/planners. Piano
  player photo/video is the one exception already in hand (2026-06-18) — see `docs/PROGRESS.md`.
