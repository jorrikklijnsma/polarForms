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
	text: string;
	answer?: number;
	category: string;
};

export type QuestionsArray = Question[];

const questions: QuestionsArray = [
	{
		id: '1',
		text: 'Tijdens interviews let ik erop dat mijn vragen niet sturend zijn',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '2',
		text: 'Wanneer ik het niet eens ben met mijn respondent, kan ik mijn mening voor me te houden',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '3',
		text: 'Tijdens interviews, houd ik mijn eigen mening voor me',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '4',
		text: 'Tijdens interviews, let ik ook op informatie die mijn idee(ën) ontkracht',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '5',
		text: 'Tijdens interviews, sta ik ervoor open om mijn mening over mijn respondent aan te passen',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '6',
		text: 'Tijdens interviews, geef ik mijn respondent ruim de tijd om mijn vragen te beantwoorden',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '7',
		text: 'Tijdens interviews, kan ik mijn vooroordelen en aannames opzij zetten',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '8',
		text: 'Tijdens interviews, kan ik stiltes laten vallen',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '9',
		text: 'Tijdens interviews, laat ik mijn respondent volledig uitpraten',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '10',
		text: 'Wanneer ik luister naar mijn respondent, kan ik herkennen over welke onderwerpen ik door moet vragen om mijn respondent te triggeren om meer informatie te delen',
		answer: undefined,
		category: 'ACTIEF LUISTEREN'
	},
	{
		id: '11',
		text: 'Tijdens interviews ben ik mij ervan bewust op welke vlakken de belevingswereld van mijn respondent verschilt met die van mij',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '12',
		text: 'Tijdens interviews, ben ik mij bewust van mijn eigen emoties',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '13',
		text: 'Tijdens interviews, ben ik mij bewust van de invloed die mijn aannames hebben op de manier waarop ik de antwoorden van mijn respondent interpreteer',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '14',
		text: 'Ik herken makkelijk op welke vlakken de belevingswereld van mijn respondent verschilt en overeenkomt met die van mij',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '15',
		text: 'Tijdens en voorafgaand aan een interview, ben ik mij bewust van de aannames die ik heb over mijn respondent',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '16',
		text: 'Tijdens interviews, ben ik mij bewust van mijn eigen gedrag',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '17',
		text: 'Tijdens en voorafgaand aan een interview, ben ik mij bewust van de vooroordelen die ik heb over mijn respondent',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '18',
		text: 'Tijdens interviews, ben ik mij bewust van mijn eigen gedachten',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '19',
		text: 'Tijdens interviews ben ik mij ervan bewust op welke vlakken de belevingswereld van mijn respondent overeenkomt met die van mij',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '20',
		text: 'Ik ben mij bewust van mijn eigen krachten en valkuilen bij het doen van interviews',
		answer: undefined,
		category: 'ZELFBEWUSTZIJN'
	},
	{
		id: '21',
		text: 'Wanneer een interviewopzet bedenk, weet ik hoe ik het zo kan inrichten dat mijn respondent zich volledig durft te uiten',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '22',
		text: 'Tijdens interviews, kan ik aflezen aan het gedrag van mijn respondent of ik mijn interviewopzet moet aanpassen',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '23',
		text: 'Tijdens interviews, controleer ik of ik de antwoorden van mijn respondent goed heb begrepen',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '24',
		text: 'Tijdens interviews, zorg ik ervoor dat mijn respondent zich gewaardeerd en gerespecteerd voelt',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '25',
		text: 'Wanneer ik respondenten zoek voor mijn interviews, weet ik hoe ik ze enthousiast kan krijgen om mee te doen',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '26',
		text: 'Tijdens en/of voorafgaand aan interviews, leg ik mijn respondent duidelijk uit wat er gaat gebeuren tijdens het interview',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '27',
		text: 'Wanneer ik interviews ontwerp, weet ik hoe ik ervoor kan zorgen dat het niet alleen waardevol is voor mij, maar ook voor de respondent',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '28',
		text: 'Voordat ik interviews doe, weet ik welke mensen ik het best kan uitnodigen om zo nuttig mogelijke informatie te verzamelen',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '29',
		text: 'Tijdens interviews, kan ik makkelijk een gesprek gaande houden met mijn respondent',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '30',
		text: 'Tijdens interviews, pas ik mijn houding en woorden aan, aan wat de respondent nodig heeft',
		answer: undefined,
		category: 'STAKEHOLDERS BETREKKEN'
	},
	{
		id: '31',
		text: 'Ik kan makkelijk uitvinden welke behoeftes van mijn verschillende respondenten met elkaar overeenkomen en verschillen',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '32',
		text: 'Wanneer ik interviews doe, weet ik wanneer ik genoeg bruikbare informatie heb verzameld',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '33',
		text: 'Tijdens interviews weet ik hoe ik de belangrijkste behoeftes van mijn respondent kan vinden',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '34',
		text: 'Wanneer ik interviews doe, weet ik wanneer nog niet genoeg informatie heb verzameld om mee te kunnen werken',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '35',
		text: 'Ik kan makkelijk verbanden vinden tussen antwoorden van een respondent en de informatie die ik eerder over deze respondent heb verzameld',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '36',
		text: 'Voordat ik een interview start, weet ik precies naar welke informatie ik op zoek ben en waarom',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '37',
		text: 'Ik kan makkelijk verbanden vinden tussen de (verschillende) behoeftes van twee of meer van mijn respondenten',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '38',
		text: 'Tijdens interviews ga ik door tot ik de diepst liggende motieven van mijn respondent heb gevonden',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '39',
		text: 'Tijdens interviews kan ik makkelijk uitvinden welke motieven er achter het gedrag van mijn respondent liggen',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '40',
		text: 'Ik kan makkelijk herkennen wanneer er een diepere laag van informatie verstopt zit achter een antwoord van mijn respondent',
		answer: undefined,
		category: 'WAARDEVOLLE INFORMATIE VINDEN'
	},
	{
		id: '41',
		text: 'Ik vind het makkelijk om het gedrag van mijn respondenten te voorspellen aan de hand van hun belevingswereld',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '42',
		text: 'Tijdens interviews kan ik de situatie/ervaring van mijn respondent tot in detail inbeelden',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '43',
		text: 'Ik kan me goed voorstellen hoe mijn respondent zich zou kunnen gedragen in verschillende situaties die relevant zijn voor mijn project',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '44',
		text: 'Ik kan me goed voorstellen waarom mijn respondent bepaald gedrag vertoont',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '45',
		text: 'Ik kan me goed voorstellen waarom mijn respondent bepaalde emoties voelt',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '46',
		text: 'Wanneer mijn respondent een situatie beschrijft, kan ik me voorstellen hoe ik die situatie zelf zou ervaren',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '47',
		text: 'Wanneer mijn respondent een situatie beschrijft, kan ik die situatie duidelijk inbeelden',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '48',
		text: 'Ik vind het makkelijk om het gedrag van mijn respondenten te verklaren aan de hand van hun belevingswereld',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '49',
		text: 'Ik kan me goed voorstellen welke emoties mijn respondent zouden kunnen voelen in de verschillende situaties die relevant zijn voor mijn project',
		answer: undefined,
		category: 'INBEELDEN & BEGRIJPEN'
	},
	{
		id: '50',
		text: 'Ik vind het makkelijk om in te beelden hoe mijn respondenten zich zouden gedragen bij het gebruik van mijn ontwerp en/of toepassing van mijn advies',
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
