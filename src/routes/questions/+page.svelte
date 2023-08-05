<script lang="ts">
	import { questionsStore, answerOptions, categoryColors } from '../../data/questions';
	import type { QuestionsArray, Question, Category } from '../../data/questions';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let currentQuestionIndex = 0;
	let currentQuestion: Question | undefined;

	onMount(() => {
		// On initial load, check if there are any saved questions in local storage
		const savedQuestions = localStorage.getItem('questions');
		if (savedQuestions) {
			questionsStore.set(JSON.parse(savedQuestions));
		}

		// Set the current question
		currentQuestion = $questionsStore[currentQuestionIndex];
	});

	const handleAnswer = (value: string) => {
		if (currentQuestion) {
			currentQuestion.answer = value;

			// Update the store with the modified question
			questionsStore.update((questions) => {
				// Save to local storage before updating the store
				localStorage.setItem('questions', JSON.stringify(questions));
				return [...questions];
			});

			// filter out the questions that have been answered
			const unansweredQuestions = get(questionsStore).filter((question) => !question.answer);

			// If there are no more unanswered questions, display a message
			if (unansweredQuestions.length === 0) {
				currentQuestion = undefined;
				return;
			}

			currentQuestion = unansweredQuestions[0];
		}
	};

	// Computed property to retrieve the category color
	$: categoryColor = currentQuestion ? categoryColors[currentQuestion.category as Category] : '';
</script>

<div class="question-card">
	{#if currentQuestion}
		<h2>{currentQuestion.text}</h2>
		<span class="category-tag" style={`--category-color: ${categoryColor}`}
			>{currentQuestion.category}</span
		>
		<div class="answer-options">
			{#each answerOptions as option}
				<button
					on:click={() => handleAnswer(option.value)}
					disabled={currentQuestion.answer === option.value}
					style={`--category-color: ${categoryColor}`}>{option.text}</button
				>
			{/each}
		</div>
	{:else}
		<p>All questions answered!</p>
		<a href="./chart">Go to the chart</a>
	{/if}
</div>

<style>
	.question-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		min-width: 300px;
		max-width: 90%;
		margin: 0 auto;
	}

	h2 {
		font-size: 3.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.category-tag {
		margin-bottom: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		color: #fff;
		border-radius: 4px;
		background-color: var(--category-color);
		filter: saturate(1.5);
	}

	.answer-options {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1rem;
	}

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
</style>
