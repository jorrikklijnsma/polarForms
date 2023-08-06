<script lang="ts">
	import { onMount } from 'svelte';
	import type { Category, Question } from '../../data/questions';
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

		const countAnswers = (questions: Question[]): Record<string, number> => {
			const counts: Record<string, number> = {};

			questions.forEach((question) => {
				const answer = question.answer || '-1';
				counts[answer] = (counts[answer] || 0) + 1;
			});

			return counts;
		};

		const questionsPerCategory = categorizeQuestions($questionsStore);

		const datasets = Object.keys(questionsPerCategory).map((category) => {
			const answerCounts = countAnswers(questionsPerCategory[category as Category]);

			// Get the counts in the order of answerOptions
			const data = answerOptions.map((option) => answerCounts[option.value] || 0);

			return {
				label: category,
				data: data,
				backgroundColor: categoryColors[category as Category]
			};
		});

		const labels = answerOptions.map((option) => option.text);

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
