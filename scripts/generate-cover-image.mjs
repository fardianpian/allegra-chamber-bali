#!/usr/bin/env node
// Generates an article cover/OG image via Cloudflare Workers AI
// (@cf/stabilityai/stable-diffusion-xl-base-1.0 — native model, $0.00/step, no
// prepaid Unified Billing credits needed, unlike the BFL "partner" flux-2-* models)
// and saves it to public/images/og-<slug>.jpg at the standard 1200x630 OG ratio.
//
// Usage:
//   node --env-file=.env scripts/generate-cover-image.mjs <slug> "<prompt>"
//
// Requires CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN (Workers AI - Read
// permission is enough to run inference) in .env — see .env.example.

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const [slug, userPrompt] = process.argv.slice(2)

if (!slug || !userPrompt) {
	console.error('Usage: node --env-file=.env scripts/generate-cover-image.mjs <slug> "<prompt>"')
	process.exit(1)
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const apiToken = process.env.CLOUDFLARE_API_TOKEN

if (!accountId || !apiToken) {
	console.error('Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN — see .env.example.')
	process.exit(1)
}

// Brand style suffix (from CLAUDE.md § Aesthetic) so every generated cover reads as
// one cohesive editorial series, not photorealistic footage that could be mistaken
// for a real Allegra event photo.
const STYLE_SUFFIX =
	', hand-painted oil painting illustration, visible oil brushstrokes and canvas texture, ' +
	'elegant editorial art style like a wedding invitation illustration, warm ivory background, ' +
	'champagne gold and deep sage accents, refined and airy, minimal composition'

// SDXL supports a real negative_prompt, which is a much more reliable lever for
// steering away from photorealism than positive-only prompting (flux-1-schnell has
// no negative_prompt and drifted photorealistic across otherwise-similar prompts).
const NEGATIVE_PROMPT =
	'photograph, photo, photorealistic, realistic, 3D render, CGI, hyperrealistic, camera, ' +
	'text, watermark, signature'

const model = '@cf/stabilityai/stable-diffusion-xl-base-1.0'
const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`

console.log(`Generating cover for "${slug}"...`)

const res = await fetch(endpoint, {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${apiToken}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		prompt: `${userPrompt}${STYLE_SUFFIX}`,
		negative_prompt: NEGATIVE_PROMPT,
		num_steps: 20,
		guidance: 8,
	}),
})

if (!res.ok) {
	console.error(`Workers AI request failed: ${res.status} ${res.statusText}`)
	console.error(await res.text())
	process.exit(1)
}

// This model returns the raw image bytes directly (image/* content-type), unlike
// flux-1-schnell which wraps a base64 string in a JSON envelope.
const contentType = res.headers.get('content-type') ?? ''
let raw
if (contentType.startsWith('image/')) {
	raw = Buffer.from(await res.arrayBuffer())
} else {
	const payload = await res.json()
	const image = payload.result?.image
	if (!image) {
		console.error('Workers AI returned no image:', JSON.stringify(payload))
		process.exit(1)
	}
	raw = image.startsWith('http')
		? Buffer.from(await (await fetch(image)).arrayBuffer())
		: Buffer.from(image, 'base64')
}

const outDir = path.resolve('public/images')
await mkdir(outDir, { recursive: true })
const outPath = path.join(outDir, `og-${slug}.jpg`)

// Resize/crop as a safety net in case the model doesn't return exactly 1200x630.
await sharp(raw).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 75 }).toFile(outPath)

console.log(`Saved ${outPath}`)
console.log(`Add to article frontmatter: ogImage: '/images/og-${slug}.jpg'`)
