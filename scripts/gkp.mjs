#!/usr/bin/env node
// Pulls Google Keyword Planner data via the Google Ads API (KeywordPlanIdeaService) and
// writes it to docs/data/gkp-<YYYY-MM>-<name>.csv — same leading columns as the manual
// UI exports already in docs/data/, plus one searches_<YYYY_MM> column per month for
// seasonality. A <same-name>.meta.json sidecar records the run settings (locations,
// language, network, seeds), which the manual exports never captured.
//
// Usage:
//   npm run gkp -- --name a-vendor --seeds "wedding string quartet, wedding pianist bali"
//   npm run gkp -- --name venues --seeds-file seeds.txt --geo 2360 --lang 1000
//   npm run gkp -- --name site --url https://allegra.indonesiaistimewastudio.id/packages
//   npm run gkp -- --name check --mode metrics --seeds-file keywords.txt
//
// Modes:
//   ideas   (default) GenerateKeywordIdeas — expands up to 20 seed keywords and/or a URL.
//   metrics GenerateKeywordHistoricalMetrics — volume for an exact list (no expansion).
//
// Defaults mirror the manual runs in docs/KEYWORD-MAP-2026-09.md § 8: Australia, UK, US,
// Singapore · English · Google Search only. Geo IDs: developers.google.com/google-ads/api/data/geotargets
// (Indonesia 2360) · language IDs: .../api/data/codes-formats#languages (Indonesian 1025).
//
// Requires the GOOGLE_ADS_* variables in .env — see .env.example. Developer tokens were
// sunset on 2026-09-09: the API access level now belongs to the Google Cloud project that
// owns the OAuth client, and it needs Basic or higher (Test and Explorer block
// KeywordPlanIdeaService). Apply at console.cloud.google.com/google/ads-apis/overview.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'

const { values: args } = parseArgs({
	options: {
		name: { type: 'string' },
		mode: { type: 'string', default: 'ideas' },
		seeds: { type: 'string' },
		'seeds-file': { type: 'string' },
		url: { type: 'string' },
		geo: { type: 'string', default: '2036,2826,2840,2702' },
		lang: { type: 'string', default: '1000' },
		network: { type: 'string', default: 'GOOGLE_SEARCH' },
		out: { type: 'string' },
	},
})

const fail = (message) => {
	console.error(message)
	process.exit(1)
}

const env = process.env
const required = [
	'GOOGLE_ADS_CLIENT_ID',
	'GOOGLE_ADS_CLIENT_SECRET',
	'GOOGLE_ADS_REFRESH_TOKEN',
	'GOOGLE_ADS_CUSTOMER_ID',
]
const missing = required.filter((key) => !env[key])
if (missing.length)
	fail(`Missing ${missing.join(', ')} — see .env.example (refresh token: npm run gkp:auth).`)

if (!args.name && !args.out)
	fail('Pass --name <run-name> (output: docs/data/gkp-<YYYY-MM>-<name>.csv) or --out.')
if (!['ideas', 'metrics'].includes(args.mode)) fail('--mode must be "ideas" or "metrics".')

const seeds = [
	...(args.seeds ? args.seeds.split(',') : []),
	...(args['seeds-file'] ? (await readFile(args['seeds-file'], 'utf8')).split('\n') : []),
]
	.map((s) => s.trim())
	.filter(Boolean)

if (args.mode === 'ideas') {
	if (!seeds.length && !args.url) fail('ideas mode needs --seeds/--seeds-file and/or --url.')
	if (seeds.length > 20) fail(`ideas mode accepts at most 20 seed keywords (got ${seeds.length}).`)
} else {
	if (!seeds.length) fail('metrics mode needs --seeds/--seeds-file.')
	if (seeds.length > 10000) fail(`metrics mode accepts at most 10,000 keywords (got ${seeds.length}).`)
}

const API_VERSION = env.GOOGLE_ADS_API_VERSION || 'v25'
const customerId = env.GOOGLE_ADS_CUSTOMER_ID.replaceAll('-', '')
const loginCustomerId = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replaceAll('-', '')
const geoIds = args.geo.split(',').map((g) => g.trim())

async function getAccessToken() {
	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: env.GOOGLE_ADS_CLIENT_ID,
			client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
			refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
			grant_type: 'refresh_token',
		}),
	})
	const body = await res.json()
	if (!body.access_token) {
		// invalid_grant usually means the refresh token expired — OAuth apps left in
		// "Testing" publishing status get tokens that die after 7 days.
		fail(`OAuth refresh failed: ${body.error} ${body.error_description ?? ''} — rerun npm run gkp:auth.`)
	}
	return body.access_token
}

const accessToken = await getAccessToken()

async function ads(method, body) {
	const res = await fetch(
		`https://googleads.googleapis.com/${API_VERSION}/customers/${customerId}${method}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				// Optional since the 2026-09-09 developer token sunset — the API ignores it.
				...(env.GOOGLE_ADS_DEVELOPER_TOKEN && { 'developer-token': env.GOOGLE_ADS_DEVELOPER_TOKEN }),
				...(loginCustomerId && { 'login-customer-id': loginCustomerId }),
			},
			body: JSON.stringify(body),
		},
	)
	const text = await res.text()
	if (!res.ok) fail(`Google Ads API ${res.status} on ${method}:\n${text}`)
	return JSON.parse(text)
}

// Bid columns are named after the account currency instead of assuming IDR.
const currencyRes = await ads('/googleAds:search', { query: 'SELECT customer.currency_code FROM customer' })
const currency = currencyRes.results?.[0]?.customer?.currencyCode ?? 'XXX'

const common = {
	language: `languageConstants/${args.lang}`,
	geoTargetConstants: geoIds.map((id) => `geoTargetConstants/${id}`),
	keywordPlanNetwork: args.network,
	includeAdultKeywords: false,
}

let rows = []
if (args.mode === 'ideas') {
	const seed =
		seeds.length && args.url
			? { keywordAndUrlSeed: { url: args.url, keywords: seeds } }
			: seeds.length
				? { keywordSeed: { keywords: seeds } }
				: { urlSeed: { url: args.url } }
	let pageToken
	do {
		const res = await ads(':generateKeywordIdeas', { ...common, ...seed, pageSize: 1000, pageToken })
		rows.push(...(res.results ?? []).map((r) => ({ text: r.text, metrics: r.keywordIdeaMetrics })))
		pageToken = res.nextPageToken
		// Keyword planning endpoints are rate-limited per customer — keep paging gentle.
		if (pageToken) await new Promise((r) => setTimeout(r, 1000))
	} while (pageToken)
} else {
	const res = await ads(':generateKeywordHistoricalMetrics', { ...common, keywords: seeds })
	rows = (res.results ?? []).map((r) => ({ text: r.text, metrics: r.keywordMetrics }))
}

// Matches the Indonesian UI labels in the existing manual exports.
const COMPETITION = { LOW: 'Rendah', MEDIUM: 'Menengah', HIGH: 'Tinggi' }
const MONTHS = [
	'JANUARY',
	'FEBRUARY',
	'MARCH',
	'APRIL',
	'MAY',
	'JUNE',
	'JULY',
	'AUGUST',
	'SEPTEMBER',
	'OCTOBER',
	'NOVEMBER',
	'DECEMBER',
]
const monthKey = (m) => `${m.year}_${String(MONTHS.indexOf(m.month) + 1).padStart(2, '0')}`
const micros = (v) => (v == null ? '' : (Number(v) / 1e6).toFixed(2))
const pctChange = (from, to) => (from ? `${Math.round(((to - from) / from) * 100)}%` : '')

const monthCols = [
	...new Set(rows.flatMap((r) => (r.metrics?.monthlySearchVolumes ?? []).map(monthKey))),
].sort()

const records = rows.map(({ text, metrics = {} }) => {
	const volumes = new Map(
		(metrics.monthlySearchVolumes ?? []).map((m) => [monthKey(m), Number(m.monthlySearches ?? 0)]),
	)
	const series = monthCols.map((k) => volumes.get(k) ?? 0)
	const last = series.at(-1)
	return {
		keyword: text,
		avg_monthly_searches: Number(metrics.avgMonthlySearches ?? 0),
		// Same definitions as the Keyword Planner UI: latest month vs 3 months earlier, and
		// vs the same month a year earlier (only computable when 13+ months are returned).
		three_month_change: series.length >= 4 ? pctChange(series.at(-4), last) : '',
		yoy_change: series.length >= 13 ? pctChange(series.at(-13), last) : '',
		competition: COMPETITION[metrics.competition] ?? '',
		competition_index: metrics.competitionIndex ?? '',
		[`top_bid_low_${currency.toLowerCase()}`]: micros(metrics.lowTopOfPageBidMicros),
		[`top_bid_high_${currency.toLowerCase()}`]: micros(metrics.highTopOfPageBidMicros),
		...Object.fromEntries(monthCols.map((k, i) => [`searches_${k}`, series[i]])),
	}
})
records.sort((a, b) => b.avg_monthly_searches - a.avg_monthly_searches)

const csvCell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replaceAll('"', '""')}"` : String(v))
const headers = records.length
	? Object.keys(records[0])
	: ['keyword', 'avg_monthly_searches', 'three_month_change', 'yoy_change', 'competition']
const csv = [headers, ...records.map((r) => headers.map((h) => r[h]))]
	.map((line) => line.map(csvCell).join(','))
	.join('\n')

const outPath =
	args.out ?? path.join('docs', 'data', `gkp-${new Date().toISOString().slice(0, 7)}-${args.name}.csv`)
await mkdir(path.dirname(outPath), { recursive: true })
await writeFile(outPath, `${csv}\n`)
await writeFile(
	outPath.replace(/\.csv$/, '.meta.json'),
	`${JSON.stringify(
		{
			generated_at: new Date().toISOString(),
			source: `Google Ads API ${API_VERSION} (${args.mode === 'ideas' ? 'GenerateKeywordIdeas' : 'GenerateKeywordHistoricalMetrics'})`,
			seeds,
			url: args.url ?? null,
			geo_target_constants: geoIds,
			language_constant: args.lang,
			network: args.network,
			currency,
			rows: records.length,
		},
		null,
		'\t',
	)}\n`,
)

console.log(`✓ ${records.length} keyword → ${outPath}`)
