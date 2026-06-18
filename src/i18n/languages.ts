export const defaultLang = 'en' as const

export const languages = {
	en: 'English',
	id: 'Indonesia',
} as const

export type Lang = keyof typeof languages
