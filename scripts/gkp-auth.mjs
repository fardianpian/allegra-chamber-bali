#!/usr/bin/env node
// One-time OAuth flow for the Google Ads API (used by scripts/gkp.mjs). Opens a
// loopback server on 127.0.0.1, prints the Google consent URL, exchanges the returned
// code for a refresh token and writes it straight into .env as GOOGLE_ADS_REFRESH_TOKEN
// (never printed, so it doesn't end up in terminal scrollback or a Claude transcript).
//
// Usage:
//   npm run gkp:auth
//
// Requires GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET (OAuth client of type
// "Desktop app") in .env — see .env.example.

import http from 'node:http'
import { randomBytes } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const clientId = process.env.GOOGLE_ADS_CLIENT_ID
const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET

if (!clientId || !clientSecret) {
	console.error('Missing GOOGLE_ADS_CLIENT_ID or GOOGLE_ADS_CLIENT_SECRET — see .env.example.')
	process.exit(1)
}

const SCOPE = 'https://www.googleapis.com/auth/adwords'
const state = randomBytes(16).toString('hex')
let redirectUri

async function upsertEnv(key, value) {
	const file = '.env'
	const current = await readFile(file, 'utf8').catch(() => '')
	const line = `${key}=${value}`
	const pattern = new RegExp(`^${key}=.*$`, 'm')
	const next = pattern.test(current)
		? current.replace(pattern, line)
		: `${current}${current.endsWith('\n') || !current ? '' : '\n'}${line}\n`
	await writeFile(file, next)
}

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url, redirectUri)
	if (url.pathname !== '/') {
		res.writeHead(404).end()
		return
	}
	const finish = (status, message) => {
		res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(message)
		server.close()
	}

	if (url.searchParams.get('state') !== state) return finish(400, 'State mismatch — jalankan ulang.')
	if (url.searchParams.get('error')) {
		console.error(`Consent ditolak: ${url.searchParams.get('error')}`)
		process.exitCode = 1
		return finish(400, 'Consent ditolak. Kembali ke terminal.')
	}

	const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			code: url.searchParams.get('code'),
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code',
		}),
	})
	const token = await tokenRes.json()

	if (!token.refresh_token) {
		console.error('Tidak ada refresh_token di respons:', token.error_description || token.error || token)
		process.exitCode = 1
		return finish(500, 'Gagal mendapatkan refresh token. Kembali ke terminal.')
	}

	await upsertEnv('GOOGLE_ADS_REFRESH_TOKEN', token.refresh_token)
	console.log('✓ GOOGLE_ADS_REFRESH_TOKEN tersimpan di .env')
	finish(200, 'Berhasil. Refresh token tersimpan di .env — tab ini boleh ditutup.')
})

server.listen(0, '127.0.0.1', () => {
	redirectUri = `http://127.0.0.1:${server.address().port}`
	const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
	authUrl.search = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: SCOPE,
		access_type: 'offline',
		// Forces a fresh refresh_token even if this Google account consented before.
		prompt: 'consent',
		state,
	})
	console.log('Buka URL ini di browser, login dengan akun Google yang punya akses Google Ads:\n')
	console.log(authUrl.toString())
	console.log('\nMenunggu redirect…')
})
