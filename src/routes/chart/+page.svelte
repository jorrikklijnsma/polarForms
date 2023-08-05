<script lang="ts">
	import { onMount } from 'svelte';
	import type { Question, Category } from '../../data/questions';
	import {
		questionsStore,
		categoryColors,
		answerOptions
	} from '../../data/questions';
	import { Chart, registerables } from 'chart.js';
	import { categorizeQuestions } from '../../utils/categorize-questions';

	Chart.register(...registerables); // Required for Chart.js v3+

	let chartContainer: HTMLCanvasElement;

	onMount(async () => {
		const ctx = chartContainer.getContext('2d');

		if (!ctx) {
			return;
		}

		const questionsPerCategory = categorizeQuestions($questionsStore);

		console.log(questionsPerCategory);
		console.log($questionsStore);

		const datasets = Object.keys(questionsPerCategory).map((category, index) => ({
			label: category,
			data: questionsPerCategory[category as Category].map((question) =>
				parseInt(question.answer || '0')
			),
			backgroundColor: categoryColors[category as Category]
		}));

		const data = {
			labels: answerOptions.map((option) => option.text),
			datasets: datasets
		};

		new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartContainer} />
