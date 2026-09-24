#!/usr/bin/env node
// Finds every published /journal article (EN, src/content/articles/*.md) that has no
// `ogImage` yet, generates its cover via scripts/generate-cover-image.mjs, and wires
// `ogImage` into both the EN frontmatter and its id/<slug>.md translation.
//
// Exists because the journal routine runs as a claude.ai cloud session with no safe
// place to store CLOUDFLARE_ACCOUNT_ID/CLOUDFLARE_API_TOKEN, so it kept shipping
// articles without a cover. .github/workflows/cover-image.yml runs this script with
// the credentials stored as GitHub Actions secrets instead.
//
// Cover prompt source, in order: the item's "cover image prompt" line in
// docs/JOURNAL-BACKLOG.md, else a generic prompt built from the article heading.
//
// Usage:
//   node scripts/backfill-cover-images.mjs            # generate + wire
//   node scripts/backfill-cover-images.mjs --dry-run  # only list what's missing

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const dryRun = process.argv.includes('--dry-run')
const articlesDir = path.resolve('src/content/articles')
const backlog = existsSync('docs/JOURNAL-BACKLOG.md') ? readFileSync('docs/JOURNAL-BACKLOG.md', 'utf8') : ''

function frontmatter(source) {
	const match = source.match(/^---\n([\s\S]*?)\n---/)
	return match ? match[1] : ''
}

function field(fm, name) {
	const match = fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))
	return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : undefined
}

function promptFromBacklog(slug) {
	const blocks = backlog.split(/^### /m)
	const block = blocks.find((b) => new RegExp(`^Item \\d+ — ${slug} \\(`).test(b))
	const match = block?.match(/\*\*cover image prompt:\*\*\s*"([^"]+)"/)
	return match ? match[1].replace(/\s+/g, ' ').trim() : undefined
}

// Inserts `ogImage` right after `pubDate` (the convention in every existing article),
// or at the end of the frontmatter if `pubDate` is somehow missing.
function wireOgImage(file, ogImage) {
	if (!existsSync(file)) return false
	const source = readFileSync(file, 'utf8')
	if (/^ogImage:/m.test(frontmatter(source))) return false
	const line = `ogImage: '${ogImage}'`
	const updated = /^pubDate:.*$/m.test(source)
		? source.replace(/^(pubDate:.*)$/m, `$1\n${line}`)
		: source.replace(/^(---\n[\s\S]*?)\n---/, `$1\n${line}\n---`)
	writeFileSync(file, updated)
	return true
}

const missing = readdirSync(articlesDir)
	.filter((name) => name.endsWith('.md'))
	.map((name) => {
		const file = path.join(articlesDir, name)
		const fm = frontmatter(readFileSync(file, 'utf8'))
		return { slug: name.replace(/\.md$/, ''), file, fm }
	})
	.filter(({ fm }) => !field(fm, 'ogImage') && field(fm, 'draft') !== 'true')

if (missing.length === 0) {
	console.log('All journal articles already have an ogImage — nothing to do.')
	process.exit(0)
}

let failures = 0
for (const { slug, file, fm } of missing) {
	const ogImage = `/images/og-${slug}.jpg`
	const imagePath = path.resolve('public', ogImage.slice(1))
	const prompt =
		promptFromBacklog(slug) ??
		`${field(fm, 'heading') ?? slug.replace(/-/g, ' ')}, a single classical string instrument or piano still-life, soft natural light`

	console.log(`\n[${slug}] missing ogImage`)
	console.log(`  prompt: ${prompt}`)
	if (dryRun) continue

	if (existsSync(imagePath)) {
		console.log(`  ${ogImage} already exists on disk — wiring it without regenerating.`)
	} else {
		try {
			execFileSync(process.execPath, ['scripts/generate-cover-image.mjs', slug, prompt], {
				stdio: 'inherit',
			})
		} catch {
			console.error(`  generation failed for ${slug} — frontmatter left untouched.`)
			failures++
			continue
		}
	}

	const idFile = path.join(articlesDir, 'id', `${slug}.md`)
	for (const target of [file, idFile]) {
		if (wireOgImage(target, ogImage)) console.log(`  wired ogImage into ${path.relative('.', target)}`)
	}
}

process.exit(failures > 0 ? 1 : 0)
