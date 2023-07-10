
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type AnswerOption = {
  text: string;
  value: string;
};

export enum Category {
  Category1 = 'Category 1',
  Category2 = 'Category 2',
  Category3 = 'Category 3',
  Category4 = 'Category 4',
  Category5 = 'Category 5'
}

type CategoryColor = {
  [key in Category]: string;
};

export type Question = {
  id: string;
  text: string;
  answer?: string;
  category: string;
};

export type QuestionsArray = Question[];

export const questions: QuestionsArray = [
    {
      "id": "q1",
      "text": "I exercise regularly.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q2",
      "text": "I eat a balanced diet.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q3",
      "text": "I get enough sleep every night.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q4",
      "text": "I manage stress effectively.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q5",
      "text": "I maintain a healthy weight.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q6",
      "text": "I avoid smoking and excessive alcohol consumption.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q7",
      "text": "I have regular health check-ups.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q8",
      "text": "I practice good hygiene.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q9",
      "text": "I engage in hobbies or activities I enjoy.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q10",
      "text": "I have a positive outlook on life.",
      "answer": "",
      "category": "Category 1"
    },
    {
      "id": "q11",
      "text": "I have a strong support system.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q12",
      "text": "I communicate effectively with others.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q13",
      "text": "I listen actively to others.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q14",
      "text": "I resolve conflicts peacefully.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q15",
      "text": "I show empathy towards others.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q16",
      "text": "I express my emotions in a healthy way.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q17",
      "text": "I build and maintain healthy relationships.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q18",
      "text": "I give and receive constructive feedback.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q19",
      "text": "I practice active listening skills.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q20",
      "text": "I am open-minded and receptive to new ideas.",
      "answer": "",
      "category": "Category 2"
    },
    {
      "id": "q21",
      "text": "I set realistic goals and work towards them.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q22",
      "text": "I manage my time effectively.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q23",
      "text": "I prioritize tasks and stay organized.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q24",
      "text": "I handle multiple responsibilities well.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q25",
      "text": "I meet deadlines consistently.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q26",
      "text": "I adapt to changes and challenges easily.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q27",
      "text": "I seek opportunities for personal growth and development.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q28",
      "text": "I am self-motivated and disciplined.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q29",
      "text": "I learn from my mistakes and failures.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q30",
      "text": "I have a clear vision of my future goals.",
      "answer": "",
      "category": "Category 3"
    },
    {
      "id": "q31",
      "text": "I am knowledgeable in my field of expertise.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q32",
      "text": "I continuously update my skills and knowledge.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q33",
      "text": "I seek opportunities to learn and grow professionally.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q34",
      "text": "I collaborate well with colleagues.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q35",
      "text": "I contribute positively to team projects.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q36",
      "text": "I take initiative and show leadership qualities.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q37",
      "text": "I handle work-related stress effectively.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q38",
      "text": "I communicate clearly and effectively in a professional setting.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q39",
      "text": "I meet or exceed performance expectations.",
      "answer": "",
      "category": "Category 4"
    },
    {
      "id": "q40",
    "text": "I am proactive in identifying and solving problems.",
    "answer": "",
    "category": "Category 4"
    },
    {
    "id": "q41",
    "text": "I contribute to my community through volunteer work.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q42",
    "text": "I practice sustainable and environmentally friendly habits.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q43",
    "text": "I respect and appreciate diversity.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q44",
    "text": "I advocate for social justice and equality.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q45",
    "text": "I help others in need.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q46",
    "text": "I participate in charitable activities.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q47",
    "text": "I support local businesses and initiatives.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q48",
    "text": "I promote a culture of inclusivity and acceptance.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q49",
    "text": "I engage in ethical and responsible behaviors.",
    "answer": "",
    "category": "Category 5"
    },
    {
    "id": "q50",
    "text": "I contribute positively to society.",
    "answer": "",
    "category": "Category 5"
    }
]

// Create a writable store to store the questions
export const questionsStore: Writable<QuestionsArray> = writable(questions);

// Create a writable store to store the current question
export const currentQuestionStore: Writable<Question | undefined> = writable(undefined);


export const answerOptions: AnswerOption[] = [
  { text: 'Never', value: '0' },
  { text: 'Sometimes', value: '1' },
  { text: 'Often', value: '2' },
  { text: 'Always', value: '3' }
];

export const categoryColors: CategoryColor = {
    'Category 1': 'hsla(39, 100%, 63%, 1)',
    'Category 2': 'hsla(338, 85%, 46%, 1)',
    'Category 3': 'hsla(335, 52%, 37%, 1)',
    'Category 4': 'hsla(178, 60%, 32%, 1)',
    'Category 5': 'hsla(187, 62%, 66%, 1)'
};
