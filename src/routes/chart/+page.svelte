<script lang="ts">
	import { onMount } from 'svelte';
	import type { Question, Category } from '../../data/questions';
	import { questionsStore, categoryColors, categoryColorsTransparent } from '../../data/questions';
	import { Chart, registerables } from 'chart.js';
	import type { ChartData, ChartConfiguration } from 'chart.js';
	import { categorizeQuestions } from '../../utils/categorize-questions';

	Chart.register(...registerables);

	let chartContainer: HTMLCanvasElement;

	const plugin = {
		id: 'customCanvasBackgroundImage',
		beforeDraw: (chart: { width?: number; height?: number; ctx?: any }) => {
			const { ctx } = chart;
			ctx.save();
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, chart.width, chart.height);
			ctx.restore();
		}
	};

	onMount(async () => {
		const ctx = chartContainer.getContext('2d');

		if (!ctx) {
			return;
		}

		const totalWeightForCategory = (questions: Question[]): number => {
			console.log(questions);
			return questions.reduce((total, question) => {
				const weight = question.answer || 0;
				return total + weight;
			}, 0);
		};

		const questionsPerCategory = categorizeQuestions($questionsStore);
		const datasets: ChartData<'polarArea', number[], string> = {
			datasets: [
				{
					data: [],
					backgroundColor: [],
					borderColor: []
				}
			],
			labels: []
		};

		Object.entries(questionsPerCategory).forEach(([categoryKey, categoryQuestions]) => {
			console.log(categoryKey);
			const totalWeight = totalWeightForCategory(categoryQuestions) - 10;

			datasets.datasets[0].data.push(totalWeight);
			datasets.datasets[0].backgroundColor!.push(
				categoryColorsTransparent[categoryKey as Category].replace('%s', '0.5')
			);
			datasets.datasets[0].borderColor!.push(categoryColors[categoryKey as Category]);
			datasets.labels!.push(`${categoryKey} (${totalWeight})`);
		});

		const chartConfig: ChartConfiguration<'polarArea', number[], string> = {
			type: 'polarArea',
			data: datasets,
			options: {
				responsive: true,
				scales: {
					r: {
						beginAtZero: true,
						suggestedMax: 30
					}
				},
				plugins: {
					legend: {
						labels: {
							color: 'rgb(0, 0, 0)',
							padding: 20
						}
					}
				}
			},
			plugins: [plugin]
		};

		new Chart(ctx, chartConfig);
	});

	const exportGraph = () => {
		const a = document.createElement('a');
		a.href = chartContainer.toDataURL('image/png');
		a.download = 'graph.png';
		a.click();
	};
</script>

<div class="graph-wrapper">
	<canvas bind:this={chartContainer} />
</div>
<button on:click={exportGraph}>Download Graph as image</button>

<style lang="scss">
	.graph-wrapper {
		display: grid;
		place-items: center;
		width: clamp(300px, 80vw, 1440px);
		max-height: 70vh;
		height: auto;
	}
</style>
