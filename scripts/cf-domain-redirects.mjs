#!/usr/bin/env node
// One-off infra script for the 2026-10 domain move (docs/DOMAIN-MIGRATION-2026-10.md step 5):
// creates an account-level Bulk Redirect list + rule that 301s the old hostnames to
// https://allegrachamberbali.com, keeping path and query. Idempotent: re-running reuses the
// existing list and rule instead of duplicating them.
//
// Run from the repo root (needs CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_OPS_API_TOKEN in .env):
//   node --env-file=.env scripts/cf-domain-redirects.mjs
const account = process.env.CLOUDFLARE_ACCOUNT_ID?.trim()
const token = process.env.CLOUDFLARE_OPS_API_TOKEN?.trim()
if (!account || !token) {
	console.error('Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_OPS_API_TOKEN in .env')
	process.exit(1)
}

const LIST_NAME = 'allegra_domain_migration'
const TARGET = 'https://allegrachamberbali.com/'
// include_subdomains stays false: on the pages.dev row it would also redirect PR preview
// deploys (<branch>.allegra-chamber-bali.pages.dev) to production.
const SOURCES = [
	'allegra.indonesiaistimewastudio.id/',
	'allegra-chamber-bali.pages.dev/',
	'www.allegrachamberbali.com/',
]
const OPTIONS = {
	status_code: 301,
	preserve_query_string: true,
	subpath_matching: true,
	preserve_path_suffix: true,
	include_subdomains: false,
}

async function api(path, init = {}) {
	const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
		...init,
		headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
	})
	return res.json()
}

function fail(step, body) {
	console.error(`${step} failed:`, JSON.stringify(body.errors ?? body))
	process.exit(1)
}

// 1. List (reuse if present)
const lists = await api(`/accounts/${account}/rules/lists`)
if (!lists.success) fail('read lists', lists)
let list = lists.result.find((l) => l.name === LIST_NAME)
if (!list) {
	const created = await api(`/accounts/${account}/rules/lists`, {
		method: 'POST',
		body: JSON.stringify({
			name: LIST_NAME,
			kind: 'redirect',
			description: '301s to allegrachamberbali.com (domain move 2026-10-07)',
		}),
	})
	if (!created.success) fail('create list', created)
	list = created.result
	console.log('list created:', list.id)
} else {
	console.log('list exists:', list.id)
}

// 2. Items — PUT replaces the list contents, so re-runs stay exact.
const items = SOURCES.map((source_url) => ({ redirect: { source_url, target_url: TARGET, ...OPTIONS } }))
const put = await api(`/accounts/${account}/rules/lists/${list.id}/items`, {
	method: 'PUT',
	body: JSON.stringify(items),
})
if (!put.success) fail('write items', put)
for (let i = 0; i < 20; i++) {
	const op = await api(`/accounts/${account}/rules/lists/bulk_operations/${put.result.operation_id}`)
	if (op.result?.status === 'completed') break
	if (op.result?.status === 'failed') fail('items operation', op.result)
	await new Promise((r) => setTimeout(r, 1500))
}

// 3. Rule in the account-level http_request_redirect entrypoint (create or append once)
const rule = {
	expression: `http.request.full_uri in $${LIST_NAME}`,
	description: 'Allegra domain migration 301s',
	action: 'redirect',
	action_parameters: { from_list: { name: LIST_NAME, key: 'http.request.full_uri' } },
}
const entry = await api(`/accounts/${account}/rulesets/phases/http_request_redirect/entrypoint`)
if (entry.success) {
	const existing = entry.result.rules ?? []
	if (existing.some((r) => r.expression === rule.expression)) {
		console.log('rule exists in entrypoint', entry.result.id)
	} else {
		const updated = await api(`/accounts/${account}/rulesets/${entry.result.id}`, {
			method: 'PUT',
			body: JSON.stringify({ rules: [...existing.map(({ id, ref, ...r }) => ({ id, ...r })), rule] }),
		})
		if (!updated.success) fail('update ruleset', updated)
		console.log('rule added to entrypoint', entry.result.id)
	}
} else {
	const created = await api(`/accounts/${account}/rulesets`, {
		method: 'POST',
		body: JSON.stringify({ name: 'default', kind: 'root', phase: 'http_request_redirect', rules: [rule] }),
	})
	if (!created.success) fail('create ruleset', created)
	console.log('ruleset created:', created.result.id)
}

const check = await api(`/accounts/${account}/rules/lists/${list.id}/items`)
for (const { redirect: r } of check.result ?? []) {
	console.log(`  ${r.source_url} -> ${r.target_url} ${r.status_code} (subdomains: ${r.include_subdomains})`)
}
console.log('done — verify with curl (docs/DOMAIN-MIGRATION-2026-10.md step 5)')
