import { questionsStore } from '../data/questions';

export const clearAnswers = () => {
	// Update the store with the cleared answers
	questionsStore.update((questions) => {
		questions.forEach((question) => {
			question.answer = undefined;
		});

		// Save to local storage
		localStorage.setItem('questions', JSON.stringify(questions));

		return [...questions];
	});
};
