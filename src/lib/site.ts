// Site-wide config sourced from env (see .env.example). Falls back to safe
// placeholders so `npm run build` works before the owner fills real values.
export const site = {
	url: import.meta.env.PUBLIC_SITE_URL || 'https://allegra.indonesiaistimewastudio.id',
	whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '62XXXXXXXXXXX',
	contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'allegra@indonesiaistimewastudio.id',
	instagram: import.meta.env.PUBLIC_INSTAGRAM || 'https://instagram.com',
	web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY || '',
}

/** Builds a wa.me deep-link with a pre-filled message. */
export function waLink(message: string): string {
	return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}
