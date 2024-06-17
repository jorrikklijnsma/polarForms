import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { shuffleArray } from '../utils/shuffle-array';

type AnswerOption = {
	text: string;
	value: number;
};

export enum Category {
	Category1 = 'ACTIEF LUISTEREN',
	Category2 = 'ZELFBEWUSTZIJN',
	Category3 = 'STAKEHOLDERS BETREKKEN',
	Category4 = 'WAARDEVOLLE INFORMATIE VINDEN',
	Category5 = 'INBEELDEN & BEGRIJPEN'
}

type CategoryColor = {
	[key in Category]: string;
};

export type Question = {
	id: string;
	answer?: number;
	category: string;
};

export type QuestionsArray = Question[];

const questions: QuestionsArray = [
	{
		id: '1',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '2',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '3',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '4',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '5',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '6',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '7',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '8',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '9',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '10',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '11',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '12',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '13',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '14',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '15',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '16',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '17',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '18',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '19',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '20',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '21',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '22',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '23',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '24',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '25',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '26',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '27',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '28',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '29',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '30',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '31',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '32',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '33',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '34',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '35',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '36',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '37',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '38',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '39',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '40',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '41',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '42',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '43',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '44',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '45',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	}
];

// Create a writable store to store the questions
export const questionsStore: Writable<QuestionsArray> = writable(shuffleArray(questions));

// Create a writable store to store the current question
export const currentQuestionStore: Writable<Question | undefined> = writable(undefined);

export const answerOptions: AnswerOption[] = [
	{ text: 'nooit', value: 1 },
	{ text: 'soms', value: 2 },
	{ text: 'vaak', value: 3 },
	{ text: 'altijd', value: 4 }
];

export const categoryColors: CategoryColor = {
	'ACTIEF LUISTEREN': 'hsla(7, 40%, 59%, 1)',
	ZELFBEWUSTZIJN: 'hsla(28, 35%, 66%, 1)',
	'STAKEHOLDERS BETREKKEN': 'hsla(46, 34%, 68%, 1)',
	'WAARDEVOLLE INFORMATIE VINDEN': 'hsla(129, 20%, 58%, 1)',
	'INBEELDEN & BEGRIJPEN': 'hsla(220, 26%, 67%, 1)'
};

export const categoryColorsTransparent: CategoryColor = {
	'ACTIEF LUISTEREN': 'hsla(7, 40%, 59%, %s)',
	ZELFBEWUSTZIJN: 'hsla(28, 35%, 66%, %s)',
	'STAKEHOLDERS BETREKKEN': 'hsla(46, 34%, 68%, %s)',
	'WAARDEVOLLE INFORMATIE VINDEN': 'hsla(129, 20%, 58%, %s)',
	'INBEELDEN & BEGRIJPEN': 'hsla(220, 26%, 67%, %s)'
};
