import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

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
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		// astro:assets uses sharp; emit AVIF/WebP in components.
	},
})
