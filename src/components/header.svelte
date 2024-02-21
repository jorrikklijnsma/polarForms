<script lang="ts">
  import { page } from '$app/stores';
	import { questionsStore } from '../data/questions';
	import Button from './button.svelte';
  import { t, locales, locale } from '$lib/translations';

	let nonActiveLocale = $locale === $locales[0] ? $locales[1] : $locales[0];

	const changeLanguage = () => {
		console.log(`changing language to "${nonActiveLocale}" from list of languages ${$locales.join(', ')}`);
		// update cookie
		document.cookie = `locale=${nonActiveLocale};path=/;max-age=31536000`;

		locale.set(nonActiveLocale);
		nonActiveLocale = $locale;
	};

	const pageLinks = [
		{
			name: 'home',
			url: '/'
		},
		{
			name: 'questions',
			url: '/questions'
		},
		{
			name: 'question_list',
			url: '/question-list'
		},
		{
			name: 'chart',
			url: '/chart'
		}
	]

	const exportQuestions = () => {
		const questions = JSON.stringify($questionsStore);
		const blob = new Blob([questions], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'questions.json';
		a.click();
	};

	const importQuestions = async () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json';
		input.click();
		input.onchange = async () => {
			const file = input.files?.[0];
			if (!file) {
				return;
			}

			const text = await file.text();
			const questions = JSON.parse(text);
			questionsStore.set(questions);
		};
	};
</script>

<header>
	<h1>{$t('common.title')}</h1>
	<nav>
		<ul>
			{#each pageLinks as link}
			<li>
				<Button buttonType={$page.url.pathname === link.url ? '' : 'empty'}>
					<a href={link.url}>{$t(`common.${link.name}`)}</a>
				</Button>
			</li>
			{/each}
		</ul>
		<ul class="import-export">
			<li><Button buttonType="empty" buttonClickedEvent={exportQuestions}>{$t('common.export')}</Button></li>
			<li><Button buttonType="empty" buttonClickedEvent={importQuestions}>{$t('common.import')}</Button></li>
			<li><Button buttonType="empty" size="small" on:buttonClickedEvent={() => {changeLanguage()}}>{`${$locales[0]} / ${$locales[1]}`	}</Button></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: var(--light-blue);
		color: var(--black);

		h1 {
			font-size: 2rem;
			color: var(--teal);
		}

		nav {
			display: flex;
			flex-wrap: wrap;

			ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				list-style: none;
				gap: 2rem 1rem;

				&.import-export {
					margin-left: 2rem;

					&::before {
						content: '';
						display: block;
						background: var(--white);
						height: 100%;
						width: 1px;
						margin-right: 3rem;;
					}
				}
			}
		}
	}
</style>
