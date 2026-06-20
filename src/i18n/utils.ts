import { ui } from './ui'
import { defaultLang, type Lang } from './languages'
import { withTrailingSlash } from '../lib/site'

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split('/')
	if (maybeLang in ui) return maybeLang as Lang
	return defaultLang
}

/** Swaps the locale segment of a path while keeping the rest of the route. */
export function getLocalizedPath(path: string, lang: Lang): string {
	const stripped = path.replace(/^\/(en|id)(\/|$)/, '/')
	if (lang === defaultLang) return withTrailingSlash(stripped)
	return stripped === '/' ? '/id/' : withTrailingSlash(`/id${stripped}`)
}

export function useTranslations(lang: Lang) {
	return function t<K extends keyof typeof ui.en>(key: K): (typeof ui)[Lang][K] {
		return ui[lang][key] ?? ui[defaultLang][key]
	}
}
