<script lang="ts">
	import { onMount } from 'svelte';
	import type { Question, Category } from '../../data/questions';
	import { questionsStore, categoryColors, categoryColorsTransparent } from '../../data/questions';
	import { Chart, registerables} from 'chart.js';	
	import type { ChartData, ChartConfiguration } from 'chart.js';
	import { categorizeQuestions } from '../../utils/categorize-questions';

	Chart.register(...registerables);

	let chartContainer: HTMLCanvasElement;

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
		console.log(questionsPerCategory);
		const datasets: ChartData<'polarArea', number[], string> = {
				datasets: [{
						data: [],
						backgroundColor: [],
						borderColor: [],

				}],
				labels: []
		};

		Object.entries(questionsPerCategory).forEach(([categoryKey, categoryQuestions]) => {
			console.log(categoryKey)
				const totalWeight = totalWeightForCategory(categoryQuestions);
				
				datasets.datasets[0].data.push(totalWeight);
				datasets.datasets[0].backgroundColor!.push(categoryColorsTransparent[categoryKey as Category].replace('%s', '0.5'));
				datasets.datasets[0].borderColor!.push(categoryColors[categoryKey as Category]);
				datasets.labels!.push(`${categoryKey} (${totalWeight})`);
		});

		const chartConfig: ChartConfiguration<'polarArea', {data:number[], backgroundColor:string[]}[], string> = {
				type: 'polarArea',
				data: datasets,
				options: {
					responsive: true,
					scales: {
							r: {
									beginAtZero: true
							}
					},
					plugins: {
							legend: {
									labels: {
											color: 'rgb(255, 255, 255)',
											padding: 20,
									}
							}
					}
				}
		};


new Chart(ctx, chartConfig);

	});
</script>

<div class="graph-wrapper">
	<canvas bind:this={chartContainer} />
</div>

<style lang="scss">
	.graph-wrapper {
		display: grid;
		place-items: center;
		width: clamp(300px, 80vw, 1440px);
		max-height: 70vh;
		height: auto;
	}
</style>
