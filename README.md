# Allegra Chamber Bali — Website

Live chamber & string ensemble for weddings in Bali. Static website built with **Astro** (SSG), deployed to **Hostinger** at the sub-domain `allegra.indonesiaistimewastudio.id`. Sub-brand of Indonesia Istimewa Studio.

> **This repository is a STARTER KIT prepared for implementation by Claude Code.**
> Read [`CLAUDE.md`](./CLAUDE.md) first, then [`docs/BRIEF.md`](./docs/BRIEF.md) for the full specification.
> Files marked `TODO` are placeholders; replace them as you build.

## Tech

- Astro 5 (`output: 'static'`) + TypeScript
- TailwindCSS v4 (design tokens in `src/styles/global.css`)
- MDX content collections (repertoire, packages, testimonials, venues)
- Forms: Web3Forms/Formspree + WhatsApp deep-link (primary CTA)
- Deploy: GitHub Actions → build → FTP upload `dist/` to Hostinger

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
- `public/` — static assets, `.htaccess`, `robots.txt`, audio, images, press kit
- `.github/workflows/deploy.yml` — CI build + FTP deploy to Hostinger

## Deployment (Hostinger)

1. Create the sub-domain `allegra` in hPanel and enable free SSL.
2. Add FTP credentials to GitHub Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
3. Add form key as `PUBLIC_WEB3FORMS_KEY` (build env / secret).
4. Push to `main` → GitHub Actions builds and uploads `dist/` to the sub-domain document root.
   Full steps in `docs/BRIEF.md` §12.

## Environment

Copy `.env.example` to `.env` and fill in values.

## License / ownership

Project owner: Fardian Fardian — fardian@isi-dps.ac.id. Part of the Indonesia Istimewa Studio ecosystem.
