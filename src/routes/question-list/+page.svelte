<script lang="ts">
	import { questionsStore, answerOptions, categoryColors } from '../../data/questions';
	import type { Question, Category } from '../../data/questions';
	import { onMount, onDestroy } from 'svelte';
	import { clearAnswers } from '../../utils/clear-answers';
	import Button from '../../components/button.svelte';
	import { t } from '$lib/translations';

	let selectedQuestion: Question | undefined = undefined;
	let isModalOpen: Boolean = false;

	// Create a key to answer value mapping
	let keyAnswerMap: Record<string, number> = {};
	answerOptions.forEach((option) => {
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
			const parsedQuestions = JSON.parse(savedQuestions);
			const sortedQuestionsByCategory = parsedQuestions.sort((a: Question, b: Question) => {
				if (a.category < b.category) {
					return -1;
				}
				if (a.category > b.category) {
					return 1;
				}
				return 0;
			});
			questionsStore.set(sortedQuestionsByCategory);
		}

		// Add event listener
		window.addEventListener('keydown', handleKeydown);
	});

	// Cleanup on component unmount
	onDestroy(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeydown);
    }
	});

	// Computed property to retrieve the category color
	$: categoryColor = selectedQuestion ? getCategoryColorFromQuestion(selectedQuestion) : '';
</script>

<!-- Questions List -->
<section>
	<ul class="questions-list">
		{#each $questionsStore as question (question.id)}
			<li style={`--category-color: ${getCategoryColorFromQuestion(question)}`}>
			{$t(`questions.all_questions.${parseInt(question.id)}`)}
				<div class="actions">
					{#if question.answer}
						<span>{answerOptions.find((answer) => answer.value === question.answer)?.text}</span>
					{:else}
						<span>Not answered</span>
					{/if}	
					<Button on:buttonClickedEvent={() => {openModal(question)}}
						buttonType="secondary"
						size="small"
						iconName="pen"
					>
						Edit
					</Button>
				</div>
			</li>
		{/each}
	</ul>
	<Button on:buttonClickedEvent={clearAnswers}
		buttonType="fourth"
		size="small"
		>
		Clear anwsers
	</Button>
</section>

<!-- Modal -->
{#if isModalOpen && selectedQuestion}
	<div class="modal" style={`--category-color: ${categoryColor}`}>
		<div class="modal-content">
			<header>
				<Button on:buttonClickedEvent={closeModal}
					buttonType="empty"
					size="small"
					>
						x
				</Button>
			</header>
			<h2>
			{$t(`questions.all_questions.${parseInt(selectedQuestion.id)}`)}
			</h2>
			<div class="answer-options">
				{#each answerOptions as option}

			<Button
				on:buttonClickedEvent={() => {handleAnswer(option.value);
							closeModal();}}
				isDisabled={selectedQuestion.answer === option.value}
				buttonType="secondary"
			>
				<u>{option.text.at(0)}</u>{option.text.slice(1)}
			</Button>
				{/each}
			</div>

			<footer class="max-text-width">
				{$t('common.footer-note')}
			</footer>
		</div>
	</div>
{/if}


<style lang="scss">
	.questions-list {
		list-style-type: none;
		padding: 0;

		li {
			background: #fff;
			padding: 10px;
			cursor: pointer;
			font-size: 1rem;
			margin-block-end: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;

			&:hover {
				transform: scale(1.01);
			}
			
			.actions {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-end;
				gap: 0.5rem;
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
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h2 {
				font-weight: 400;
				text-align: center;
			}

			.answer-options {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				gap: 2rem;
				margin-bottom: 1.5rem;
			}

			header {
				display: flex;
				justify-content: flex-end;
			}

			footer {
				margin-block-start: 1rem;
				padding-block-start: 1rem;
				margin-inline: 1rem;
				padding-inline: 1rem;
				border-top: var(--blue) 2px solid;
				color: var(--dark-grey);
			}
		}
	}
</style>
