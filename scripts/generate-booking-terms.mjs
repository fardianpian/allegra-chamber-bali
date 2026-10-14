#!/usr/bin/env node
// Generates one couple's "Booking Terms & Conditions" PDF — the single file sent on WhatsApp once
// the couple has confirmed their names and the date is recorded. It carries their booking details,
// the payment schedule with real calendar dates, how to pay, and what happens if plans change.
//
// Usage:
//   cp scripts/booking-terms.example.json private/bookings/<ref>.json   # fill in, one per couple
//   PLAYWRIGHT_MODULE=$(find ~/.npm/_npx -maxdepth 3 -iname playwright | head -1) \
//   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
//   node scripts/generate-booking-terms.mjs private/bookings/<ref>.json
//
// Output: private/booking-terms/<reference>-<lang>.pdf. `private/` is gitignored on purpose —
// couples' names, dates and bank details must never be committed (the repo deploys publicly).
//
// The policy values in TERMS come from docs/PAYMENT-TERMS-RESEARCH-2026-10.md (draft, owner
// direction 2026-10-14 to use them). Change them here, not in the copy, so every future document
// stays consistent. Without bank details the PDF is stamped "DRAFT — not for sending".

import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const TERMS = {
	version: '2026-10',
	depositPct: 30,
	balanceDaysBefore: 30, // balance due date = wedding − 30 days
	holdDays: 7, // date held this long after names are recorded, while the deposit is paid
	coolingOffHours: 48,
	coolingOffMinDays: 60, // cooling-off applies only if the wedding is more than this many days away
	freeDateChangeDaysBefore: 60,
	creditMonths: 12, // credit valid until this many months after the original wedding date
	lateGraceDays: 7,
	refundWorkingDays: 7,
	// Cancellation schedule. `untilDaysBefore`: the row applies while the wedding is at least this
	// many days away. `keepPct` of the total, or 'deposit'.
	tiers: [
		{ untilDaysBefore: 91, keep: 'deposit', credit: true },
		{ untilDaysBefore: 31, keep: 'deposit' },
		{ untilDaysBefore: 15, keepPct: 50 },
		{ untilDaysBefore: 0, keepPct: 100 },
	],
}

const root = resolve(import.meta.dirname, '..')
const fontDir = pathToFileURL(join(root, 'node_modules', '@fontsource')).href
const esc = (s) =>
	String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch])

// ---------- input ----------
const inputPath = process.argv[2]
if (!inputPath) {
	console.error('usage: node scripts/generate-booking-terms.mjs <booking.json>')
	process.exit(1)
}
const b = JSON.parse(readFileSync(resolve(inputPath), 'utf8'))
for (const key of ['couple', 'weddingDate', 'venue', 'formation', 'musicians', 'items', 'recordedDate']) {
	if (b[key] === undefined || b[key] === '') throw new Error(`booking file is missing "${key}"`)
}
const langs = b.lang ? [b.lang] : ['en', 'id']
// Free-text fields may be a plain string or { en, id } for a translated label.
const tr = (v, lang) => (typeof v === 'string' ? v : (v[lang] ?? v.en))

// ---------- dates & money (all dates are calendar days in UTC, no time-of-day) ----------
const day = (iso) => new Date(`${iso}T00:00:00Z`)
const addDays = (d, n) => new Date(d.getTime() + n * 86400000)
const addMonths = (d, n) => {
	const r = new Date(d)
	r.setUTCMonth(r.getUTCMonth() + n)
	return r
}
const daysBetween = (a, b2) => Math.round((b2 - a) / 86400000)
const roundRp = (n) => Math.round(n / 1000) * 1000

const wedding = day(b.weddingDate)
const recorded = day(b.recordedDate)
const leadDays = daysBetween(recorded, wedding)
if (leadDays < 1) throw new Error('recordedDate must be before weddingDate')

const total = b.items.reduce((sum, it) => sum + it.price, 0)
const shortNotice = leadDays <= TERMS.balanceDaysBefore
const deposit = shortNotice ? total : roundRp((total * TERMS.depositPct) / 100)
const balance = total - deposit
const holdUntil = addDays(recorded, Math.min(TERMS.holdDays, leadDays - 1))
const balanceDue = addDays(wedding, -TERMS.balanceDaysBefore)
const lateCutoff = addDays(balanceDue, TERMS.lateGraceDays)
const dateChangeBy = addDays(wedding, -TERMS.freeDateChangeDaysBefore)
const creditUntil = addMonths(wedding, TERMS.creditMonths)
const coolingOff = leadDays > TERMS.coolingOffMinDays

// Cancellation rows with real date ranges; rows that ended before the date was recorded are dropped.
const rows = TERMS.tiers
	.map((t, i) => {
		const from = i === 0 ? null : addDays(wedding, -TERMS.tiers[i - 1].untilDaysBefore + 1)
		const to = t.untilDaysBefore === 0 ? null : addDays(wedding, -t.untilDaysBefore)
		const keep = t.keep === 'deposit' ? deposit : roundRp((total * t.keepPct) / 100)
		return { ...t, from, to, keep }
	})
	.filter((r) => !r.to || r.to >= recorded)

const initials = b.couple.map((n) => n.trim()[0]?.toUpperCase() ?? '').join('')
const reference = b.reference || `ACB-${b.weddingDate.replaceAll('-', '')}-${initials}`
const bank = b.bank ?? {}
const isDraft = !bank.bankName || !bank.accountName || !bank.accountNumber

// ---------- copy ----------
const fmt = (lang) => {
	const locale = lang === 'id' ? 'id-ID' : 'en-GB'
	const long = new Intl.DateTimeFormat(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	})
	const short = new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	})
	const num = new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US')
	return { long: (d) => long.format(d), date: (d) => short.format(d), rp: (n) => `Rp ${num.format(n)}` }
}

function copy(lang) {
	const f = fmt(lang)
	const names = b.couple.join(' & ')
	if (lang === 'id') {
		return {
			lang,
			title: 'Ketentuan Booking',
			preparedFor: 'Disiapkan untuk',
			draft: 'DRAF — belum untuk dikirim (detail rekening belum diisi)',
			meta: [
				['Pasangan', names],
				['Tanggal pernikahan', f.long(wedding)],
				['Venue', tr(b.venue, lang)],
				['Referensi booking', reference],
			],
			intro: `Terima kasih, ${names}. Tanggal Anda sudah kami catat atas nama Anda pada ${f.date(recorded)}. Dokumen ini berisi semua yang perlu Anda ketahui sebelum membayar — ditulis sesederhana mungkin. Jika ada yang kurang jelas, tanyakan kepada kami sebelum membayar.`,
			s1: 'Booking Anda',
			formationLabel: 'Formasi',
			formation: `${tr(b.formation, lang)} · ${b.musicians} musisi`,
			totalLabel: 'Total',
			included: [
				'Aransemen khusus lagu pilihan Anda sudah termasuk, tanpa biaya tambahan.',
				'Sound system tidak termasuk; amplifikasi, bila diperlukan, disediakan oleh penyedia sound venue atau planner Anda. Tech rider kami kirim lebih awal.',
				'Overtime di luar durasi yang dipesan dapat diminta, tergantung ketersediaan musisi, dan dikonfirmasi serta ditagih terpisah.',
			],
			s2: 'Jadwal pembayaran',
			hold: `Tanggal Anda kami tahan hingga ${f.long(holdUntil)} sementara Anda membaca ketentuan ini. Tanggal terkonfirmasi setelah deposit kami terima.`,
			payRows: shortNotice
				? [[`Pembayaran penuh`, `paling lambat ${f.date(holdUntil)}`, f.rp(total)]]
				: [
						[`Deposit booking (${TERMS.depositPct}%)`, `paling lambat ${f.date(holdUntil)}`, f.rp(deposit)],
						[`Pelunasan (${100 - TERMS.depositPct}%)`, `paling lambat ${f.date(balanceDue)}`, f.rp(balance)],
					],
			payNote: shortNotice
				? 'Karena pernikahan Anda tinggal kurang dari 30 hari, pembayaran dilakukan sekaligus.'
				: `Deposit mengunci tanggal Anda dan memulai pengerjaan aransemen lagu Anda. Kami mengirim pengingat sekitar dua minggu sebelum pelunasan jatuh tempo.`,
			s3: 'Cara membayar',
			currency: 'Semua nominal dalam Rupiah (IDR).',
			bankLabels: ['Bank', 'Nama rekening', 'Nomor rekening', 'Kode SWIFT', 'Berita transfer'],
			howTo: [
				['Dari Indonesia', 'Transfer bank biasa ke rekening di atas.'],
				[
					'Dari luar negeri — Wise',
					'Pilih kirim ke rekening bank Indonesia dalam IDR dan masukkan detail di atas; kami tidak memerlukan akun Wise. Pilih opsi Anda menanggung biaya transfer agar nominal penuh yang sampai.',
				],
				[
					'Dari luar negeri — transfer bank (SWIFT)',
					'Minta bank Anda mengirim dalam IDR dengan biaya "OUR", agar biaya bank perantara tidak memotong nominal.',
				],
			],
			receipt: 'Kami mengirim kuitansi lewat WhatsApp begitu setiap pembayaran masuk.',
			safety:
				'Kami tidak pernah meminta data kartu, dan tidak pernah mengganti detail rekening lewat pesan. Jika Anda menerima detail pembayaran yang berbeda, hubungi kami dulu sebelum membayar.',
			s4: 'Jika rencana Anda berubah',
			coolingOff: coolingOff
				? `Berubah pikiran? Dalam ${TERMS.coolingOffHours} jam setelah membayar deposit, kami kembalikan deposit penuh (dikurangi biaya transfer bank, bila ada).`
				: null,
			cancelHead: ['Jika Anda membatalkan', 'Yang kami tahan'],
			rowWhen: (r) =>
				!r.from
					? `Sampai ${f.date(r.to)}`
					: !r.to
						? `Mulai ${f.date(r.from)}`
						: `${f.date(r.from)} – ${f.date(r.to)}`,
			rowKeep: (r) =>
				r.keepPct === 100
					? `Total penuh (${f.rp(r.keep)})`
					: r.keep === deposit && !r.keepPct
						? `Deposit (${f.rp(r.keep)})${r.credit ? ` — atau seluruh deposit menjadi kredit untuk tanggal baru sebelum ${f.date(creditUntil)}` : ''}`
						: `${r.keepPct}% dari total (${f.rp(r.keep)})`,
			cancelNote:
				'Kelebihan dari jumlah yang sudah Anda bayar kami kembalikan. Jika tanggal Anda berhasil kami isi dengan pasangan lain, kami hanya menahan biaya yang sudah benar-benar keluar dan mengembalikan sisanya. Mengurangi formasi atau sesi diperlakukan sebagai pembatalan sebagian dengan jadwal yang sama.',
			dateChange: `Pindah tanggal: satu kali tanpa biaya bila diminta paling lambat ${f.date(dateChangeBy)} dan tanggal baru tersedia; deposit pindah utuh.`,
			late: `Bila pelunasan belum kami terima hingga ${f.date(lateCutoff)}, kami akan menghubungi Anda; setelah itu tanggal dapat kami lepas dan deposit ditahan sebagai biaya pembatalan.`,
			s5: 'Jika kami tidak dapat tampil',
			usCancel: `Bila kami membatalkan karena sebab di pihak kami, seluruh pembayaran Anda kami kembalikan dalam ${TERMS.refundWorkingDays} hari kerja.`,
			sub: 'Bila satu musisi berhalangan, kami menghadirkan pengganti yang setara dan memberi tahu Anda. Bila formasi akhirnya berkurang, selisih harganya kami kembalikan.',
			s6: 'Cuaca & keadaan di luar kendali',
			rain: 'Hujan: musisi dan instrumen pindah ke area teduh yang disepakati lebih awal dengan planner atau venue Anda — keselamatan musisi dan instrumen diutamakan. Hujan bukan alasan pembatalan.',
			fm: `Keadaan memaksa (bencana alam, penutupan resmi bandara atau akses, larangan acara oleh pemerintah, epidemi, kerusuhan): seluruh pembayaran menjadi kredit penuh untuk tanggal baru hingga ${f.date(creditUntil)}, tanpa biaya. Bila tidak ada tanggal yang cocok, kami kembalikan pembayaran dikurangi biaya yang sudah keluar dan tidak dapat ditarik kembali.`,
			s7: 'Persetujuan',
			agree:
				'Balas di WhatsApp: "Kami setuju dengan ketentuan booking" — atau tanda tangani di bawah — lalu transfer deposit.',
			signCouple: 'Pasangan',
			signUs: 'Allegra Chamber Bali',
			signDate: 'Tanggal',
			footer: `Ketentuan versi ${TERMS.version} · ${reference}`,
		}
	}
	return {
		lang,
		title: 'Booking Terms & Conditions',
		preparedFor: 'Prepared for',
		draft: 'DRAFT — not for sending (bank details not filled in)',
		meta: [
			['Couple', names],
			['Wedding date', f.long(wedding)],
			['Venue', tr(b.venue, lang)],
			['Booking reference', reference],
		],
		intro: `Thank you, ${names}. Your date was recorded under your names on ${f.date(recorded)}. Everything you need to know before paying is on these pages, in plain language. If anything is unclear, ask us before you pay.`,
		s1: 'Your booking',
		formationLabel: 'Formation',
		formation: `${tr(b.formation, lang)} · ${b.musicians} musicians`,
		totalLabel: 'Total',
		included: [
			'Custom arrangements of your own songs are included, never a separate charge.',
			'Sound system not included; amplification, when needed, comes from your venue’s or planner’s sound provider. We share our tech rider in advance.',
			'Overtime beyond your booked coverage is available on request, subject to musician availability, and is confirmed and billed separately.',
		],
		s2: 'Payment schedule',
		hold: `Your date is held until ${f.long(holdUntil)} while you read these terms. It is confirmed once your deposit arrives.`,
		payRows: shortNotice
			? [['Full payment', `by ${f.date(holdUntil)}`, f.rp(total)]]
			: [
					[`Booking deposit (${TERMS.depositPct}%)`, `by ${f.date(holdUntil)}`, f.rp(deposit)],
					[`Balance (${100 - TERMS.depositPct}%)`, `by ${f.date(balanceDue)}`, f.rp(balance)],
				],
		payNote: shortNotice
			? 'As your wedding is less than 30 days away, payment is made in full.'
			: 'Your deposit reserves your date and begins the arrangement of your songs. We send a gentle reminder about two weeks before the balance is due.',
		s3: 'How to pay',
		currency: 'All amounts are in Indonesian Rupiah (IDR).',
		bankLabels: ['Bank', 'Account name', 'Account number', 'SWIFT code', 'Payment reference'],
		howTo: [
			['From Indonesia', 'A regular bank transfer to the account above.'],
			[
				'From abroad — Wise',
				'Choose to send to an Indonesian bank account in IDR and enter the details above; we don’t need a Wise account. Choose to cover the transfer fees so the full amount arrives.',
			],
			[
				'From abroad — bank transfer (SWIFT)',
				'Ask your bank to send IDR with “OUR” charges, so intermediary bank fees aren’t deducted from the amount.',
			],
		],
		receipt: 'We send a receipt on WhatsApp as soon as each payment arrives.',
		safety:
			'We never ask for card details, and we never change our bank details by message. If you ever receive different payment details, contact us before paying.',
		s4: 'If your plans change',
		coolingOff: coolingOff
			? `Change of heart? Within ${TERMS.coolingOffHours} hours of paying your deposit, we refund it in full (less any bank transfer fees).`
			: null,
		cancelHead: ['If you cancel', 'What we keep'],
		rowWhen: (r) =>
			!r.from
				? `Up to ${f.date(r.to)}`
				: !r.to
					? `From ${f.date(r.from)}`
					: `${f.date(r.from)} – ${f.date(r.to)}`,
		rowKeep: (r) =>
			r.keepPct === 100
				? `The full total (${f.rp(r.keep)})`
				: r.keep === deposit && !r.keepPct
					? `The deposit (${f.rp(r.keep)})${r.credit ? ` — or the full deposit kept as credit for a new date before ${f.date(creditUntil)}` : ''}`
					: `${r.keepPct}% of the total (${f.rp(r.keep)})`,
		cancelNote:
			'Anything you have paid above this is refunded. If we are able to book your date with another couple, we keep only the costs already incurred and refund the rest. Reducing your formation or sessions is treated as a partial cancellation on the same schedule.',
		dateChange: `Changing your date: once, free of charge, if requested by ${f.date(dateChangeBy)} and the new date is available; your deposit moves in full.`,
		late: `If the balance hasn’t arrived by ${f.date(lateCutoff)}, we’ll reach out; after that we may release your date, and the deposit is kept as the cancellation charge.`,
		s5: 'If we cannot perform',
		usCancel: `If we cancel for any reason on our side, everything you have paid is refunded within ${TERMS.refundWorkingDays} working days.`,
		sub: 'If one musician is unwell, we bring an equivalent replacement and let you know. If the formation ends up smaller, the price difference is refunded.',
		s6: 'Weather & events beyond anyone’s control',
		rain: 'Rain: musicians and instruments move to a covered spot agreed in advance with your planner or venue — the safety of musicians and instruments comes first. Rain is not a reason to cancel.',
		fm: `Force majeure (natural disaster, official closure of the airport or access, a government restriction on events, epidemic, civil unrest): everything you have paid becomes full credit for a new date until ${f.date(creditUntil)}, at no charge. If no suitable date works, we refund your payments less costs already incurred that cannot be recovered.`,
		s7: 'Agreement',
		agree: 'Reply on WhatsApp: “We agree to the booking terms” — or sign below — then transfer your deposit.',
		signCouple: 'Couple',
		signUs: 'Allegra Chamber Bali',
		signDate: 'Date',
		footer: `Terms version ${TERMS.version} · ${reference}`,
	}
}

// ---------- html ----------
function html(c) {
	const f = fmt(c.lang)
	const dash = '—'
	const bankRows = [bank.bankName, bank.accountName, bank.accountNumber, bank.swift, reference]
		.map((v, i) => (i === 3 && !v ? null : [c.bankLabels[i], v || dash]))
		.filter(Boolean)
	return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${esc(c.title)} · ${esc(reference)}</title><style>
	@font-face{font-family:Cormorant;font-weight:500;src:url(${fontDir}/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2)}
	@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${fontDir}/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2)}
	@font-face{font-family:Inter;font-weight:400;src:url(${fontDir}/inter/files/inter-latin-400-normal.woff2)}
	@font-face{font-family:Inter;font-weight:500;src:url(${fontDir}/inter/files/inter-latin-500-normal.woff2)}
	@page{size:A4;margin:0}
	*{box-sizing:border-box;margin:0;padding:0}
	html{background:#F7F3EC}
	body{font-family:Inter,sans-serif;color:#1E1C19;font-size:8.6pt;line-height:1.48}
	.doc{padding:15mm 17mm 14mm;box-decoration-break:clone;-webkit-box-decoration-break:clone}
	h1,h2{font-family:Cormorant,serif;font-weight:500;line-height:1.15}
	h1{font-size:26pt;margin-top:6mm}
	h2{font-size:13.5pt;margin:4.8mm 0 1.4mm;break-after:avoid}
	h2 .n{color:#C2A36B;margin-right:2mm}
	.eyebrow{font-size:7pt;letter-spacing:.18em;text-transform:uppercase;color:#6D665C}
	.wordmark .name{font-family:Cormorant,serif;font-size:18pt;line-height:1;display:block}
	.wordmark .sub{font-size:6pt;letter-spacing:.3em;text-transform:uppercase;color:#6D665C}
	.rule{width:18mm;height:1px;background:#C2A36B;margin:4mm 0}
	.draft{margin-top:5mm;padding:2.5mm 4mm;border:1px solid #9b3b2a;color:#9b3b2a;font-weight:500;letter-spacing:.06em}
	dl.meta{display:grid;grid-template-columns:38mm 1fr;gap:1.2mm 4mm;margin-top:4mm}
	dl.meta dt{color:#6D665C}
	.intro{margin-top:5mm;font-family:Cormorant,serif;font-style:italic;font-size:12pt;color:#3E5247;line-height:1.4}
	table{width:100%;border-collapse:collapse;margin-top:2mm}
	th{font-size:6.5pt;letter-spacing:.14em;text-transform:uppercase;color:#6D665C;font-weight:500;text-align:left;padding:1.5mm 2mm;border-bottom:1px solid #C2A36B}
	td{padding:1.4mm 2mm;border-bottom:1px solid rgba(30,28,25,.14);vertical-align:top}
	td.r,th.r{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
	tr.total td{font-weight:500;border-bottom:none}
	tr{break-inside:avoid}
	table.keep,.keep{break-inside:avoid}
	ul{margin:2mm 0 0 4mm}
	li{margin-top:1mm}
	p{margin-top:1.5mm}
	.muted{color:#6D665C}
	.box{border-left:1px solid #C2A36B;padding-left:4mm;margin-top:3mm;color:#3E5247}
	dl.how{margin-top:2mm}
	dl.how dt{font-weight:500;margin-top:2mm}
	section{break-inside:auto}
	.sign{display:grid;grid-template-columns:1fr 1fr;gap:12mm;margin-top:9mm;break-inside:avoid}
	.sign div{border-top:1px solid rgba(30,28,25,.4);padding-top:1.5mm;font-size:7.5pt;color:#6D665C}
	.foot{margin-top:7mm;font-size:7pt;color:#6D665C;display:flex;justify-content:space-between;gap:6mm}
	</style></head><body><div class="doc">
	<div class="wordmark"><span class="name">Allegra</span><span class="sub">Chamber Bali</span></div>
	<h1>${esc(c.title)}</h1>
	<div class="rule"></div>
	${isDraft ? `<p class="draft">${esc(c.draft)}</p>` : ''}
	<p class="eyebrow" style="margin-top:4mm">${esc(c.preparedFor)}</p>
	<dl class="meta">${c.meta.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
	<p class="intro">${esc(c.intro)}</p>

	<h2><span class="n">1</span>${esc(c.s1)}</h2>
	<p><span class="muted">${esc(c.formationLabel)}:</span> ${esc(c.formation)}</p>
	<table><tbody>${b.items
		.map((it) => `<tr><td>${esc(tr(it.session, c.lang))}</td><td class="r">${f.rp(it.price)}</td></tr>`)
		.join(
			'',
		)}<tr class="total"><td>${esc(c.totalLabel)}</td><td class="r">${f.rp(total)}</td></tr></tbody></table>
	<ul>${c.included.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>

	<h2><span class="n">2</span>${esc(c.s2)}</h2>
	<p>${esc(c.hold)}</p>
	<table><tbody>${c.payRows
		.map(
			([what, when, amt]) =>
				`<tr><td>${esc(what)}</td><td>${esc(when)}</td><td class="r">${esc(amt)}</td></tr>`,
		)
		.join('')}</tbody></table>
	<p class="muted">${esc(c.payNote)}</p>

	<h2><span class="n">3</span>${esc(c.s3)}</h2>
	<p>${esc(c.currency)}</p>
	<table class="keep"><tbody>${bankRows.map(([k, v]) => `<tr><td class="muted" style="width:42mm">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
	<dl class="how">${c.howTo.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
	<p>${esc(c.receipt)}</p>
	<p class="box">${esc(c.safety)}</p>

	<h2><span class="n">4</span>${esc(c.s4)}</h2>
	${c.coolingOff ? `<p>${esc(c.coolingOff)}</p>` : ''}
	<table class="keep"><thead><tr><th>${esc(c.cancelHead[0])}</th><th>${esc(c.cancelHead[1])}</th></tr></thead><tbody>${rows
		.map((r) => `<tr><td style="width:62mm">${esc(c.rowWhen(r))}</td><td>${esc(c.rowKeep(r))}</td></tr>`)
		.join('')}</tbody></table>
	<p class="muted">${esc(c.cancelNote)}</p>
	${dateChangeBy >= recorded ? `<p>${esc(c.dateChange)}</p>` : ''}
	${shortNotice ? '' : `<p>${esc(c.late)}</p>`}

	<h2><span class="n">5</span>${esc(c.s5)}</h2>
	<p>${esc(c.usCancel)}</p>
	<p>${esc(c.sub)}</p>

	<h2><span class="n">6</span>${esc(c.s6)}</h2>
	<p>${esc(c.rain)}</p>
	<p>${esc(c.fm)}</p>

	<div class="keep"><h2><span class="n">7</span>${esc(c.s7)}</h2>
	<p>${esc(c.agree)}</p>
	<div class="sign"><div>${esc(c.signCouple)} · ${esc(c.signDate)}</div><div>${esc(c.signUs)} · ${esc(c.signDate)}</div></div></div>
	<p class="foot"><span>${esc(c.footer)}</span><span>allegrachamberbali.com · allegrachamberbali@gmail.com</span></p>
	</div></body></html>`
}

// ---------- render ----------
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const outDir = join(root, 'private', 'booking-terms')
mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined })
try {
	const page = await browser.newPage()
	for (const lang of langs) {
		const tmp = join(tmpdir(), `booking-terms-${reference}-${lang}.html`)
		writeFileSync(tmp, html(copy(lang)))
		await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' })
		await page.evaluate(() => document.fonts.ready)
		const file = join(outDir, `${reference}-${lang}.pdf`)
		await page.pdf({ path: file, format: 'A4', printBackground: true, preferCSSPageSize: true })
		rmSync(tmp)
		console.log(
			`wrote private/booking-terms/${reference}-${lang}.pdf${isDraft ? ' (DRAFT: no bank details)' : ''}`,
		)
	}
} finally {
	await browser.close()
}
