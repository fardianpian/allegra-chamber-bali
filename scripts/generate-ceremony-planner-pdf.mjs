#!/usr/bin/env node
// Generates the "Ceremony Music Planner" lead-magnet PDFs (EN + ID) into public/downloads/, plus a
// preview image of page 3 per language into src/assets/lead-magnet/ (optimized by astro:assets).
// The PDFs are committed build artifacts: Cloudflare Pages can't run a browser at build time, so
// re-run this locally after editing the copy below and commit the output.
//
// No Playwright devDependency (CLAUDE.md rule 18) — point it at a cached install + a real Chrome:
//   PLAYWRIGHT_MODULE=$(find ~/.npm/_npx -maxdepth 3 -iname playwright | head -1) \
//   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
//   node scripts/generate-ceremony-planner-pdf.mjs
//
// Song ideas must come from src/content/repertoire/ (CLAUDE.md rule 9). Service facts used here
// (no PA, rain plan, custom arrangements included, 24-hour reply) are owner-confirmed in CLAUDE.md.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const root = resolve(import.meta.dirname, '..')
const outDir = join(root, 'public', 'downloads')
const fontDir = pathToFileURL(join(root, 'node_modules', '@fontsource')).href

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')

const content = {
	en: {
		file: 'allegra-ceremony-music-planner.pdf',
		preview: 'ceremony-music-planner-preview.jpg',
		lang: 'en',
		title: 'Ceremony Music Planner',
		subtitle:
			'Plan the music for every moment of your ceremony — the order of entrance, a piece for each moment, and the details your musicians need.',
		howHeading: 'How to use this planner',
		how: [
			['Map your order of entrance', 'Adjust the rows on page 2 to match who walks in, and in what order.'],
			[
				'Choose a piece for each moment',
				'Use the ideas from our repertoire on page 3, write in your own song, or leave "help me choose".',
			],
			[
				'Send it to your musicians',
				'Share the completed planner with your date and venue — we reply within 24 hours.',
			],
		],
		note: 'Custom arrangements of your own songs are included in every Allegra booking.',
		orderHeading: 'Order of entrance',
		orderIntro:
			'A common Western ceremony order. Cross out, reorder, or add rows so it matches your ceremony — the music usually changes just before the bride enters.',
		processional: 'Processional — walking in',
		recessional: 'Recessional — walking out',
		cols: ['#', 'Who walks', 'Music (piece & composer)', 'Notes / cue'],
		procRows: [
			'Officiant and groom take their places',
			'Grandparents, then parents, are seated',
			'Bridesmaids and groomsmen',
			'Maid of honour / best man',
			'Ring bearer and flower girl',
			'The bride — music changes here',
			'',
		],
		recRows: [
			'The newly married couple',
			'Flower girl and ring bearer',
			'Bridal party',
			'Parents, then grandparents',
		],
		momentsHeading: 'A piece for each moment',
		momentCols: ['Moment', 'Ideas from our repertoire', 'Your choice'],
		moments: [
			['Prelude', 'Guests arriving', 'Clair de Lune · Salut d’Amour · River Flows in You'],
			['Bridal party processional', 'Walking in', 'Canon in D · Air on the G String · Yellow'],
			['The bride’s entrance', 'Walking in', 'Bridal Chorus · You Are the Reason · From This Moment On'],
			['Signing of the register', 'Quiet pause', 'Ave Maria · Jesu, Joy of Man’s Desiring · Turning Page'],
			['Recessional', 'Walking out', 'Wedding March (Mendelssohn) · Spring (Vivaldi) · Marry You'],
			['Cocktail hour', 'After the ceremony', 'Fly Me to the Moon · La Vie en Rose · Married Life'],
			['First dance', 'Reception', 'Perfect · A Thousand Years · Can’t Help Falling in Love'],
		],
		detailsHeading: 'Details for your musicians',
		details: [
			'Wedding date and ceremony start time',
			'Venue and ceremony spot (cliffside, beach, garden, villa, chapel, ballroom)',
			'Approximate guest count and aisle length',
			'Formation you are considering: Solo, Duo, Trio, String Quartet, or Large Ensemble',
			'Your venue or planner’s sound provider — we don’t bring our own PA; amplification, when needed, comes from them',
			'A covered backup spot agreed with your venue or planner, in case of rain',
			'Any song you would like arranged',
		],
		footer: 'allegra.indonesiaistimewastudio.id/contact',
		footerNote: 'Live piano & strings for Bali weddings',
		page: 'Page',
	},
	id: {
		file: 'allegra-ceremony-music-planner-id.pdf',
		preview: 'ceremony-music-planner-preview-id.jpg',
		lang: 'id',
		title: 'Ceremony Music Planner',
		subtitle:
			'Rencanakan musik untuk setiap momen upacara Anda — urutan masuk, satu lagu untuk tiap momen, dan detail yang dibutuhkan musisi Anda.',
		howHeading: 'Cara memakai planner ini',
		how: [
			[
				'Petakan urutan masuk',
				'Sesuaikan baris di halaman 2 dengan siapa yang berjalan masuk, dan urutannya.',
			],
			[
				'Pilih lagu untuk tiap momen',
				'Pakai ide dari repertoar kami di halaman 3, tulis lagu Anda sendiri, atau tulis "bantu saya memilih".',
			],
			[
				'Kirimkan ke musisi Anda',
				'Bagikan planner yang sudah diisi beserta tanggal dan venue Anda — kami membalas dalam 24 jam.',
			],
		],
		note: 'Aransemen khusus dari lagu pilihan Anda sudah termasuk di setiap pemesanan Allegra.',
		orderHeading: 'Urutan masuk',
		orderIntro:
			'Urutan yang umum dalam upacara ala Barat. Coret, ubah urutan, atau tambah baris agar sesuai dengan upacara Anda — musik biasanya berganti tepat sebelum mempelai wanita masuk.',
		processional: 'Prosesi — berjalan masuk',
		recessional: 'Resesional — berjalan keluar',
		cols: ['#', 'Siapa yang berjalan', 'Musik (lagu & komposer)', 'Catatan / aba-aba'],
		procRows: [
			'Petugas upacara dan mempelai pria mengambil tempat',
			'Kakek-nenek, lalu orang tua, dipersilakan duduk',
			'Bridesmaids dan groomsmen',
			'Maid of honour / best man',
			'Pembawa cincin dan gadis bunga',
			'Mempelai wanita — musik berganti di sini',
			'',
		],
		recRows: [
			'Pasangan yang baru menikah',
			'Gadis bunga dan pembawa cincin',
			'Rombongan pengantin',
			'Orang tua, lalu kakek-nenek',
		],
		momentsHeading: 'Satu lagu untuk tiap momen',
		momentCols: ['Momen', 'Ide dari repertoar kami', 'Pilihan Anda'],
		moments: [
			['Prelude', 'Tamu berdatangan', 'Clair de Lune · Salut d’Amour · River Flows in You'],
			['Prosesi rombongan pengantin', 'Berjalan masuk', 'Canon in D · Air on the G String · Yellow'],
			[
				'Masuknya mempelai wanita',
				'Berjalan masuk',
				'Bridal Chorus · You Are the Reason · From This Moment On',
			],
			['Penandatanganan dokumen', 'Jeda hening', 'Ave Maria · Jesu, Joy of Man’s Desiring · Turning Page'],
			['Resesional', 'Berjalan keluar', 'Wedding March (Mendelssohn) · Spring (Vivaldi) · Marry You'],
			['Cocktail hour', 'Setelah upacara', 'Fly Me to the Moon · La Vie en Rose · Married Life'],
			['Tarian pertama', 'Resepsi', 'Perfect · A Thousand Years · Can’t Help Falling in Love'],
		],
		detailsHeading: 'Detail untuk musisi Anda',
		details: [
			'Tanggal pernikahan dan jam mulai upacara',
			'Venue dan lokasi upacara (tebing, pantai, taman, vila, kapel, ballroom)',
			'Perkiraan jumlah tamu dan panjang lorong',
			'Formasi yang Anda pertimbangkan: Solo, Duo, Trio, String Quartet, atau Large Ensemble',
			'Penyedia sound dari venue atau planner Anda — kami tidak membawa PA sendiri; amplifikasi, bila diperlukan, disediakan oleh mereka',
			'Tempat cadangan beratap yang disepakati dengan venue atau planner, untuk antisipasi hujan',
			'Lagu apa pun yang ingin Anda aransemen',
		],
		footer: 'allegra.indonesiaistimewastudio.id/id/contact',
		footerNote: 'Piano & gesek live untuk pernikahan di Bali',
		page: 'Halaman',
	},
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function html(c) {
	const footer = (n) => `
		<footer><span>${esc(c.footerNote)} · ${esc(c.footer)}</span><span>${c.page} ${n} / 3</span></footer>`
	const wordmark = `<div class="wordmark"><span class="name">Allegra</span><span class="sub">Chamber Bali</span></div>`
	const blank = '<span class="line"></span>'
	return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><style>
	@font-face{font-family:Cormorant;font-weight:500;src:url(${fontDir}/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2)}
	@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${fontDir}/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2)}
	@font-face{font-family:Inter;font-weight:400;src:url(${fontDir}/inter/files/inter-latin-400-normal.woff2)}
	@font-face{font-family:Inter;font-weight:500;src:url(${fontDir}/inter/files/inter-latin-500-normal.woff2)}
	@page{size:A4;margin:0}
	*{box-sizing:border-box;margin:0;padding:0}
	body{font-family:Inter,sans-serif;color:#1E1C19;background:#F7F3EC;font-size:9.5pt;line-height:1.5}
	.page{width:210mm;height:297mm;padding:18mm 17mm 16mm;position:relative;page-break-after:always;overflow:hidden}
	.page:last-child{page-break-after:auto}
	h1,h2,h3{font-family:Cormorant,serif;font-weight:500;line-height:1.15}
	h1{font-size:40pt;margin-top:34mm}
	h2{font-size:22pt;margin-bottom:3mm}
	h3{font-size:13pt;margin:6mm 0 2mm}
	.eyebrow{font-size:7.5pt;letter-spacing:.18em;text-transform:uppercase;color:#6D665C}
	.rule{width:18mm;height:1px;background:#C2A36B;margin:7mm 0}
	.lead{font-family:Cormorant,serif;font-style:italic;font-size:15pt;color:#3E5247;max-width:140mm}
	.wordmark{display:flex;flex-direction:column}
	.wordmark .name{font-family:Cormorant,serif;font-size:20pt;line-height:1}
	.wordmark .sub{font-size:6.5pt;letter-spacing:.3em;text-transform:uppercase;color:#6D665C;margin-top:1mm}
	ol.steps{list-style:none;margin-top:10mm;display:grid;gap:6mm;max-width:150mm}
	ol.steps li{display:grid;grid-template-columns:12mm 1fr;align-items:start}
	ol.steps .num{font-family:Cormorant,serif;font-size:22pt;color:#C2A36B;line-height:1}
	ol.steps strong{display:block;font-weight:500;font-size:10.5pt;margin-bottom:1mm}
	.note{margin-top:14mm;border-left:1px solid #C2A36B;padding-left:5mm;color:#3E5247;max-width:140mm}
	table{width:100%;border-collapse:collapse;margin-top:2mm}
	th{font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:#6D665C;font-weight:500;text-align:left;padding:2mm 2mm;border-bottom:1px solid #C2A36B}
	td{padding:0 2mm;height:11mm;border-bottom:1px solid rgba(30,28,25,.14);vertical-align:middle}
	td.n{width:8mm;font-family:Cormorant,serif;font-size:12pt;color:#C2A36B}
	td.who{width:62mm}
	.moments td{height:15mm}
	.moments td.m{width:44mm}
	.moments td.m strong{display:block;font-weight:500}
	.moments td.m span{font-size:7.5pt;color:#6D665C}
	.moments td.ideas{width:66mm;font-family:Cormorant,serif;font-style:italic;font-size:11pt;color:#3E5247}
	ul.check{list-style:none;margin-top:1mm;columns:1}
	ul.check li{display:grid;grid-template-columns:6mm 1fr 58mm;align-items:end;gap:2mm;padding:2.2mm 0}
	ul.check .box{width:3.2mm;height:3.2mm;border:1px solid #6D665C;margin-bottom:1mm}
	.line{display:block;border-bottom:1px solid rgba(30,28,25,.3);height:4mm}
	footer{position:absolute;left:17mm;right:17mm;bottom:9mm;display:flex;justify-content:space-between;font-size:7pt;color:#6D665C;letter-spacing:.04em}
	</style></head><body>
	<section class="page">
		${wordmark}
		<h1>${esc(c.title)}</h1>
		<div class="rule"></div>
		<p class="lead">${esc(c.subtitle)}</p>
		<h3 style="margin-top:16mm">${esc(c.howHeading)}</h3>
		<ol class="steps">${c.how
			.map(
				([t, d], i) =>
					`<li><span class="num">${i + 1}</span><div><strong>${esc(t)}</strong>${esc(d)}</div></li>`,
			)
			.join('')}</ol>
		<p class="note">${esc(c.note)}</p>
		${footer(1)}
	</section>
	<section class="page">
		<p class="eyebrow">${esc(c.title)}</p>
		<h2>${esc(c.orderHeading)}</h2>
		<p style="max-width:160mm;color:#3E5247">${esc(c.orderIntro)}</p>
		<h3>${esc(c.processional)}</h3>
		<table><thead><tr>${c.cols.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${c.procRows
			.map((r, i) => `<tr><td class="n">${i + 1}</td><td class="who">${esc(r)}</td><td></td><td></td></tr>`)
			.join('')}</tbody></table>
		<h3>${esc(c.recessional)}</h3>
		<table><thead><tr>${c.cols.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${c.recRows
			.map((r, i) => `<tr><td class="n">${i + 1}</td><td class="who">${esc(r)}</td><td></td><td></td></tr>`)
			.join('')}</tbody></table>
		${footer(2)}
	</section>
	<section class="page">
		<p class="eyebrow">${esc(c.title)}</p>
		<h2>${esc(c.momentsHeading)}</h2>
		<table class="moments"><thead><tr>${c.momentCols.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${c.moments
			.map(
				([m, when, ideas]) =>
					`<tr><td class="m"><strong>${esc(m)}</strong><span>${esc(when)}</span></td><td class="ideas">${esc(ideas)}</td><td></td></tr>`,
			)
			.join('')}</tbody></table>
		<h3 style="margin-top:8mm">${esc(c.detailsHeading)}</h3>
		<ul class="check">${c.details.map((d) => `<li><span class="box"></span><span>${esc(d)}</span>${blank}</li>`).join('')}</ul>
		${footer(3)}
	</section>
	</body></html>`
}

mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined })
try {
	const page = await browser.newPage({ deviceScaleFactor: 2 })
	for (const c of Object.values(content)) {
		const tmp = join(tmpdir(), `ceremony-planner-${c.lang}.html`)
		writeFileSync(tmp, html(c))
		await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' })
		await page.evaluate(() => document.fonts.ready)
		await page.pdf({
			path: join(outDir, c.file),
			format: 'A4',
			printBackground: true,
			preferCSSPageSize: true,
		})
		// Page 3 (moments table) as the landing-page preview, at 2x for sharp text.
		await page.setViewportSize({ width: 794, height: 1123 })
		await page
			.locator('section.page')
			.nth(2)
			.screenshot({
				path: join(root, 'src', 'assets', 'lead-magnet', c.preview),
				type: 'jpeg',
				quality: 82,
			})
		rmSync(tmp)
		console.log(`wrote public/downloads/${c.file} + src/assets/lead-magnet/${c.preview}`)
	}
} finally {
	await browser.close()
}
