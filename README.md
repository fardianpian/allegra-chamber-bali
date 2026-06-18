# Allegra Chamber Bali — Website

Live chamber & string ensemble for weddings in Bali. Static website built with **Astro** (SSG), deployed via **Cloudflare Pages** at the sub-domain `allegra.indonesiaistimewastudio.id` (domain/DNS/email stay on Hostinger). Sub-brand of Indonesia Istimewa Studio.

> **This repository is a STARTER KIT prepared for implementation by Claude Code.**
> Read [`CLAUDE.md`](./CLAUDE.md) first, then [`docs/BRIEF.md`](./docs/BRIEF.md) for the full specification.
> Files marked `TODO` are placeholders; replace them as you build.

## Tech

- Astro 5 (`output: 'static'`) + TypeScript
- TailwindCSS v4 (design tokens in `src/styles/global.css`)
- MDX content collections (repertoire, packages, testimonials, venues)
- Forms: Web3Forms/Formspree + WhatsApp deep-link (primary CTA)
- Deploy: Cloudflare Pages, git-connected — push to `main` → auto build & deploy

## Quick start (local)

```bash
npm create astro@latest .      # if scaffolding fresh; keep this repo's docs/config
npm install
npm install -D tailwindcss @tailwindcss/vite @astrojs/mdx @astrojs/sitemap @fontsource/cormorant-garamond @fontsource/inter sharp
npm run dev                    # http://localhost:4321
npm run build                  # outputs static site to dist/
npm run preview                # preview the production build
```

## Project structure

See `docs/BRIEF.md` §13 for the full target tree. Key folders:

- `src/pages/` — routes (EN at root, ID under `src/pages/id/`)
- `src/content/` — MDX/JSON content collections (see `src/content/config.ts`)
- `src/components/` — sections, ui, layout, media
- `public/` — static assets, `robots.txt`, audio, images, press kit

## Deployment (Cloudflare Pages)

Project `allegra-chamber-bali` is git-connected (Cloudflare GitHub App) to this repo's `main`
branch. Build command `npm run build`, output directory `dist`. Push to `main` → Cloudflare
builds and deploys automatically, no manual step and no GitHub Actions involved. Custom domain
`allegra.indonesiaistimewastudio.id` points at the Pages project via a CNAME record in
Hostinger's DNS zone (domain registration, DNS, and email stay on Hostinger — only hosting
moved). See `docs/PROGRESS.md` (2026-06-19 entry) for why this replaced the original
Hostinger-FTP plan.

## Environment

Copy `.env.example` to `.env` and fill in values.

## License / ownership

Project owner: Fardian Fardian — fardian@isi-dps.ac.id. Part of the Indonesia Istimewa Studio ecosystem.
