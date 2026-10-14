#!/usr/bin/env node
// Copies src/data/booking-terms.json into the TERMS block of integrations/booking/Code.gs, which
// runs on Google Apps Script and cannot read files from this repo. The PDF generator
// (scripts/generate-booking-terms.mjs) and the site's /lock-your-date/ page read the JSON directly.
//
//   node scripts/sync-booking-terms.mjs          # rewrite the block
//   node scripts/sync-booking-terms.mjs --check  # exit 1 if Code.gs is out of date (runs in `npm run lint`)

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import * as prettier from 'prettier'

const jsonUrl = new URL('../src/data/booking-terms.json', import.meta.url)
const gsUrl = new URL('../integrations/booking/Code.gs', import.meta.url)
const terms = JSON.parse(readFileSync(jsonUrl, 'utf8'))
const gs = readFileSync(gsUrl, 'utf8')

const start = gs.indexOf('// <terms>')
const end = gs.indexOf('// </terms>')
if (start < 0 || end < start) throw new Error('TERMS markers not found in integrations/booking/Code.gs')
const headerEnd = gs.indexOf('\n', start) + 1
const block = `const TERMS = ${JSON.stringify(terms, null, '\t')}\n`
const gsPath = fileURLToPath(gsUrl)
// Format the result so `prettier --check .` and this script agree on the block's exact text.
const next = await prettier.format(gs.slice(0, headerEnd) + block + gs.slice(end), {
	...(await prettier.resolveConfig(gsPath)),
	filepath: gsPath,
})

if (process.argv.includes('--check')) {
	if (next !== gs) {
		console.error('integrations/booking/Code.gs TERMS is out of date — run `npm run booking:sync`.')
		process.exit(1)
	}
} else if (next !== gs) {
	writeFileSync(gsUrl, next)
	console.log('updated integrations/booking/Code.gs TERMS block')
}
