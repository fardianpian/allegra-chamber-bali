import fs from 'node:fs'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Slugs with a genuine Indonesian translation (src/content/articles/id/<slug>.md) — these are
// the only /id/journal/<slug> pages that aren't noindexed by src/pages/id/journal/[slug].astro.
const translatedJournalSlugs = fs
	.readdirSync(new URL('./src/content/articles/id/', import.meta.url))
	.filter((f) => f.endsWith('.md'))
	.map((f) => f.replace(/\.md$/, ''))

// https://astro.build/config
export default defineConfig({
	// CRITICAL: static output for Hostinger shared hosting (no Node SSR/serverless).
	output: 'static',
	site: 'https://allegra.indonesiaistimewastudio.id',
	trailingSlash: 'ignore',
	build: {
		// Emit /page/index.html so clean URLs work behind LiteSpeed/Apache.
		format: 'directory',
	},
	integrations: [
		mdx(),
		sitemap({
			// Bilingual EN (default) + ID with hreflang.
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', id: 'id' },
			},
			// /share-your-story and /thank-you-testimonial are hidden testimonial-request pages
			// sent directly to clients post-wedding — noindex and intentionally unlisted.
			// /id/journal/<slug> is only indexable once a genuine translation exists (see
			// translatedJournalSlugs above + src/pages/id/journal/[slug].astro's noindex logic) —
			// keep the sitemap filter and the page's own noindex meta in sync.
			filter: (page) => {
				if (page.includes('/share-your-story') || page.includes('/thank-you-testimonial')) return false
				const idJournalSlug = page.match(/\/id\/journal\/([^/]+)\/?$/)?.[1]
				if (idJournalSlug) return translatedJournalSlugs.includes(idJournalSlug)
				return true
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		// astro:assets uses sharp; emit AVIF/WebP in components.
	},
})
