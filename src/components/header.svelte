<script lang="ts">
  import { page } from '$app/stores';
	import { questionsStore } from '../data/questions';
	import Button from './button.svelte';

	const pageLinks = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Questions',
			url: '/questions'
		},
		{
			name: 'Question list',
			url: '/question-list'
		},
		{
			name: 'Chart',
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
	<h1>Polar Forms</h1>
	<nav>
		<ul>
			{#each pageLinks as link}
				<li>
					<Button buttonType="empty" isActive={$page.url.pathname === link.url}>
						<a href={link.url}>{link.name}</a>
					</Button>
				</li>
			{/each}
			<li><Button buttonType="link" on:click={exportQuestions} class="export-button">Export</Button></li>
			<li><Button buttonType="link" on:click={importQuestions}>Import</Button></li>
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
			ul {
				display: flex;
				flex-wrap: wrap;
				list-style: none;
				gap: 2rem 1rem;

				li {
					button {
						&.export-button {
							margin-left: 4rem;

							&::before {
								content: '';
								display: block;
								position: absolute;
								left: -2.5rem;
								top: 0;
								background: var(--white);
								height: 40px;
								width: 2px;
							}
						}
					}
				}
			}
		}
	}
</style>
