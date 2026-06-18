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

export const collections = { repertoire, packages, testimonials, venues }
