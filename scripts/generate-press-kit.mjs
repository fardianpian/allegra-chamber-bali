// Generates the downloadable /press kit into public/press/:
//   - logo pack: the site wordmark (Logo.astro) as outlined SVG + transparent PNG, charcoal and
//     ivory, zipped together
//   - press photos: hi-res JPEGs of owner-supplied camera originals, auto-oriented and with all
//     metadata (EXIF/GPS) stripped, plus a zip of all of them
//
// Run from the repo root: node scripts/generate-press-kit.mjs
// Re-run after changing the wordmark, palette, or the PHOTOS list, then commit public/press/.
// Uses the `zip` CLI (preinstalled on macOS).
import { create } from 'fontkitten'
import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const OUT = 'public/press'
const PHOTO_DIR = path.join(OUT, 'photos')

// Camera originals only — the relit/edited PNGs in src/assets/gallery are deliberately left out
// so press never receives a retouched image presented as an event photo.
const PHOTOS = [
	['pianist-garden-daytime-white-piano-bali.jpg', 'allegra-chamber-bali-pianist-garden-ceremony.jpg'],
	['string-ensemble-musicians-wedding-bali.jpg', 'allegra-chamber-bali-string-ensemble.jpg'],
	['piano-garden-reception-night.jpg', 'allegra-chamber-bali-piano-garden-reception.jpg'],
	['string-quartet-cello-garden-ceremony-bali.jpg', 'allegra-chamber-bali-string-quartet-garden.jpg'],
]
const PHOTO_MAX_EDGE = 3000

// Palette from CLAUDE.md / global.css.
const INK = '#1E1C19'
const TAUPE = '#6D665C'
const IVORY = '#F7F3EC'

// Logo.astro `lg` lockup, scaled x10: wordmark 36px, subtitle 14px uppercase with 0.2em tracking,
// 8px gap, leading-none. Cormorant Garamond 500 is the weight the site actually renders.
const font = create(
	readFileSync('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff'),
)
const WORD_SIZE = 360
const SUB_SIZE = 140
const SUB_TRACKING = 0.2 * SUB_SIZE
const GAP = 80
const PAD = 40

function textPath(text, size, x, baseline, tracking = 0) {
	const scale = size / font.unitsPerEm
	let cursor = x
	const parts = []
	for (const ch of text) {
		const glyph = font.glyphForCodePoint(ch.codePointAt(0))
		const d = glyph.path.toSVG()
		if (d) {
			parts.push(
				`<path transform="translate(${cursor.toFixed(2)} ${baseline.toFixed(2)}) scale(${scale} ${-scale})" d="${d}"/>`,
			)
		}
		cursor += glyph.advanceWidth * scale + tracking
	}
	return { svg: parts.join(''), width: cursor - x - tracking }
}

// leading-none: each line box is exactly font-size tall, glyphs centred on the content area.
function baselineFor(top, size) {
	const content = ((font.ascent - font.descent) / font.unitsPerEm) * size
	return top + (size - content) / 2 + (font.ascent / font.unitsPerEm) * size
}

function buildLogoSvg(wordColor, subColor, subOpacity = 1) {
	const word = textPath('Allegra', WORD_SIZE, PAD, PAD + baselineFor(0, WORD_SIZE))
	const sub = textPath(
		'CHAMBER BALI',
		SUB_SIZE,
		PAD,
		PAD + baselineFor(WORD_SIZE + GAP, SUB_SIZE),
		SUB_TRACKING,
	)
	const width = Math.ceil(Math.max(word.width, sub.width) + PAD * 2)
	const height = Math.ceil(WORD_SIZE + GAP + SUB_SIZE + PAD * 2)
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Allegra Chamber Bali">
<g fill="${wordColor}">${word.svg}</g>
<g fill="${subColor}" fill-opacity="${subOpacity}">${sub.svg}</g>
</svg>
`
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(PHOTO_DIR, { recursive: true })

const logos = [
	['allegra-chamber-bali-logo-charcoal', buildLogoSvg(INK, TAUPE)],
	['allegra-chamber-bali-logo-ivory', buildLogoSvg(IVORY, IVORY, 0.6)],
]
const logoFiles = []
for (const [name, svg] of logos) {
	writeFileSync(path.join(OUT, `${name}.svg`), svg)
	await sharp(Buffer.from(svg), { density: 300 })
		.resize({ width: 3000 })
		.png()
		.toFile(path.join(OUT, `${name}.png`))
	logoFiles.push(`${name}.svg`, `${name}.png`)
}
execFileSync('zip', ['-qX', 'allegra-chamber-bali-logo-pack.zip', ...logoFiles], { cwd: OUT })

const photoFiles = []
for (const [src, out] of PHOTOS) {
	// sharp drops all metadata by default; .rotate() applies EXIF orientation first (CLAUDE.md #15).
	const info = await sharp(path.join('src/assets/gallery', src))
		.rotate()
		.resize({ width: PHOTO_MAX_EDGE, height: PHOTO_MAX_EDGE, fit: 'inside', withoutEnlargement: true })
		.jpeg({ quality: 85, mozjpeg: true })
		.toFile(path.join(PHOTO_DIR, out))
	photoFiles.push(`photos/${out}`)
	console.log(`${out}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} kB`)
}
execFileSync('zip', ['-qX', 'allegra-chamber-bali-press-photos.zip', ...photoFiles], { cwd: OUT })

console.log(`Logo pack + ${PHOTOS.length} photos written to ${OUT}/`)
