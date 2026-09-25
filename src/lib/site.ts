// Site-wide config sourced from env (see .env.example). Falls back to safe
// placeholders so `npm run build` works before the owner fills real values.
// Env values are trimmed: a trailing newline pasted into a dashboard env var (found 2026-09-25 on
// PUBLIC_SITE_URL in Cloudflare Pages) otherwise leaks verbatim into JSON-LD `url` fields.
const env = (value: string | undefined) => value?.trim() || undefined

export const site = {
	url: env(import.meta.env.PUBLIC_SITE_URL) || 'https://allegra.indonesiaistimewastudio.id',
	whatsappNumber: env(import.meta.env.PUBLIC_WHATSAPP_NUMBER) || '62XXXXXXXXXXX',
	contactEmail: env(import.meta.env.PUBLIC_CONTACT_EMAIL) || 'allegrachamberbali@gmail.com',
	instagram: env(import.meta.env.PUBLIC_INSTAGRAM) || 'https://instagram.com',
	web3formsKey: env(import.meta.env.PUBLIC_WEB3FORMS_KEY) || '',
	ga4Id: env(import.meta.env.PUBLIC_GA4_ID) || 'G-BN64LSJGQV',
}

/** Builds a wa.me deep-link with a pre-filled message. */
export function waLink(message: string): string {
	return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Ensures a path ends with `/` (root "/" is left as-is) — the build emits directory-style
 * `/page/index.html`, so an internal link missing the trailing slash costs a 308 redirect hop. */
export function withTrailingSlash(path: string): string {
	return path === '/' || path.endsWith('/') ? path : `${path}/`
}
