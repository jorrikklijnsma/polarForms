import i18n from 'sveltekit-i18n';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			routes: ['/'], // you can use regexes as well!
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'en',
			key: 'questions',
			routes: ['/questions'],
			loader: async () => (await import('./en/questions.json')).default
		},
		{
			locale: 'nl',
			key: 'common',
			loader: async () => (await import('./nl/common.json')).default
		},
		{
			locale: 'nl',
			key: 'home',
			routes: ['/'],
			loader: async () => (await import('./nl/home.json')).default
		},
		{
			locale: 'nl',
			key: 'questions',
			routes: ['/questions'],
			loader: async () => (await import('./nl/questions.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	loadTranslations,
	addTranslations,
	translations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(
	($loading) => $loading && console.log('Loading translations for the main instance...')
);
