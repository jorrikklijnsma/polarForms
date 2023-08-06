<script lang="ts">
	import { onMount } from 'svelte';
	import type { Category } from '../../data/questions';
	import { questionsStore, categoryColors, answerOptions } from '../../data/questions';
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

		// Calculate the number of questions for each category
		const questionCountsPerCategory: Record<string, number> = {};
		Object.keys(questionsPerCategory).forEach((category) => {
			questionCountsPerCategory[category] = questionsPerCategory[category as Category].length;
		});

		const datasets = Object.keys(questionsPerCategory).map((category, index) => ({
			label: category,
			data: questionsPerCategory[category as Category].map((question) =>
				parseInt(question.answer || '0')
			),
			backgroundColor: categoryColors[category as Category]
		}));

		// Update the labels to include the count
		const labels = answerOptions.map((option) => {
			const count = questionCountsPerCategory[option.text];
			return `${option.text} (${count || 0} questions)`;
		});

		const data = {
			labels: labels,
			datasets: datasets
		};

		new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<div class="graph-wrapper">
	<canvas bind:this={chartContainer} />
</div>

<style lang="scss">
	.graph-wrapper {
		width: clamp(300px, 80vw, 1440px);
		height: auto;
	}
</style>
