/**
 * Allegra Chamber Bali — "Lock Your Date" booking register.
 *
 * Runs as a Google Apps Script bound to the "Allegra Booking Register" Google Sheet, deployed as a
 * Web App. The static site's /lock-your-date/ form posts here. For each submission it:
 *   1. records the couple in the "Bookings" sheet (no payment is taken),
 *   2. emails the couple, signed by the correspondent: date held until when, the deadline to
 *      complete the booking, and a summary of the booking terms with real calendar dates,
 *   3. notifies Allegra, flagging a clash with another booking on the same date.
 * A daily trigger sends one gentle reminder before the hold ends, and tells Allegra when a hold
 * has expired — the date is never released automatically; the correspondent decides.
 *
 * Setup and deploy steps: integrations/booking/README.md. After editing src/data/booking-terms.json
 * run `npm run booking:sync`, then paste this file into the Apps Script editor again and redeploy.
 */

const CONFIG = {
	CORRESPONDENT: 'Yessica',
	SENDER_NAME: 'Yessica · Allegra Chamber Bali',
	// Where new submissions and expired holds are reported.
	NOTIFY_EMAIL: 'allegrachamberbali@gmail.com',
	REPLY_TO: 'allegrachamberbali@gmail.com',
	SITE_URL: 'https://allegrachamberbali.com',
	// How many active bookings (Held or Confirmed) one wedding date can take before a new
	// submission is marked "Pending review" instead of "Held".
	MAX_BOOKINGS_PER_DATE: 1,
	SHEET_NAME: 'Bookings',
	TIMEZONE: 'Asia/Makassar', // Bali (WITA)
}

// <terms> — generated from src/data/booking-terms.json by `npm run booking:sync`; do not edit by hand.
const TERMS = {
	version: '2026-10',
	depositPct: 30,
	balanceDaysBefore: 30,
	holdDays: 7,
	holdReminderDaysBefore: 2,
	coolingOffHours: 48,
	coolingOffMinDays: 60,
	freeDateChangeDaysBefore: 60,
	creditMonths: 12,
	lateGraceDays: 7,
	refundWorkingDays: 7,
	tiers: [
		{
			untilDaysBefore: 91,
			keep: 'deposit',
			credit: true,
		},
		{
			untilDaysBefore: 31,
			keep: 'deposit',
		},
		{
			untilDaysBefore: 15,
			keepPct: 50,
		},
		{
			untilDaysBefore: 0,
			keepPct: 100,
		},
	],
}
// </terms>

const STATUS = {
	HELD: 'Held',
	PENDING: 'Pending review',
	CONFIRMED: 'Confirmed',
	RELEASED: 'Released',
	CANCELLED: 'Cancelled',
}
const ACTIVE = [STATUS.HELD, STATUS.CONFIRMED]
const HEADERS = [
	'Reference',
	'Status',
	'Submitted at',
	'Wedding date',
	'Hold until',
	'Partner 1',
	'Partner 2',
	'Email',
	'WhatsApp',
	'Venue',
	'Formation',
	'Sessions',
	'Planner / WO',
	'Language',
	'Notes',
	'Consent',
	'Clashes with',
	'Reminder sent',
	'Expiry reported',
]
const COL = HEADERS.reduce((acc, h, i) => ((acc[h] = i), acc), {})

const FORMATIONS = {
	solo: { en: 'Solo', id: 'Solo' },
	duo: { en: 'Duo', id: 'Duo' },
	trio: { en: 'Trio', id: 'Trio' },
	quartet: { en: 'String Quartet', id: 'String Quartet' },
	'large-ensemble': { en: 'Large Ensemble', id: 'Large Ensemble' },
	unsure: { en: 'Not decided yet', id: 'Belum diputuskan' },
}
const SESSIONS = {
	ceremony: { en: 'Ceremony', id: 'Upacara' },
	cocktail: { en: 'Cocktail hour', id: 'Cocktail' },
	dinner: { en: 'Dinner / Reception', id: 'Makan malam / Resepsi' },
}

// ---------- one-time setup (run from the editor) ----------

function setup() {
	const ss = SpreadsheetApp.getActiveSpreadsheet()
	ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE)
	const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME)
	sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).setNumberFormat('@') // keep dates as text
	sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold')
	sheet.setFrozenRows(1)
	const statusRule = SpreadsheetApp.newDataValidation()
		.requireValueInList(Object.values(STATUS), true)
		.build()
	sheet.getRange(2, COL['Status'] + 1, sheet.getMaxRows() - 1, 1).setDataValidation(statusRule)

	ScriptApp.getProjectTriggers()
		.filter((t) => t.getHandlerFunction() === 'dailyCheck')
		.forEach((t) => ScriptApp.deleteTrigger(t))
	ScriptApp.newTrigger('dailyCheck').timeBased().everyDays(1).atHour(9).inTimezone(CONFIG.TIMEZONE).create()
}

// ---------- web app ----------

function doPost(e) {
	const p = (e && e.parameter) || {}
	const wantsJson = p.mode === 'js'
	if (p.botcheck) return respond_(wantsJson, { ok: true, reference: '', status: STATUS.HELD })

	const lock = LockService.getScriptLock()
	lock.waitLock(20000)
	try {
		const d = validate_(p, (e && e.parameters) || {})
		const sheet = sheet_()
		const recorded = today_()
		const plan = plan_(d.weddingDate, recorded)
		const clashes = activeOn_(sheet, d.weddingDate)
		const status = clashes.length >= CONFIG.MAX_BOOKINGS_PER_DATE ? STATUS.PENDING : STATUS.HELD
		const reference = reference_(sheet, d)

		const row = []
		row[COL['Reference']] = reference
		row[COL['Status']] = status
		row[COL['Submitted at']] = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm')
		row[COL['Wedding date']] = d.weddingDate
		row[COL['Hold until']] = iso_(plan.holdUntil)
		row[COL['Partner 1']] = d.partner1
		row[COL['Partner 2']] = d.partner2
		row[COL['Email']] = d.email
		row[COL['WhatsApp']] = d.whatsapp
		row[COL['Venue']] = d.venue
		row[COL['Formation']] = FORMATIONS[d.formation].en
		row[COL['Sessions']] = d.sessions.map((s) => SESSIONS[s].en).join(', ')
		row[COL['Planner / WO']] = d.planner
		row[COL['Language']] = d.lang
		row[COL['Notes']] = d.notes
		row[COL['Consent']] = `yes · ${row[COL['Submitted at']]}`
		row[COL['Clashes with']] = clashes.join(', ')
		row[COL['Reminder sent']] = ''
		row[COL['Expiry reported']] = ''
		sheet.appendRow(row.map(cell_))

		const booking = { ...d, reference, status }
		const mail = coupleEmail_(booking, plan)
		MailApp.sendEmail({
			to: d.email,
			subject: mail.subject,
			body: mail.text,
			htmlBody: mail.html,
			name: CONFIG.SENDER_NAME,
			replyTo: CONFIG.REPLY_TO,
		})
		notify_(
			`New date lock: ${d.weddingDate} · ${d.partner1} & ${d.partner2} · ${status}`,
			[
				`Reference: ${reference}`,
				`Status: ${status}${clashes.length ? ` — clashes with ${clashes.join(', ')}` : ''}`,
				`Wedding date: ${d.weddingDate} · Venue: ${d.venue}`,
				`Formation: ${FORMATIONS[d.formation].en} · Sessions: ${row[COL['Sessions']] || '—'}`,
				`Email: ${d.email} · WhatsApp: ${d.whatsapp}`,
				`Planner / WO: ${d.planner || '—'} · Language: ${d.lang}`,
				`Notes: ${d.notes || '—'}`,
				`Hold until: ${iso_(plan.holdUntil)}`,
				'',
				status === STATUS.PENDING
					? `This date already has an active booking. The couple was told you'll confirm within 24 hours.`
					: `Next: send the quote and the Booking Terms PDF (scripts/generate-booking-terms.mjs) with the bank details.`,
				`Register: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
			].join('\n'),
		)
		return respond_(wantsJson, { ok: true, reference, status, holdUntil: iso_(plan.holdUntil) })
	} catch (err) {
		if (!err.userError) console.error(err)
		return respond_(wantsJson, { ok: false, error: err.userError || 'server' })
	} finally {
		lock.releaseLock()
	}
}

function doGet() {
	return ContentService.createTextOutput('Allegra Chamber Bali booking register is running.')
}

// ---------- daily trigger ----------

function dailyCheck() {
	const sheet = sheet_()
	const values = sheet.getDataRange().getValues()
	const today = day_(today_())
	for (let r = 1; r < values.length; r++) {
		const v = values[r]
		if (String(v[COL['Status']]) !== STATUS.HELD) continue
		const holdUntil = day_(str_(v[COL['Hold until']]))
		const daysLeft = daysBetween_(today, holdUntil)
		const booking = {
			reference: String(v[COL['Reference']]),
			partner1: String(v[COL['Partner 1']]),
			partner2: String(v[COL['Partner 2']]),
			email: String(v[COL['Email']]),
			weddingDate: str_(v[COL['Wedding date']]),
			lang: String(v[COL['Language']]) === 'id' ? 'id' : 'en',
		}
		if (!v[COL['Reminder sent']] && daysLeft >= 0 && daysLeft <= TERMS.holdReminderDaysBefore) {
			const mail = reminderEmail_(booking, holdUntil)
			MailApp.sendEmail({
				to: booking.email,
				subject: mail.subject,
				body: mail.text,
				htmlBody: mail.html,
				name: CONFIG.SENDER_NAME,
				replyTo: CONFIG.REPLY_TO,
			})
			sheet.getRange(r + 1, COL['Reminder sent'] + 1).setValue(iso_(today))
		}
		if (!v[COL['Expiry reported']] && daysLeft < 0) {
			notify_(
				`Hold expired: ${booking.weddingDate} · ${booking.partner1} & ${booking.partner2}`,
				[
					`Reference: ${booking.reference}`,
					`The hold ended on ${iso_(holdUntil)} and the status is still "Held".`,
					`Set the status to Confirmed (deposit received), Released, or extend "Hold until".`,
					`Register: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
				].join('\n'),
			)
			sheet.getRange(r + 1, COL['Expiry reported'] + 1).setValue(iso_(today))
		}
	}
}

// ---------- validation ----------

function validate_(p, multi) {
	const text = (v, max) =>
		String(v || '')
			.trim()
			.slice(0, max)
	const fail = (code) => {
		const err = new Error(code)
		err.userError = code
		throw err
	}
	const d = {
		partner1: text(p.partner1, 120),
		partner2: text(p.partner2, 120),
		email: text(p.email, 200).toLowerCase(),
		whatsapp: text(p.whatsapp, 40),
		weddingDate: text(p.wedding_date, 10),
		venue: text(p.venue, 200),
		formation: text(p.formation, 20),
		sessions: []
			.concat(multi.sessions || [])
			.map((s) => text(s, 20))
			.filter((s) => SESSIONS[s]),
		planner: text(p.planner, 160),
		notes: text(p.notes, 2000),
		lang: p.lang === 'id' ? 'id' : 'en',
	}
	if (!d.partner1 || !d.partner2 || !d.whatsapp || !d.venue) fail('missing')
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) fail('email')
	if (!/^\d{4}-\d{2}-\d{2}$/.test(d.weddingDate) || isNaN(day_(d.weddingDate))) fail('date')
	if (daysBetween_(day_(today_()), day_(d.weddingDate)) < 1) fail('date')
	if (!FORMATIONS[d.formation]) fail('formation')
	if (p.consent !== 'yes') fail('consent')
	return d
}

// ---------- dates (calendar days, UTC midnight — same math as scripts/generate-booking-terms.mjs) ----------

function today_() {
	return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd')
}
function day_(isoDate) {
	return new Date(`${isoDate}T00:00:00Z`)
}
function iso_(d) {
	return d.toISOString().slice(0, 10)
}
function addDays_(d, n) {
	return new Date(d.getTime() + n * 86400000)
}
function addMonths_(d, n) {
	const r = new Date(d)
	r.setUTCMonth(r.getUTCMonth() + n)
	return r
}
function maxDate_(a, b) {
	return a > b ? a : b
}
function daysBetween_(a, b) {
	return Math.round((b - a) / 86400000)
}

function plan_(weddingIso, recordedIso) {
	const wedding = day_(weddingIso)
	const recorded = day_(recordedIso)
	const leadDays = daysBetween_(recorded, wedding)
	const shortNotice = leadDays <= TERMS.balanceDaysBefore
	const tiers = TERMS.tiers
		.map((t, i) => ({
			...t,
			from: i === 0 ? null : maxDate_(addDays_(wedding, -TERMS.tiers[i - 1].untilDaysBefore + 1), recorded),
			to: t.untilDaysBefore === 0 ? null : addDays_(wedding, -t.untilDaysBefore),
		}))
		.filter((t) => !t.to || t.to >= recorded)
	const dateChangeBy = addDays_(wedding, -TERMS.freeDateChangeDaysBefore)
	return {
		wedding,
		recorded,
		shortNotice,
		holdUntil: addDays_(recorded, Math.min(TERMS.holdDays, leadDays - 1)),
		balanceDue: addDays_(wedding, -TERMS.balanceDaysBefore),
		lateCutoff: addDays_(wedding, -TERMS.balanceDaysBefore + TERMS.lateGraceDays),
		dateChangeBy: dateChangeBy >= recorded ? dateChangeBy : null,
		creditUntil: addMonths_(wedding, TERMS.creditMonths),
		coolingOff: leadDays > TERMS.coolingOffMinDays,
		tiers,
	}
}

// ---------- sheet helpers ----------

function sheet_() {
	const ss = SpreadsheetApp.getActiveSpreadsheet()
	const sheet = ss.getSheetByName(CONFIG.SHEET_NAME)
	if (!sheet) throw new Error('Run setup() first — the Bookings sheet does not exist.')
	return sheet
}

function activeOn_(sheet, weddingIso) {
	const values = sheet.getDataRange().getValues()
	return values
		.slice(1)
		.filter((v) => str_(v[COL['Wedding date']]) === weddingIso && ACTIVE.includes(String(v[COL['Status']])))
		.map((v) => String(v[COL['Reference']]))
}

function reference_(sheet, d) {
	const initial = (name) => (name.match(/[A-Za-z]/) || ['X'])[0].toUpperCase()
	const base = `ACB-${d.weddingDate.replace(/-/g, '')}-${initial(d.partner1)}${initial(d.partner2)}`
	const taken = new Set(
		sheet
			.getDataRange()
			.getValues()
			.slice(1)
			.map((v) => String(v[COL['Reference']])),
	)
	let ref = base
	for (let n = 2; taken.has(ref); n++) ref = `${base}-${n}`
	return ref
}

// Sheets may turn "2027-09-27" into a Date despite the text format; read it back as yyyy-MM-dd.
function str_(v) {
	return v instanceof Date ? Utilities.formatDate(v, CONFIG.TIMEZONE, 'yyyy-MM-dd') : String(v)
}

// Stops a submitted value such as "=IMPORTXML(...)" from being run as a spreadsheet formula.
function cell_(v) {
	const s = String(v == null ? '' : v)
	return /^[=+\-@]/.test(s) ? `'${s}` : s
}

// ---------- responses ----------

function respond_(wantsJson, payload) {
	if (wantsJson) {
		return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON)
	}
	// Without JavaScript the browser lands here directly — keep it to a plain, readable message.
	const msg = payload.ok
		? `Thank you — your details have been received (reference ${payload.reference}). Please check your email.`
		: 'Sorry, something went wrong. Please go back and check the form, or message us on WhatsApp.'
	return HtmlService.createHtmlOutput(
		`<p style="font-family:sans-serif;max-width:32rem;margin:3rem auto;line-height:1.6">${esc_(msg)}<br><br><a href="${CONFIG.SITE_URL}" target="_top">allegrachamberbali.com</a></p>`,
	)
}

function notify_(subject, body) {
	MailApp.sendEmail({ to: CONFIG.NOTIFY_EMAIL, subject, body, name: 'Allegra booking register' })
}

function esc_(s) {
	return String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch])
}

// ---------- email copy ----------

// Month/day names are spelled out here rather than via toLocaleDateString, so the output does not
// depend on which ICU locales the Apps Script runtime ships with.
const NAMES = {
	en: {
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		months: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
	},
	id: {
		days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
		months: [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		],
	},
}

function fmt_(lang) {
	const n = NAMES[lang] || NAMES.en
	const date = (d) => `${d.getUTCDate()} ${n.months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
	return { date, long: (d) => `${n.days[d.getUTCDay()]}, ${date(d)}` }
}

/** Renders sections of [heading, [paragraph | ['table', rows] | ['list', items]]] to HTML and text. */
function render_(greeting, sections, signoff) {
	const html = [`<div style="font-family:Georgia,serif;color:#1E1C19;max-width:36rem;line-height:1.6">`]
	const text = []
	html.push(`<p>${esc_(greeting)}</p>`)
	text.push(greeting, '')
	sections.forEach(([heading, blocks]) => {
		if (heading) {
			html.push(
				`<h3 style="font-weight:normal;font-size:1.15rem;margin:1.6rem 0 .4rem;color:#3E5247">${esc_(heading)}</h3>`,
			)
			text.push(heading.toUpperCase())
		}
		blocks.forEach((b) => {
			if (Array.isArray(b) && b[0] === 'table') {
				html.push(
					`<table style="border-collapse:collapse;width:100%;font-size:.95rem">${b[1]
						.map(
							([k, v]) =>
								`<tr><td style="padding:.35rem .6rem .35rem 0;border-bottom:1px solid #e4ddd1;color:#6D665C;vertical-align:top">${esc_(k)}</td><td style="padding:.35rem 0;border-bottom:1px solid #e4ddd1">${esc_(v)}</td></tr>`,
						)
						.join('')}</table>`,
				)
				b[1].forEach(([k, v]) => text.push(`- ${k}: ${v}`))
			} else if (Array.isArray(b) && b[0] === 'list') {
				html.push(`<ul style="padding-left:1.2rem">${b[1].map((i) => `<li>${esc_(i)}</li>`).join('')}</ul>`)
				b[1].forEach((i) => text.push(`- ${i}`))
			} else {
				html.push(`<p>${esc_(b)}</p>`)
				text.push(b)
			}
		})
		text.push('')
	})
	html.push(`<p style="margin-top:1.6rem">${signoff.map(esc_).join('<br>')}</p></div>`)
	text.push(...signoff)
	return { html: html.join(''), text: text.join('\n') }
}

function coupleEmail_(b, plan) {
	const f = fmt_(b.lang)
	const names = `${b.partner1} & ${b.partner2}`
	const pending = b.status === STATUS.PENDING
	const id = b.lang === 'id'
	const signoff = [
		id ? 'Salam hangat,' : 'Warm regards,',
		CONFIG.CORRESPONDENT,
		'Allegra Chamber Bali',
		CONFIG.SITE_URL.replace('https://', ''),
	]
	const sessions =
		b.sessions.map((s) => SESSIONS[s][b.lang]).join(', ') || (id ? 'akan dikonfirmasi' : 'to be confirmed')
	const details = [
		[id ? 'Referensi booking' : 'Booking reference', b.reference],
		[id ? 'Tanggal pernikahan' : 'Wedding date', f.long(plan.wedding)],
		['Venue', b.venue],
		[id ? 'Formasi' : 'Formation', FORMATIONS[b.formation][b.lang]],
		[id ? 'Sesi' : 'Sessions', sessions],
	]
	if (b.planner) details.push([id ? 'Planner / WO' : 'Planner', b.planner])

	const keep = (t) =>
		t.keepPct === 100
			? id
				? 'Total penuh'
				: 'The full total'
			: t.keepPct
				? id
					? `${t.keepPct}% dari total`
					: `${t.keepPct}% of the total`
				: (id ? `Deposit (${TERMS.depositPct}%)` : `The deposit (${TERMS.depositPct}%)`) +
					(t.credit
						? id
							? ` — atau seluruh deposit menjadi kredit untuk tanggal baru sebelum ${f.date(plan.creditUntil)}`
							: ` — or the full deposit kept as credit for a new date before ${f.date(plan.creditUntil)}`
						: '')
	const when = (t) =>
		!t.from
			? `${id ? 'Sampai' : 'Up to'} ${f.date(t.to)}`
			: !t.to
				? `${id ? 'Mulai' : 'From'} ${f.date(t.from)}`
				: `${f.date(t.from)} – ${f.date(t.to)}`

	const schedule = plan.shortNotice
		? [[id ? 'Pembayaran penuh' : 'Full payment', `${id ? 'paling lambat' : 'by'} ${f.date(plan.holdUntil)}`]]
		: [
				[
					id
						? `Deposit booking (${TERMS.depositPct}% dari total)`
						: `Booking deposit (${TERMS.depositPct}% of your total)`,
					`${id ? 'paling lambat' : 'by'} ${f.date(plan.holdUntil)}`,
				],
				[
					id ? `Pelunasan (${100 - TERMS.depositPct}%)` : `Balance (${100 - TERMS.depositPct}%)`,
					`${id ? 'paling lambat' : 'by'} ${f.date(plan.balanceDue)}`,
				],
			]

	const changes = []
	if (plan.coolingOff)
		changes.push(
			id
				? `Berubah pikiran? Dalam ${TERMS.coolingOffHours} jam setelah membayar deposit, deposit kami kembalikan penuh (dikurangi biaya transfer bank, bila ada).`
				: `Change of heart? Within ${TERMS.coolingOffHours} hours of paying your deposit, we refund it in full (less any bank transfer fees).`,
		)
	changes.push(['table', plan.tiers.map((t) => [when(t), keep(t)])])
	changes.push(
		id
			? 'Kelebihan dari jumlah yang sudah Anda bayar kami kembalikan. Jika tanggal Anda berhasil kami isi dengan pasangan lain, kami hanya menahan biaya yang sudah benar-benar keluar. Mengurangi formasi atau sesi diperlakukan sebagai pembatalan sebagian dengan jadwal yang sama.'
			: 'Anything you have paid above this is refunded. If we are able to book your date with another couple, we keep only the costs already incurred. Reducing your formation or sessions is treated as a partial cancellation on the same schedule.',
	)
	if (plan.dateChangeBy)
		changes.push(
			id
				? `Pindah tanggal: satu kali tanpa biaya bila diminta paling lambat ${f.date(plan.dateChangeBy)} dan tanggal baru tersedia; deposit pindah utuh.`
				: `Changing your date: once, free of charge, if requested by ${f.date(plan.dateChangeBy)} and the new date is available; your deposit moves in full.`,
		)
	if (!plan.shortNotice)
		changes.push(
			id
				? `Bila pelunasan belum kami terima hingga ${f.date(plan.lateCutoff)}, kami akan menghubungi Anda; setelah itu tanggal dapat kami lepas dan deposit ditahan sebagai biaya pembatalan.`
				: `If the balance hasn't arrived by ${f.date(plan.lateCutoff)}, we'll reach out; after that we may release your date, and the deposit is kept as the cancellation charge.`,
		)

	const intro = pending
		? id
			? `Terima kasih sudah meluangkan waktu mengisi formulir. Kami sudah menerima permintaan Anda untuk ${f.long(plan.wedding)} dengan referensi ${b.reference}. Tanggal ini sudah memiliki permintaan booking lain, jadi saya sedang mengecek apakah kami juga dapat menahannya untuk Anda. Saya akan mengonfirmasi dalam 24 jam. Belum ada pembayaran yang diminta.`
			: `Thank you for taking a moment to fill in the form. We've received your request for ${f.long(plan.wedding)} under reference ${b.reference}. We already have another booking request for this date, so I'm checking whether we can hold it for you as well, and I'll confirm within 24 hours. No payment has been taken.`
		: id
			? `Terima kasih sudah meluangkan waktu mengisi formulir. Tanggal pernikahan Anda, ${f.long(plan.wedding)}, kini kami tahan atas nama Anda dengan referensi ${b.reference}. Belum ada pembayaran yang diminta.`
			: `Thank you for taking a moment to fill in the form. Your wedding date, ${f.long(plan.wedding)}, is now held for you under reference ${b.reference}. No payment has been taken.`

	const sections = [
		['', [intro]],
		[
			id ? 'Kapan booking perlu diselesaikan' : 'When to complete your booking',
			pending
				? [
						id
							? 'Bila tanggal dapat kami tahan, saya kirim konfirmasinya beserta quote dan detail pembayaran. Booking selesai setelah deposit diterima.'
							: "If we can hold the date, I'll send the confirmation with your quote and payment details. Your booking is complete once the deposit arrives.",
					]
				: [
						id
							? `Tanggal Anda kami tahan hingga ${f.long(plan.holdUntil)}. Untuk menyelesaikan booking, deposit perlu kami terima paling lambat tanggal tersebut.`
							: `Your date is held until ${f.long(plan.holdUntil)}. To complete your booking, the deposit needs to arrive by then.`,
						id
							? 'Dalam 24 jam saya kirim quote, Ketentuan Booking lengkap (dengan nominal dan detail rekening), dan cara pembayaran lewat WhatsApp atau email.'
							: "Within 24 hours I'll send your quote, your full Booking Terms (with the amounts and our bank details) and how to pay, on WhatsApp or by email.",
					],
		],
		[id ? 'Detail booking Anda' : 'Your booking details', [['table', details]]],
		[
			id ? 'Jadwal pembayaran' : 'Payment schedule',
			[
				['table', schedule],
				id
					? 'Semua nominal dalam Rupiah (IDR). Pembayaran dapat dilakukan lewat transfer bank di Indonesia, Wise, atau transfer bank internasional (SWIFT).'
					: 'All amounts are in Indonesian Rupiah (IDR). You can pay by bank transfer within Indonesia, by Wise, or by international bank transfer (SWIFT).',
			],
		],
		[id ? 'Jika rencana Anda berubah' : 'If your plans change', changes],
		[
			id ? 'Ketentuan lainnya' : 'Other terms',
			[
				[
					'list',
					id
						? [
								'Aransemen khusus lagu pilihan Anda sudah termasuk, tanpa biaya tambahan.',
								'Sound system tidak termasuk; amplifikasi, bila diperlukan, disediakan oleh penyedia sound venue atau planner Anda.',
								`Bila kami membatalkan karena sebab di pihak kami, seluruh pembayaran Anda kami kembalikan dalam ${TERMS.refundWorkingDays} hari kerja.`,
								'Hujan: musisi dan instrumen pindah ke area teduh yang disepakati lebih awal dengan planner atau venue. Hujan bukan alasan pembatalan.',
								`Keadaan memaksa (bencana alam, penutupan resmi bandara atau akses, larangan acara oleh pemerintah, epidemi, kerusuhan): seluruh pembayaran menjadi kredit penuh untuk tanggal baru hingga ${f.date(plan.creditUntil)}, tanpa biaya.`,
							]
						: [
								'Custom arrangements of your own songs are included, never a separate charge.',
								"Sound system not included; amplification, when needed, comes from your venue's or planner's sound provider.",
								`If we cancel for any reason on our side, everything you have paid is refunded within ${TERMS.refundWorkingDays} working days.`,
								'Rain: musicians and instruments move to a covered spot agreed in advance with your planner or venue. Rain is not a reason to cancel.',
								`Force majeure (natural disaster, official closure of the airport or access, a government restriction on events, epidemic, civil unrest): everything you have paid becomes full credit for a new date until ${f.date(plan.creditUntil)}, at no charge.`,
							],
				],
				id
					? 'Kami tidak pernah meminta data kartu, dan tidak pernah mengganti detail rekening lewat pesan. Jika Anda menerima detail pembayaran yang berbeda, hubungi kami dulu sebelum membayar.'
					: 'We never ask for card details, and we never change our bank details by message. If you ever receive different payment details, contact us before paying.',
				id
					? `Ketentuan versi ${TERMS.version}. Bila ada yang kurang jelas, cukup balas email ini.`
					: `Terms version ${TERMS.version}. If anything is unclear, simply reply to this email.`,
			],
		],
	]
	const mail = render_(id ? `Kepada ${names},` : `Dear ${names},`, sections, signoff)
	mail.subject = pending
		? id
			? `Permintaan Anda sudah kami terima · ${f.date(plan.wedding)} · Allegra Chamber Bali`
			: `We've received your details · ${f.date(plan.wedding)} · Allegra Chamber Bali`
		: id
			? `Tanggal Anda kami tahan · ${f.date(plan.wedding)} · Allegra Chamber Bali`
			: `Your date is held · ${f.date(plan.wedding)} · Allegra Chamber Bali`
	return mail
}

function reminderEmail_(b, holdUntil) {
	const f = fmt_(b.lang)
	const id = b.lang === 'id'
	const wedding = day_(b.weddingDate)
	const mail = render_(
		id ? `Kepada ${b.partner1} & ${b.partner2},` : `Dear ${b.partner1} & ${b.partner2},`,
		[
			[
				'',
				[
					id
						? `Sekadar pengingat: tanggal pernikahan Anda, ${f.long(wedding)} (referensi ${b.reference}), kami tahan hingga ${f.long(holdUntil)}. Untuk menyelesaikan booking, deposit perlu kami terima paling lambat tanggal tersebut.`
						: `A gentle note: your wedding date, ${f.long(wedding)} (reference ${b.reference}), is held until ${f.long(holdUntil)}. To complete your booking, the deposit needs to arrive by then.`,
					id
						? 'Bila rencana Anda berubah, cukup balas email ini — tidak ada biaya apa pun.'
						: 'If your plans have changed, simply reply to this email — there is no charge.',
				],
			],
		],
		[id ? 'Salam hangat,' : 'Warm regards,', CONFIG.CORRESPONDENT, 'Allegra Chamber Bali'],
	)
	mail.subject = id
		? `Pengingat: tanggal Anda ditahan hingga ${f.date(holdUntil)}`
		: `A gentle reminder: your date is held until ${f.date(holdUntil)}`
	return mail
}
