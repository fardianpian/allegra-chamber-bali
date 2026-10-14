/**
 * Allegra Chamber Bali — "Lock Your Date" booking register.
 *
 * Runs as a Google Apps Script bound to the "Allegra Booking Register" Google Sheet, deployed as a
 * Web App. The static site's /lock-your-date/ form posts here. For each submission it:
 *   1. records the couple in the "Bookings" sheet (no payment is taken),
 *   2. emails the couple, signed by the correspondent: date held until when, the deadline to
 *      complete the booking and the booking details (the full terms follow in the PDF with the quote),
 *   3. notifies Allegra, flagging a clash with another booking on the same date.
 * In the Sheet, the "Allegra" menu turns a booking row plus its prices in the "Quotes" sheet into the
 * Booking Terms PDF (EN + ID) in Google Drive, ready for the correspondent to check and send.
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
	'Booker / couple',
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
	// Added 2026-10-14 for the Booking Terms PDF. New columns go at the end so existing rows keep their place.
	'Musicians',
	'Terms PDF',
]
const COL = HEADERS.reduce((acc, h, i) => ((acc[h] = i), acc), {})

// `musicians`: default lineup size, same as `musicians` in src/content/packages/*.md.
const FORMATIONS = {
	solo: { en: 'Solo', id: 'Solo', musicians: 1 },
	duo: { en: 'Duo', id: 'Duo', musicians: 3 },
	trio: { en: 'Trio', id: 'Trio', musicians: 4 },
	quartet: { en: 'String Quartet', id: 'String Quartet', musicians: 5 },
	'large-ensemble': { en: 'Large Ensemble', id: 'Large Ensemble', musicians: 10 },
	unsure: { en: 'Not decided yet', id: 'Belum diputuskan' },
}
const SESSIONS = {
	ceremony: { en: 'Ceremony', id: 'Upacara' },
	cocktail: { en: 'Cocktail hour', id: 'Cocktail' },
	dinner: { en: 'Dinner / Reception', id: 'Makan malam / Resepsi' },
}

// One row per price line: the reference it belongs to, the line in EN and ID, and the amount in
// rupiah. A special rate is its own row with a negative amount, so the PDF shows the regular price,
// the reduction and the agreed total.
const QUOTES_SHEET = 'Quotes'
const QUOTE_HEADERS = ['Reference', 'Item (EN)', 'Item (ID)', 'Amount (IDR)']
// Bank details live in Project Settings → Script properties, never in this file: the repo is public.
const BANK_PROPS = {
	bankName: 'BANK_NAME',
	accountName: 'BANK_ACCOUNT_NAME',
	accountNumber: 'BANK_ACCOUNT_NUMBER',
	swift: 'BANK_SWIFT',
	noteEn: 'BANK_NOTE_EN',
	noteId: 'BANK_NOTE_ID',
}
const FOLDER_PROP = 'TERMS_FOLDER_ID'
const FOLDER_NAME = 'Allegra Booking Terms'

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

	const quotes = ss.getSheetByName(QUOTES_SHEET) || ss.insertSheet(QUOTES_SHEET)
	const quoteRows = quotes.getMaxRows() - 1
	quotes.getRange(1, 1, 1, QUOTE_HEADERS.length).setValues([QUOTE_HEADERS]).setFontWeight('bold')
	quotes.setFrozenRows(1)
	quotes.getRange(2, 1, quoteRows, 3).setNumberFormat('@')
	quotes.getRange(2, 1, quoteRows, 1).setDataValidation(
		SpreadsheetApp.newDataValidation()
			.requireValueInRange(sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1), true)
			.setAllowInvalid(false)
			.build(),
	)
	quotes
		.getRange(2, 4, quoteRows, 1)
		.setNumberFormat('#,##0;-#,##0')
		.setDataValidation(
			SpreadsheetApp.newDataValidation()
				.requireNumberNotEqualTo(0)
				.setAllowInvalid(false)
				.setHelpText('Amount in rupiah. For a special rate, add a row with a negative amount, e.g. -1000000.')
				.build(),
		)
	termsFolder_()

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
		row[COL['Booker / couple']] = d.name
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
		row[COL['Musicians']] = ''
		row[COL['Terms PDF']] = ''
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
			`New date lock: ${d.weddingDate} · ${d.name} · ${status}`,
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
					: `Next: add the prices in the Quotes sheet, then select this row and use Allegra → Create Booking Terms PDF.`,
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
			name: String(v[COL['Booker / couple']]),
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
				`Hold expired: ${booking.weddingDate} · ${booking.name}`,
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

// ---------- Booking Terms PDF (Sheet menu) ----------

function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu('Allegra')
		.addItem('Create Booking Terms PDF (selected row)', 'createTermsPdf')
		.addToUi()
}

/** Menu action: builds the EN + ID Booking Terms PDFs for the selected Bookings row. Never emails them. */
function createTermsPdf() {
	const ui = SpreadsheetApp.getUi()
	try {
		const ss = SpreadsheetApp.getActiveSpreadsheet()
		const sheet = ss.getActiveSheet()
		const row = sheet.getActiveRange().getRow()
		if (sheet.getName() !== CONFIG.SHEET_NAME || row < 2) {
			throw userError_(`Select a booking row in the ${CONFIG.SHEET_NAME} sheet first.`)
		}
		const v = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0]
		const reference = String(v[COL['Reference']])
		const input = termsInput_(v, quoteItems_(ss, reference), bank_(), today_())
		const folder = bookingFolder_(reference)
		const files = ['en', 'id'].map((lang) => pdf_(folder, input, lang))
		sheet.getRange(row, COL['Terms PDF'] + 1).setValue(folder.getUrl())
		const links = files
			.map((f) => `<li><a href="${f.getUrl()}" target="_blank">${esc_(f.getName())}</a></li>`)
			.join('')
		ui.showModalDialog(
			HtmlService.createHtmlOutput(
				`<div style="font-family:sans-serif;line-height:1.6"><p>Created for ${esc_(reference)}. Check both files before sending.</p><ul>${links}</ul><p><a href="${folder.getUrl()}" target="_blank">Open the folder</a></p></div>`,
			)
				.setWidth(380)
				.setHeight(220),
			'Booking Terms PDF',
		)
	} catch (err) {
		if (!err.userError) console.error(err)
		ui.alert('Booking Terms PDF', err.userError || `Something went wrong: ${err.message}`, ui.ButtonSet.OK)
	}
}

/** Checks one Bookings row and its prices, and works out every amount and date the PDF states. */
function termsInput_(v, items, bank, todayIso) {
	const reference = String(v[COL['Reference']])
	const status = String(v[COL['Status']])
	if (!ACTIVE.includes(status)) {
		throw userError_(`${reference} has the status "${status}". Set it to Held or Confirmed first.`)
	}
	const formation = Object.keys(FORMATIONS).find((k) => FORMATIONS[k].en === String(v[COL['Formation']]))
	if (!formation || formation === 'unsure') {
		throw userError_(
			`Set the Formation of ${reference} to Solo, Duo, Trio, String Quartet or Large Ensemble first.`,
		)
	}
	const override = String(v[COL['Musicians']] || '').trim()
	const musicians = override ? Number(override) : FORMATIONS[formation].musicians
	if (!Number.isInteger(musicians) || musicians < 1) {
		throw userError_('Musicians must be a whole number, or empty to use the formation default.')
	}
	const weddingDate = str_(v[COL['Wedding date']])
	const recordedDate = str_(v[COL['Submitted at']]).slice(0, 10)
	const holdIso = str_(v[COL['Hold until']])
	if (![weddingDate, recordedDate, holdIso].every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))) {
		throw userError_('Wedding date, Submitted at and Hold until must be dates written as yyyy-mm-dd.')
	}
	const plan = plan_(weddingDate, recordedDate)
	// "Hold until" may have been extended by hand in the Sheet; the PDF follows the Sheet.
	plan.holdUntil = day_(holdIso)
	if (plan.holdUntil >= plan.wedding) throw userError_('Hold until must be before the wedding date.')
	if (status === STATUS.HELD && plan.holdUntil < day_(todayIso)) {
		throw userError_(`The hold ended on ${holdIso}. Extend "Hold until" first, or release the date.`)
	}
	const total = items.reduce((sum, it) => sum + it.amount, 0)
	if (total <= 0)
		throw userError_(`The prices for ${reference} add up to ${total}. The total must be above 0.`)
	const deposit = plan.shortNotice ? total : roundRp_((total * TERMS.depositPct) / 100)
	return {
		reference,
		name: String(v[COL['Booker / couple']]),
		venue: String(v[COL['Venue']]),
		formation,
		musicians,
		items,
		total,
		deposit,
		balance: total - deposit,
		plan,
		bank,
	}
}

function quoteItems_(ss, reference) {
	const sheet = ss.getSheetByName(QUOTES_SHEET)
	if (!sheet) throw userError_(`Run setup() first. The ${QUOTES_SHEET} sheet does not exist.`)
	const items = sheet
		.getDataRange()
		.getValues()
		.slice(1)
		.filter((r) => String(r[0]).trim() === reference)
		.map((r) => ({
			en: String(r[1]).trim(),
			id: String(r[2]).trim() || String(r[1]).trim(),
			amount: amount_(r[3]),
		}))
	if (!items.length) throw userError_(`Add the prices for ${reference} in the ${QUOTES_SHEET} sheet first.`)
	items.forEach((it) => {
		if (!it.en) throw userError_(`A ${QUOTES_SHEET} row for ${reference} has no item name.`)
		if (!Number.isFinite(it.amount) || it.amount === 0) {
			throw userError_(`"${it.en}" needs an amount in rupiah other than 0.`)
		}
	})
	return items
}

// Reads 2500000, "2.500.000", "Rp 2,500,000" or "-1.000.000" (any dash before the digits = negative).
function amount_(v) {
	if (typeof v === 'number') return Math.round(v)
	const s = String(v).trim()
	const digits = s.replace(/\D/g, '')
	if (!digits) return NaN
	return (/[-−–]/.test(s.split(/\d/)[0]) ? -1 : 1) * Number(digits)
}

function bank_() {
	const props = PropertiesService.getScriptProperties()
	const get = (key) => String(props.getProperty(BANK_PROPS[key]) || '').trim()
	const bank = {
		bankName: get('bankName'),
		accountName: get('accountName'),
		accountNumber: get('accountNumber'),
		swift: get('swift'),
		note: { en: get('noteEn'), id: get('noteId') || get('noteEn') },
	}
	if (!bank.bankName || !bank.accountName || !bank.accountNumber) {
		throw userError_(
			`Add ${BANK_PROPS.bankName}, ${BANK_PROPS.accountName} and ${BANK_PROPS.accountNumber} in Project Settings → Script properties first.`,
		)
	}
	return bank
}

function termsFolder_() {
	const props = PropertiesService.getScriptProperties()
	const id = props.getProperty(FOLDER_PROP)
	if (id) {
		try {
			const folder = DriveApp.getFolderById(id)
			if (!folder.isTrashed()) return folder
		} catch (err) {
			// Deleted or no longer accessible: create a new one below.
		}
	}
	const folder = DriveApp.createFolder(FOLDER_NAME)
	props.setProperty(FOLDER_PROP, folder.getId())
	return folder
}

function bookingFolder_(reference) {
	const parent = termsFolder_()
	const found = parent.getFoldersByName(reference)
	return found.hasNext() ? found.next() : parent.createFolder(reference)
}

/** Builds the PDF through a temporary Google Doc, replacing an earlier PDF of the same name. */
function pdf_(folder, input, lang) {
	const name = `${input.reference}-${lang}`
	const doc = DocumentApp.create(name)
	renderDoc_(doc, termsContent_(input, lang))
	doc.saveAndClose()
	const docFile = DriveApp.getFileById(doc.getId())
	const pdf = docFile.getAs(MimeType.PDF).setName(`${name}.pdf`)
	const old = folder.getFilesByName(`${name}.pdf`)
	while (old.hasNext()) old.next().setTrashed(true)
	const file = folder.createFile(pdf)
	docFile.setTrashed(true)
	return file
}

function userError_(message) {
	const err = new Error(message)
	err.userError = message
	return err
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
		name: text(p.name, 160),
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
	if (!d.name || !d.whatsapp || !d.venue) fail('missing')
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
function roundRp_(n) {
	return Math.round(n / 1000) * 1000
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
	// Initials of the first two words, e.g. "Sarah & James" → SJ, "Sarah" → S.
	const initials =
		d.name
			.split(/\s+/)
			.map((w) => (w.match(/[A-Za-z]/) || [''])[0])
			.join('')
			.slice(0, 2)
			.toUpperCase() || 'X'
	const base = `ACB-${d.weddingDate.replace(/-/g, '')}-${initials}`
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
	const sep = lang === 'id' ? '.' : ','
	const rp = (x) => `${x < 0 ? '− ' : ''}Rp ${String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, sep)}`
	return { date, long: (d) => `${n.days[d.getUTCDay()]}, ${date(d)}`, rp }
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
	const names = b.name
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

	// Kept short on purpose (owner direction 2026-10-14): the first test landed in Gmail Spam, and a
	// long email from a new sender full of payment, bank and card wording reads like phishing. The
	// payment schedule, cancellation table and bank details travel in the Booking Terms PDF that
	// the correspondent sends with the quote (scripts/generate-booking-terms.mjs).
	const intro = pending
		? id
			? `Terima kasih sudah meluangkan waktu mengisi formulir. Kami sudah menerima permintaan Anda untuk ${f.long(plan.wedding)} dengan referensi ${b.reference}. Tanggal ini sudah memiliki permintaan booking lain, jadi saya sedang mengecek apakah kami juga dapat menahannya untuk Anda. Saya akan mengonfirmasi dalam 24 jam.`
			: `Thank you for taking a moment to fill in the form. We've received your request for ${f.long(plan.wedding)} under reference ${b.reference}. We already have another booking request for this date, so I'm checking whether we can hold it for you as well, and I'll confirm within 24 hours.`
		: id
			? `Terima kasih sudah meluangkan waktu mengisi formulir. Tanggal pernikahan Anda, ${f.long(plan.wedding)}, kini kami tahan atas nama Anda dengan referensi ${b.reference}.`
			: `Thank you for taking a moment to fill in the form. Your wedding date, ${f.long(plan.wedding)}, is now held for you under reference ${b.reference}.`

	const sections = [
		['', [intro]],
		[
			id ? 'Langkah selanjutnya' : 'What happens next',
			pending
				? [
						id
							? 'Bila tanggal dapat kami tahan, saya kirim konfirmasinya beserta quote dan ketentuan booking lengkap.'
							: "If we can hold the date, I'll send the confirmation together with your quote and full booking terms.",
					]
				: [
						id
							? `Tanggal Anda kami tahan hingga ${f.long(plan.holdUntil)}. Booking selesai setelah deposit kami terima paling lambat tanggal tersebut.`
							: `Your date is held until ${f.long(plan.holdUntil)}. Your booking is complete once the deposit arrives by then.`,
						id
							? 'Dalam 24 jam saya kirim quote dan ketentuan booking lengkap Anda lewat WhatsApp atau email.'
							: "Within 24 hours I'll send your quote and full booking terms on WhatsApp or by email.",
					],
		],
		[id ? 'Detail booking Anda' : 'Your booking details', [['table', details]]],
		[
			'',
			[
				id
					? 'Bila ada yang ingin ditanyakan, cukup balas email ini.'
					: 'If you have any questions, simply reply to this email.',
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
		id ? `Kepada ${b.name},` : `Dear ${b.name},`,
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

// ---------- Booking Terms PDF copy ----------
// Same wording as scripts/generate-booking-terms.mjs (the command-line fallback). Change both together
// until that script is retired.

/** Returns the document as blocks: [kind, ...args]. renderDoc_ turns them into a Google Doc. */
function termsContent_(t, lang) {
	const f = fmt_(lang)
	const id = lang === 'id'
	const L = (en, idText) => (id ? idText : en)
	const p = t.plan
	const names = t.name
	const payWord = p.shortNotice ? L('payment', 'pembayaran') : 'deposit'
	const tiers = p.tiers.map((tier) => ({
		...tier,
		keep: tier.keep === 'deposit' ? t.deposit : roundRp_((t.total * tier.keepPct) / 100),
	}))
	const when = (r) =>
		!r.from
			? `${L('Up to', 'Sampai')} ${f.date(r.to)}`
			: !r.to
				? `${L('From', 'Mulai')} ${f.date(r.from)}`
				: `${f.date(r.from)} – ${f.date(r.to)}`
	const keep = (r) =>
		r.keepPct === 100
			? `${L('The full total', 'Total penuh')} (${f.rp(r.keep)})`
			: r.keep === t.deposit && !r.keepPct
				? `${L('The deposit', 'Deposit')} (${f.rp(r.keep)})${
						r.credit
							? L(
									` — or the full deposit kept as credit for a new date before ${f.date(p.creditUntil)}`,
									` — atau seluruh deposit menjadi kredit untuk tanggal baru sebelum ${f.date(p.creditUntil)}`,
								)
							: ''
					}`
				: `${r.keepPct}% ${L('of the total', 'dari total')} (${f.rp(r.keep)})`
	const musicians = `${t.musicians} ${id ? 'musisi' : t.musicians === 1 ? 'musician' : 'musicians'}`
	const bankRows = [
		['Bank', t.bank.bankName],
		[L('Account name', 'Nama rekening'), t.bank.accountName],
		[L('Account number', 'Nomor rekening'), t.bank.accountNumber],
		t.bank.swift ? [L('SWIFT code', 'Kode SWIFT'), t.bank.swift] : null,
		[L('Payment reference', 'Berita transfer'), t.reference],
	].filter(Boolean)

	return [
		['wordmark'],
		['title', L('Booking Terms & Conditions', 'Ketentuan Booking')],
		['eyebrow', L('Prepared for', 'Disiapkan untuk')],
		[
			'meta',
			[
				[L('Couple', 'Pasangan'), names],
				[L('Wedding date', 'Tanggal pernikahan'), f.long(p.wedding)],
				['Venue', t.venue],
				[L('Booking reference', 'Referensi booking'), t.reference],
			],
		],
		[
			'intro',
			L(
				`Thank you, ${names}. Your date was recorded under your name on ${f.date(p.recorded)}. Everything you need to know before paying is on these pages, in plain language. If anything is unclear, ask us before you pay.`,
				`Terima kasih, ${names}. Tanggal Anda sudah kami catat atas nama Anda pada ${f.date(p.recorded)}. Dokumen ini berisi semua yang perlu Anda ketahui sebelum membayar — ditulis sesederhana mungkin. Jika ada yang kurang jelas, tanyakan kepada kami sebelum membayar.`,
			),
		],

		['h2', '1', L('Your booking', 'Booking Anda')],
		['p', `${L('Formation', 'Formasi')}: ${FORMATIONS[t.formation][lang]} · ${musicians}`],
		['prices', t.items.map((it) => [it[lang], f.rp(it.amount)]), ['Total', f.rp(t.total)]],
		[
			'list',
			L(
				[
					'Custom arrangements of your own songs are included, never a separate charge.',
					'Sound system not included; amplification, when needed, comes from your venue’s or planner’s sound provider. We share our tech rider in advance.',
					'Overtime beyond your booked coverage is available on request, subject to musician availability, and is confirmed and billed separately.',
				],
				[
					'Aransemen khusus lagu pilihan Anda sudah termasuk, tanpa biaya tambahan.',
					'Sound system tidak termasuk; amplifikasi, bila diperlukan, disediakan oleh penyedia sound venue atau planner Anda. Tech rider kami kirim lebih awal.',
					'Overtime di luar durasi yang dipesan dapat diminta, tergantung ketersediaan musisi, dan dikonfirmasi serta ditagih terpisah.',
				],
			),
		],

		['h2', '2', L('Payment schedule', 'Jadwal pembayaran')],
		[
			'p',
			L(
				`Your date is held until ${f.long(p.holdUntil)} while you read these terms. It is confirmed once your ${payWord} arrives.`,
				`Tanggal Anda kami tahan hingga ${f.long(p.holdUntil)} sementara Anda membaca ketentuan ini. Tanggal terkonfirmasi setelah ${payWord} kami terima.`,
			),
		],
		[
			'schedule',
			p.shortNotice
				? [
						[
							L('Full payment', 'Pembayaran penuh'),
							`${L('by', 'paling lambat')} ${f.date(p.holdUntil)}`,
							f.rp(t.total),
						],
					]
				: [
						[
							`${L('Booking deposit', 'Deposit booking')} (${TERMS.depositPct}%)`,
							`${L('by', 'paling lambat')} ${f.date(p.holdUntil)}`,
							f.rp(t.deposit),
						],
						[
							`${L('Balance', 'Pelunasan')} (${100 - TERMS.depositPct}%)`,
							`${L('by', 'paling lambat')} ${f.date(p.balanceDue)}`,
							f.rp(t.balance),
						],
					],
		],
		[
			'muted',
			p.shortNotice
				? L(
						'As your wedding is less than 30 days away, payment is made in full.',
						'Karena pernikahan Anda tinggal kurang dari 30 hari, pembayaran dilakukan sekaligus.',
					)
				: L(
						'Your deposit reserves your date and begins the arrangement of your songs. We send a gentle reminder about two weeks before the balance is due.',
						'Deposit mengunci tanggal Anda dan memulai pengerjaan aransemen lagu Anda. Kami mengirim pengingat sekitar dua minggu sebelum pelunasan jatuh tempo.',
					),
		],

		['h2', '3', L('How to pay', 'Cara membayar')],
		['p', L('All amounts are in Indonesian Rupiah (IDR).', 'Semua nominal dalam Rupiah (IDR).')],
		['pairs', bankRows],
		t.bank.note[lang] ? ['muted', t.bank.note[lang]] : null,
		[
			'how',
			L(
				[
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
				[
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
			),
		],
		[
			'p',
			L(
				'We send a receipt on WhatsApp as soon as each payment arrives.',
				'Kami mengirim kuitansi lewat WhatsApp begitu setiap pembayaran masuk.',
			),
		],
		[
			'box',
			L(
				'We never ask for card details, and we never change our bank details by message. If you ever receive different payment details, contact us before paying.',
				'Kami tidak pernah meminta data kartu, dan tidak pernah mengganti detail rekening lewat pesan. Jika Anda menerima detail pembayaran yang berbeda, hubungi kami dulu sebelum membayar.',
			),
		],

		['h2', '4', L('If your plans change', 'Jika rencana Anda berubah')],
		p.coolingOff
			? [
					'p',
					L(
						`Change of heart? Within ${TERMS.coolingOffHours} hours of paying your deposit, we refund it in full (less any bank transfer fees).`,
						`Berubah pikiran? Dalam ${TERMS.coolingOffHours} jam setelah membayar deposit, kami kembalikan deposit penuh (dikurangi biaya transfer bank, bila ada).`,
					),
				]
			: null,
		[
			'cancel',
			[L('If you cancel', 'Jika Anda membatalkan'), L('What we keep', 'Yang kami tahan')],
			tiers.map((r) => [when(r), keep(r)]),
		],
		[
			'muted',
			L(
				'Anything you have paid above this is refunded. If we are able to book your date with another couple, we keep only the costs already incurred and refund the rest. Reducing your formation or sessions is treated as a partial cancellation on the same schedule.',
				'Kelebihan dari jumlah yang sudah Anda bayar kami kembalikan. Jika tanggal Anda berhasil kami isi dengan pasangan lain, kami hanya menahan biaya yang sudah benar-benar keluar dan mengembalikan sisanya. Mengurangi formasi atau sesi diperlakukan sebagai pembatalan sebagian dengan jadwal yang sama.',
			),
		],
		p.dateChangeBy
			? [
					'p',
					L(
						`Changing your date: once, free of charge, if requested by ${f.date(p.dateChangeBy)} and the new date is available; your deposit moves in full.`,
						`Pindah tanggal: satu kali tanpa biaya bila diminta paling lambat ${f.date(p.dateChangeBy)} dan tanggal baru tersedia; deposit pindah utuh.`,
					),
				]
			: null,
		p.shortNotice
			? null
			: [
					'p',
					L(
						`If the balance hasn’t arrived by ${f.date(p.lateCutoff)}, we’ll reach out; after that we may release your date, and the deposit is kept as the cancellation charge.`,
						`Bila pelunasan belum kami terima hingga ${f.date(p.lateCutoff)}, kami akan menghubungi Anda; setelah itu tanggal dapat kami lepas dan deposit ditahan sebagai biaya pembatalan.`,
					),
				],

		['h2', '5', L('If we cannot perform', 'Jika kami tidak dapat tampil')],
		[
			'p',
			L(
				`If we cancel for any reason on our side, everything you have paid is refunded within ${TERMS.refundWorkingDays} working days.`,
				`Bila kami membatalkan karena sebab di pihak kami, seluruh pembayaran Anda kami kembalikan dalam ${TERMS.refundWorkingDays} hari kerja.`,
			),
		],
		[
			'p',
			L(
				'If one musician is unwell, we bring an equivalent replacement and let you know. If the formation ends up smaller, the price difference is refunded.',
				'Bila satu musisi berhalangan, kami menghadirkan pengganti yang setara dan memberi tahu Anda. Bila formasi akhirnya berkurang, selisih harganya kami kembalikan.',
			),
		],

		['h2', '6', L('Weather & events beyond anyone’s control', 'Cuaca & keadaan di luar kendali')],
		[
			'p',
			L(
				'Rain: musicians and instruments move to a covered spot agreed in advance with your planner or venue — the safety of musicians and instruments comes first. Rain is not a reason to cancel.',
				'Hujan: musisi dan instrumen pindah ke area teduh yang disepakati lebih awal dengan planner atau venue Anda — keselamatan musisi dan instrumen diutamakan. Hujan bukan alasan pembatalan.',
			),
		],
		[
			'p',
			L(
				`Force majeure (natural disaster, official closure of the airport or access, a government restriction on events, epidemic, civil unrest): everything you have paid becomes full credit for a new date until ${f.date(p.creditUntil)}, at no charge. If no suitable date works, we refund your payments less costs already incurred that cannot be recovered.`,
				`Keadaan memaksa (bencana alam, penutupan resmi bandara atau akses, larangan acara oleh pemerintah, epidemi, kerusuhan): seluruh pembayaran menjadi kredit penuh untuk tanggal baru hingga ${f.date(p.creditUntil)}, tanpa biaya. Bila tidak ada tanggal yang cocok, kami kembalikan pembayaran dikurangi biaya yang sudah keluar dan tidak dapat ditarik kembali.`,
			),
		],

		['h2', '7', L('Agreement', 'Persetujuan')],
		[
			'p',
			L(
				`Reply on WhatsApp: “We agree to the booking terms” — or sign below — then transfer your ${payWord}.`,
				`Balas di WhatsApp: "Kami setuju dengan ketentuan booking" — atau tanda tangani di bawah — lalu transfer ${payWord}.`,
			),
		],
		[
			'sign',
			[
				`${L('Couple', 'Pasangan')} · ${L('Date', 'Tanggal')}`,
				`Allegra Chamber Bali · ${L('Date', 'Tanggal')}`,
			],
		],
		[
			'foot',
			`${L('Terms version', 'Ketentuan versi')} ${TERMS.version} · ${t.reference} · allegrachamberbali.com · allegrachamberbali@gmail.com`,
		],
	].filter(Boolean)
}

// ---------- Booking Terms PDF layout (Google Docs) ----------

const PALETTE = { ink: '#1E1C19', muted: '#6D665C', gold: '#C2A36B', sage: '#3E5247', line: '#E4DDD1' }
// Brand fonts first; if Google Docs refuses them, the whole document falls back to Georgia / Arial.
const FONTS = { serif: 'Cormorant Garamond', sans: 'Inter' }

function style_(el, s) {
	const A = DocumentApp.Attribute
	const a = {}
	a[A.FONT_FAMILY] = s.serif ? FONTS.serif : FONTS.sans
	a[A.FONT_SIZE] = s.size || 9
	a[A.FOREGROUND_COLOR] = s.color || PALETTE.ink
	a[A.BOLD] = !!s.bold
	a[A.ITALIC] = !!s.italic
	if (s.before !== undefined) a[A.SPACING_BEFORE] = s.before
	if (s.after !== undefined) a[A.SPACING_AFTER] = s.after
	if (s.indent !== undefined) a[A.INDENT_START] = s.indent
	if (s.indent !== undefined) a[A.INDENT_FIRST_LINE] = s.indent
	if (s.right) a[A.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.RIGHT
	a[A.LINE_SPACING] = s.lineSpacing || 1.15
	try {
		el.setAttributes(a)
	} catch (err) {
		if (FONTS.serif === 'Georgia') throw err
		FONTS.serif = 'Georgia'
		FONTS.sans = 'Arial'
		style_(el, s)
	}
	return el
}

function renderDoc_(doc, blocks) {
	const body = doc.getBody()
	// A4 in points, with roughly 17 mm side margins.
	body.setPageWidth(595.3).setPageHeight(841.9)
	body.setMarginTop(42).setMarginBottom(40).setMarginLeft(48).setMarginRight(48)
	const para = (text, s) => style_(body.appendParagraph(text), Object.assign({ after: 3 }, s))
	const table = (rows, opt) => {
		const t = body.appendTable(rows)
		// White borders stand in for "no border" on the meta and signature tables.
		t.setBorderWidth(0.5).setBorderColor(opt.border ? PALETTE.line : '#FFFFFF')
		rows.forEach((row, i) =>
			row.forEach((_, j) => {
				const cell = t.getRow(i).getCell(j)
				cell
					.setPaddingTop(2.5)
					.setPaddingBottom(2.5)
					.setPaddingLeft(opt.border ? 5 : 0)
					.setPaddingRight(5)
				const right = opt.amountCol !== undefined && j === opt.amountCol
				const head = opt.head && i === 0
				const total = opt.total && i === rows.length - 1
				style_(cell.getChild(0).asParagraph(), {
					right,
					bold: total,
					size: head ? 7 : 9,
					color: head || (opt.labelCol && j === 0) ? PALETTE.muted : PALETTE.ink,
					after: 0,
				})
			}),
		)
		if (opt.widths) opt.widths.forEach((w, j) => w && t.setColumnWidth(j, w))
		return t
	}

	blocks.forEach((b) => {
		const kind = b[0]
		if (kind === 'wordmark') {
			para('Allegra', { serif: true, size: 20, after: 0 })
			para('CHAMBER BALI', { size: 6.5, color: PALETTE.muted, after: 10 })
		} else if (kind === 'title') para(b[1], { serif: true, size: 26, after: 10 })
		else if (kind === 'eyebrow') para(b[1].toUpperCase(), { size: 7, color: PALETTE.muted, after: 2 })
		else if (kind === 'meta') table(b[1], { labelCol: true, widths: [120] })
		else if (kind === 'intro')
			para(b[1], { serif: true, italic: true, size: 12.5, color: PALETTE.sage, before: 10 })
		else if (kind === 'h2') {
			const h = para(`${b[1]}   ${b[2]}`, { serif: true, size: 14, before: 14, after: 4 })
			h.editAsText().setForegroundColor(0, b[1].length - 1, PALETTE.gold)
		} else if (kind === 'p') para(b[1], {})
		else if (kind === 'muted') para(b[1], { color: PALETTE.muted })
		else if (kind === 'box') para(b[1], { color: PALETTE.sage, italic: true, indent: 12, before: 4 })
		else if (kind === 'list') b[1].forEach((item) => para(`·  ${item}`, { indent: 10, after: 2 }))
		else if (kind === 'how') {
			b[1].forEach(([k, v]) => {
				para(k, { bold: true, before: 4, after: 0 })
				para(v, {})
			})
		} else if (kind === 'pairs') table(b[1], { border: true, labelCol: true, widths: [130] })
		else if (kind === 'prices')
			table(b[1].concat([b[2]]), { border: true, amountCol: 1, total: true, widths: [0, 120] })
		else if (kind === 'schedule') table(b[1], { border: true, amountCol: 2, widths: [0, 150, 110] })
		else if (kind === 'cancel') table([b[1]].concat(b[2]), { border: true, head: true, widths: [175] })
		else if (kind === 'sign') {
			para('', { before: 18 })
			table([['______________________________', '______________________________'], b[1]], {})
		} else if (kind === 'foot') para(b[1], { size: 7, color: PALETTE.muted, before: 16 })
	})
	// A new Doc starts with one empty paragraph; drop it now that the content follows it.
	const first = body.getChild(0)
	if (first.getType() === DocumentApp.ElementType.PARAGRAPH && !first.asParagraph().getText()) {
		first.removeFromParent()
	}
}
