<script lang="ts">
	import { page } from '$app/stores';
	import { questionsStore } from '../data/questions';
	import Button from './button.svelte';
	import { t, locales, locale } from '$lib/translations';

	const handleChange = ({ currentTarget }: { currentTarget: HTMLSelectElement }) => {
		console.log(
			`changing language to "${currentTarget.value}" from list of languages ${$locales.join(', ')}`
		);
		const { value } = currentTarget;

		document.cookie = `lang=${value} ;path=/;max-age=31536000`;
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
	];

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
			<li>
				<Button buttonType="empty" buttonClickedEvent={exportQuestions}
					>{$t('common.export')}</Button
				>
			</li>
			<li>
				<Button buttonType="empty" buttonClickedEvent={importQuestions}
					>{$t('common.import')}</Button
				>
			</li>
			<li>
				<select bind:value={$locale} on:change={handleChange}>
					{#each $locales as value}
						<option {value}>{$t(`lang.${value}`)}</option>
					{/each}
				</select>
			</li>
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

					select {
						padding: 0.5rem;
						border-radius: 4px;
						outline: none;
						border: none;

						&:focus {
							box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
						}

						&:hover {
							box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 2px var(--teal);
							cursor: pointer;
						}

						option {
							background: var(--white);
							color: var(--black);
						}
					}

					&::before {
						content: '';
						display: block;
						background: var(--white);
						height: 100%;
						width: 1px;
						margin-right: 3rem;
					}
				}
			}
		}
	}
</style>
