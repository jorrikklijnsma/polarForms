<script lang="ts">
	import { questionsStore, answerOptions, categoryColors } from '../../data/questions';
	import type { Question, Category } from '../../data/questions';
	import { onMount, onDestroy } from 'svelte';
	import { clearAnswers } from '../../utils/clear-answers';

	let selectedQuestion: Question | undefined = undefined;
	let isModalOpen: boolean = false;

	// Create a key to answer value mapping
	let keyAnswerMap: Record<string, number> = {};
	answerOptions.forEach((option, index) => {
		keyAnswerMap[option.text.at(0)!.toString().toLowerCase()] = option.value;
	});

	const openModal = (question: Question) => {
		selectedQuestion = question;
		isModalOpen = true;
	};

	const closeModal = () => {
		isModalOpen = false;
		selectedQuestion = undefined;
	};

	const getCategoryColorFromQuestion = (question: Question) =>
		categoryColors[question.category as Category];

	// Handle keydown events
	const handleKeydown = (event: KeyboardEvent) => {
		const answer = keyAnswerMap[event.key];
		if (answer) {
			handleAnswer(answer);
			closeModal();
		} else if (event.key === 'Escape') {
			closeModal();
		}
	};

	const handleAnswer = (value: number) => {
		if (selectedQuestion) {
			selectedQuestion.answer = value;

			// Update the store with the modified question
			questionsStore.update((questions) => {
				// Save to local storage before updating the store
				localStorage.setItem('questions', JSON.stringify(questions));
				return [...questions];
			});
		}
	};

	onMount(() => {
		// On initial load, check if there are any saved questions in local storage
		const savedQuestions = localStorage.getItem('questions');
		if (savedQuestions) {
			questionsStore.set(JSON.parse(savedQuestions));
		}

		// Add event listener
		window.addEventListener('keydown', handleKeydown);
	});

	// Cleanup on component unmount
	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});

	// Computed property to retrieve the category color
	$: categoryColor = selectedQuestion ? getCategoryColorFromQuestion(selectedQuestion) : '';
</script>

<!-- Questions List -->
<section>
	<ul class="questions-list">
		{#each $questionsStore as question (question.id)}
			<li style={`--category-color: ${getCategoryColorFromQuestion(question)}`}>
				{question.text}

				<div>
					{#if question.answer}
						<span>{answerOptions.find((answer) => answer.value === question.answer)?.text}</span>
						<button on:click={() => openModal(question)} on:keypress={() => openModal(question)}>
							adjust anwser
						</button>
					{:else}
						<span>Not answered</span>
						<button on:click={() => openModal(question)} on:keypress={() => openModal(question)}>
							give anwser
						</button>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>

<!-- Modal -->
{#if isModalOpen && selectedQuestion}
	<div class="modal" style={`--category-color: ${categoryColor}`}>
		<div class="modal-content">
			<h2>{selectedQuestion.text}</h2>
			<div class="answer-options">
				{#each answerOptions as option}
					<button
						on:click={() => {
							handleAnswer(option.value);
							closeModal();
						}}
					>
						<u>{option.text.at(0)}</u>{option.text.slice(1)}
					</button>
				{/each}
			</div>
			<button on:click={closeModal}>Close</button>
		</div>
	</div>
{/if}

<button on:click={clearAnswers}>Clear answers</button>

<style lang="scss">
	.questions-list {
		list-style-type: none;
		padding: 0;

		li {
			background: #fff;
			padding: 10px;
			cursor: pointer;
			box-shadow: 0 3px 0 var(--category-color);
			font-size: 1rem;
			margin-block-end: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;

			&:hover {
				box-shadow: 0 0 10px var(--category-color);
				transform: scale(1.01);
			}

			button {
				padding: 0.5rem 1rem;
				font-size: 1rem;
				border-radius: 4px;
				border: none;
				background-color: var(--category-color);
				color: #fff;
				cursor: pointer;
			}
		}
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;

		.modal-content {
			background-color: #fff;
			padding: 20px;
			border-radius: 10px;
			max-width: 80%;
			max-height: 80%;
			overflow-y: auto;

			.answer-options {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: 1rem;
				margin-top: 1rem;

				button {
					padding: 1.5rem 3rem;
					font-size: 2rem;
					border-radius: 4px;
					border: none;
					background-color: var(--category-color);
					color: #fff;
					cursor: pointer;
				}

				button:disabled {
					background-color: #999;
					cursor: not-allowed;
				}
			}
		}
	}

	button {
		margin-top: 2rem;
		padding: 1.5rem 3rem;
		font-size: 2rem;
		border-radius: 4px;
		border: none;
		color: #fff;
		background-color: rgba(255, 255, 255, 0.1);
		cursor: pointer;
		transition: background-color 0.1s ease-in-out;

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
</style>
