import { defineCollection, z } from 'astro:content'

// Repertoire: songs with optional short audio sample, grouped by moment & genre.
const repertoire = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		composer: z.string().optional(),
		moment: z.enum(['processional', 'signing', 'recessional', 'cocktail', 'reception']),
		genre: z.enum(['classical', 'pop', 'film', 'indonesian']),
		audioSample: z.string().optional(), // /audio/xxx.mp3
		featured: z.boolean().default(false),
		order: z.number().default(0),
	}),
})

// Packages: the 5 formations.
const packages = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			formation: z.enum(['solo', 'duo', 'trio', 'quartet', 'large-ensemble']),
			summary: z.string(),
			idealFor: z.array(z.string()),
			setLength: z.string().optional(), // e.g. "2 x 45 min"
			image: image().optional(), // real event photo, once available
			imageAlt: z.string().optional(),
			order: z.number().default(0),
		}),
})

// Testimonials — use ONLY real, permission-cleared quotes.
const testimonials = defineCollection({
	type: 'content',
	schema: z.object({
		couple: z.string(),
		venue: z.string().optional(),
		date: z.string().optional(),
		photo: z.string().optional(),
		quote: z.string(),
		order: z.number().default(0),
	}),
})

// Venues performed at — used for trust strip & gallery filter.
const venues = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		type: z.enum(['cliffside', 'beach', 'garden', 'chapel', 'ballroom']),
		area: z.string().optional(), // Uluwatu, Ubud, Nusa Dua, Canggu...
	}),
})

// Journal articles — SEO/GEO/AEO content. Pillars defined in
// .claude/article-seo-geo-aeo-guidelines.md; pick one per article, don't invent new pillars
// ad hoc. EN is the primary write target (ID search demand is near-zero per
// docs/SEO-STRATEGY.md — the ID translation's SEO value is hreflang/UX completeness and trust
// for Indonesian-speaking couples/families, not direct ID-locale search traffic). A genuine
// Indonesian translation lives at `id/<slug>.md` (same schema, nested folder, so its `slug` is
// `id/<slug>`) — `src/pages/id/journal/[slug].astro` renders it (indexable) when present and
// falls back to the EN body (noindexed) when it isn't. Add one for every new article as part of
// publishing it, not as a later task.
const articles = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(), // <title> tag ONLY — includes the " — Allegra Chamber Bali" suffix
		heading: z.string(), // on-page H1 / breadcrumb / card heading — no brand suffix (audit 2026-06-21: don't reuse `title` here, it doubled the brand name in <h1>)
		description: z.string(), // meta description — 150-160 chars, hard limit (audit 2026-06-21 found a 189-char description)
		excerpt: z.string(), // short teaser for listing cards
		pillar: z.enum(['planning', 'piano-repertoire', 'bali-venues', 'for-planners']),
		targetKeyword: z.string().optional(), // primary keyword from SEO-STRATEGY.md, for traceability
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		ogImage: z.string().optional(), // path under /public/images/, same convention as other pages
		draft: z.boolean().default(false),
		// AEO: short, direct Q&A pairs rendered on-page + as FAQPage JSON-LD per article.
		faq: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
	}),
})

export const collections = { repertoire, packages, testimonials, venues, articles }
