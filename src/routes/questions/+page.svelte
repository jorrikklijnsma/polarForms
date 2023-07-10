<script lang="ts">
  import { questionsStore, answerOptions, categoryColors } from "../../data/questions";
  import type { QuestionsArray, Question, Category } from "../../data/questions";
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import { onMount } from 'svelte';

  let currentQuestionIndex = 0;
  let currentQuestion: Question | undefined;

  onMount(() => {
    // Shuffle the questions array
    const shuffledQuestions = shuffleArray(questions);

    // Fetch question data from an API or any other data source
    questionsStore.set(questions);

    // Set the current question
    currentQuestion = $questionsStore[currentQuestionIndex];
  });

  const handleAnswer = (value: string) => {
    if (currentQuestion) {
      currentQuestion.answer = value;

      // Update the store with the modified question
      questionsStore.update((questions) => [...questions]);

      // Move to the next question
      if (currentQuestionIndex < $questionsStore.length - 1) {
        currentQuestionIndex++;
        currentQuestion = $questionsStore[currentQuestionIndex];
      }
    }
  }

  const shuffleArray = (array: QuestionsArray) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Computed property to retrieve the category color
  $: categoryColor = currentQuestion ? categoryColors[currentQuestion.category as Category] : '';
</script>

<div class="question-card">
  {#if currentQuestion}
    <h2>{currentQuestion.text}</h2>
    <span class="category-tag" style={`--category-color: ${categoryColor}`}>{currentQuestion.category}</span>
    <div class="answer-options">
      {#each answerOptions as option}
        <button on:click={() => handleAnswer(option.value)} disabled={currentQuestion.answer === option.value} style={`--category-color: ${categoryColor}`}>{option.text}</button>
      {/each}
    </div>
  {:else}
    <p>All questions answered!</p>
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
    width: 300px;
    max-width: 90%;
    margin: 0 auto;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .category-tag {
    margin-bottom: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    color: #fff;
    border-radius: 4px;
    background-color: var(--category-color);
  }

  .answer-options {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
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

  button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
</style>
