<script lang="ts">
	import { questionsStore, answerOptions, categoryColors } from '../../data/questions';
	import type { Question, Category } from '../../data/questions';
	import Button from '../../components/button.svelte';
	import { get } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import { t } from '$lib/translations';

	let currentQuestionIndex = 0;
	let currentQuestion: Question | undefined;

	let startQuestionare = true;
	let totalQuestionCount = 0;

	// Create a key to answer value mapping
	let keyAnswerMap: Record<string, number> = {};
	answerOptions.forEach((option) => {
		keyAnswerMap[option.text.at(0)!.toString().toLowerCase()] = option.value;
		console.log(keyAnswerMap);
	});

	// Handle keydown events
	const handleKeydown = (event: KeyboardEvent) => {
		const answer = keyAnswerMap[event.key];
		if (answer) {
			handleAnswer(answer);
		}
	};

	const setNewCurrentQuestion = () => {
		if (findFirstUnansweredQuestionIndex() === -1) {
			currentQuestionIndex = 0;
			currentQuestion = undefined;
			return;
		} else {
			// Set the current question
			currentQuestionIndex = findFirstUnansweredQuestionIndex();
			currentQuestion = $questionsStore[currentQuestionIndex];
		}
	};

	const movePage = (direction: number) => {
		currentQuestionIndex += direction;
		if (currentQuestionIndex < 0) {
			currentQuestionIndex = 0;
		} else if (currentQuestionIndex >= $questionsStore.length) {
			currentQuestionIndex = $questionsStore.length - 1;
		}
		currentQuestion = $questionsStore[currentQuestionIndex];
	};

	const countAnsweredQuestions = () => {
		return $questionsStore.filter((question) => question.answer).length;
	};

	const findFirstUnansweredQuestionIndex = (): number => $questionsStore.findIndex((question) => !question.answer);

	const sortQuestions = (questions: Question[]) => questions.sort((a: Question, b: Question) => parseInt(a.id) - parseInt(b.id));

	const handleClearAnswer = () => {
		questionsStore.update(questions => {
			questions.forEach(question => {
				question.answer = undefined;
			});
			
			// Save to local storage
			localStorage.setItem('questions', JSON.stringify(questions));
			
			return [...questions];
		})
	};
	
	const handleStart = () => {
		console.log('start');
		startQuestionare = false;
	};
	
	onMount(() => {

		//sort on ID
		questionsStore.update(questions => sortQuestions(questions));

		// On initial load, check if there are any saved questions in local storage
		const savedQuestions = localStorage.getItem('questions');

		if (savedQuestions) {
			//sort on ID
			const sortedLocalStorage = sortQuestions(JSON.parse(savedQuestions))
			questionsStore.set(sortedLocalStorage);
		}

		totalQuestionCount = $questionsStore.length;
		
		setNewCurrentQuestion();

		// Add event listener
		window.addEventListener('keydown', handleKeydown);
	});

	// Cleanup on component unmount
	onDestroy(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeydown);
    }
});

	const handleAnswer = (value: number) => {
		if (currentQuestion) {
			currentQuestion.answer = value;

			// Update the store with the modified question
			questionsStore.update((questions) => {
				// Save to local storage before updating the store
				localStorage.setItem('questions', JSON.stringify(questions));
				return [...questions];
			});

			setNewCurrentQuestion();
		}
	};

	// Computed property to retrieve the category color
	$: categoryColor = currentQuestion ? categoryColors[currentQuestion.category as Category] : '';
</script>

<div class="question-card">
	{#if startQuestionare}
		<h2>{$t('questions.title')}</h2>
		<p>
			{$t('questions.intro.section1')}
		</p>
		<p>
			{$t('questions.intro.section2')}
		</p>
		<ul>
			{#each Array(5) as _, i}
				<li>{$t(`questions.intro.list.${i+1}`)}</li>
			{/each}	
		</ul>
		<p>
			{$t('questions.intro.section3')}
			{$t('questions.intro.section4')}
		</p>

		<Button
			on:buttonClickedEvent={handleStart}
			buttonType="fourth"
		>
			{countAnsweredQuestions() === 0 ? $t('questions.cta') : $t('questions.continue')}
		</Button>
	{:else if currentQuestion}
	<div class="pagination">
		<Button on:buttonClickedEvent={() => {movePage(-1)}}
			buttonType="empty"
			isDisabled={currentQuestionIndex === 0}
			> &lt; </Button>
		<span>
			{currentQuestion.id} / {totalQuestionCount}
		</span>
		<Button  on:buttonClickedEvent={() => {movePage(1)}}
			buttonType="empty"
			isDisabled={currentQuestionIndex === totalQuestionCount - 1 || currentQuestionIndex === findFirstUnansweredQuestionIndex()}
		> &gt; </Button>
	</div>
		<h2>{currentQuestion.text}</h2>
		
		<div class="answer-options">
			{#each answerOptions as option (option.value)}
			<Button
				on:buttonClickedEvent={() => handleAnswer(option.value)}
				isDisabled={currentQuestion.answer === option.value}
				buttonType="fourth"
			>
				<u>{option.text.at(0)}</u>{option.text.slice(1)}
			</Button>
		{/each}
	</div>

	<footer>
		<p>
			Je mag deze stellingen zo breed interpreteren als je wil, zo lang het maar relevant is in een professionele context.<br>
Gesprek kun je ook interpreteren als interview, gebruikerstest, sollicitatiegesprek, etc.<br>
Gesprekspartner kun je ook interpreteren als klant, werknemer, deelnemer, etc.

		</p>
	</footer>

	<div class="clearAnwsers">
		<Button on:buttonClickedEvent={() => handleClearAnswer()} buttonType="empty" size="small">
		{$t('questions.clear_awnsers')}
		</Button>
	</div>
	{:else}
		<h2>Gefeliciteerd</h2>
		<p>
			Je hebt alle 45 vragen beantwoord. Klik op de onderstaande knop om je resultaten te zien. Mocht je nog antwoorden willen aanpassen, kan dat op de Question List pagina. Hier vindt je een overzicht van alle vragen met daarbij jouw antwoorden.
Nogmaals, het is geen harde wetenschap dus zie de resultaten als hulpmiddel en niet als absolute waarheid. Vergeet niet je resultaten op te slaan, want deze heb je nodig tijdens de workshop.  
		</p>

		<Button
			on:buttonClickedEvent={handleStart}
			buttonType="fourth"
		>
		{countAnsweredQuestions() === 0 ? $t('questions.cta') : $t('questions.continue')}
	</Button>
	<a href="./chart">{$t('questions.go-to-chart')}</a>
	{/if}
</div>


<style>
	.question-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		background-color: var(--white);
		color: var(--dark-grey);
		border-radius: 8px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		min-width: 250px;
		width: minmax(max-content, min-content);
		max-width: 90%;
		margin: 0 auto;
	}

	h2 {
		font-size: 3.5rem;
		margin-bottom: 1rem;
		text-align: center;
		font-weight: 400;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.answer-options {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
		color: var(--teal);
	}

	footer {
		margin-top: 2rem;
		border-top: var(--light-blue) 2px solid;
	}

	.clearAnwsers {
		margin-top: 3rem;
	}
</style>
