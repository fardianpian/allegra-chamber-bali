import { site, withTrailingSlash } from './site'
import type { Lang } from '../i18n/languages'

/** MusicGroup + LocalBusiness JSON-LD for the homepage, per CLAUDE.md §5. */
export function getHomeJsonLd(lang: Lang) {
	const path = lang === 'en' ? '/' : '/id/'
	const url = new URL(path, site.url).toString()
	const description =
		lang === 'en'
			? 'Live chamber and string ensemble performing at weddings across Bali — solo, duo, trio, string quartet, and large ensemble formations.'
			: 'Ensemble chamber dan string live untuk pernikahan di seluruh Bali — formasi solo, duo, trio, string quartet, dan large ensemble.'

	return [
		{
			'@context': 'https://schema.org',
			'@type': 'MusicGroup',
			name: 'Allegra Chamber Bali',
			url,
			genre: ['Classical', 'Chamber Music', 'Wedding Music'],
			description,
			sameAs: [site.instagram],
		},
		{
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: 'Allegra Chamber Bali',
			url,
			description,
			email: site.contactEmail,
			telephone: `+${site.whatsappNumber}`,
			areaServed: 'Bali, Indonesia',
			address: {
				'@type': 'PostalAddress',
				addressRegion: 'Bali',
				addressCountry: 'ID',
			},
			sameAs: [site.instagram],
		},
	]
}

/** FAQPage JSON-LD for the FAQ page, per CLAUDE.md §5. */
export function getFaqJsonLd(items: readonly { question: string; answer: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	}
}

/** Article JSON-LD for Journal posts — GEO/AEO citability signal (author, dates, publisher). */
export function getArticleJsonLd(
	lang: Lang,
	article: {
		title: string
		description: string
		path: string
		pubDate: Date
		updatedDate?: Date
		ogImage?: string
	},
) {
	const url = new URL(withTrailingSlash(article.path), site.url).toString()
	const imageUrl = article.ogImage
		? new URL(article.ogImage, site.url).toString()
		: new URL('/images/og-default.jpg', site.url).toString()

	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.description,
		image: imageUrl,
		datePublished: article.pubDate.toISOString(),
		dateModified: (article.updatedDate ?? article.pubDate).toISOString(),
		inLanguage: lang,
		mainEntityOfPage: url,
		author: {
			'@type': 'Organization',
			name: 'Allegra Chamber Bali',
			url: site.url,
		},
		publisher: {
			'@type': 'Organization',
			name: 'Allegra Chamber Bali',
			url: site.url,
			sameAs: [site.instagram],
		},
	}
}

/** BreadcrumbList JSON-LD for inner pages, per CLAUDE.md §5. */
export function getBreadcrumbJsonLd(lang: Lang, items: { name: string; path: string }[]) {
	const home = lang === 'en' ? '/' : '/id'
	const homeName = lang === 'en' ? 'Home' : 'Beranda'
	const crumbs = [{ name: homeName, path: home }, ...items]

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: new URL(withTrailingSlash(crumb.path), site.url).toString(),
		})),
	}
}
