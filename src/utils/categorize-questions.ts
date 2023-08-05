import type { Category, Question, QuestionsArray } from "../data/questions";

type CategorizedQuestions = {
	[key in Category]: Question[];
};

export const categorizeQuestions = (questions: QuestionsArray): CategorizedQuestions => {
	const categorizedQuestions: Partial<CategorizedQuestions> = {};

	questions.forEach((question: Question) => {
		const category: Category = question.category as Category;
		if (!categorizedQuestions[category]) {
			categorizedQuestions[category] = [];
		}
		categorizedQuestions[category]?.push(question);
	});

	return categorizedQuestions as CategorizedQuestions;
};