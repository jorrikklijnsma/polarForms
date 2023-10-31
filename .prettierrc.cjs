// prettierrc.js
module.exports = {
	printWidth: 80,
	tabWidth: 2,
	useTabs: false,
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	jsxBracketSameLine: false,
	arrowParens: 'avoid',
	proseWrap: 'preserve',
	htmlWhitespaceSensitivity: 'css',
	endOfLine: 'lf',
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte'],
	pluginSearchDirs: ['.'],
	overrides: [{ 'files': '*.svelte', 'options': { 'parser': 'svelte' } }]
};
