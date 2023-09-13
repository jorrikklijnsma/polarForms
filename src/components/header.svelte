<script lang="ts">
	import { questionsStore } from '../data/questions';

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
			<li><a href="/">Home</a></li>
			<li><a href="/questions">Questions</a></li>
			<li><a href="/question-list">Question list</a></li>
			<li><a href="/chart">Chart</a></li>
			<li><button on:click={exportQuestions} class="export-button">Export</button></li>
			<li><button on:click={importQuestions}>Import</button></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: var(--xanthous);
		color: #fff;

		h1 {
			font-size: 2rem;
		}

		nav {
			ul {
				display: flex;
				flex-wrap: wrap;
				list-style: none;
				gap: 2rem 1rem;

				li {
					a,
					button {
						display: block;
						background: var(--quinacridone-magenta);
						text-align: center;
						border-radius: 0.25rem;
						color: #fff;
						text-decoration: none;
						font-size: 1.25rem;
						padding: 0.5rem 1rem;
						word-break: keep-all;
						position: relative;

						&:hover {
							background: var(--raspberry);
						}
					}

					button {
						outline: none;
						border: none;
						cursor: pointer;

						&.export-button {
							margin-left: 4rem;

							&::before {
								content: '';
								display: block;
								position: absolute;
								left: -2.5rem;
								top: 0;
								background: rgba(255, 255, 255, 0.3);
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
