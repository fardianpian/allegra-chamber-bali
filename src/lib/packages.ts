import { getCollection } from 'astro:content'
import type { Lang } from '../i18n/languages'

// Formation entries for one locale. EN lives at src/content/packages/<file>.md, the Indonesian
// translation at src/content/packages/id/<file>.md (same pattern as the articles collection) —
// always filter by locale, or every formation shows up twice.
export async function getPackages(lang: Lang) {
	const entries = await getCollection('packages', ({ slug }) =>
		lang === 'id' ? slug.startsWith('id/') : !slug.startsWith('id/'),
	)
	return entries.sort((a, b) => a.data.order - b.data.order)
}
