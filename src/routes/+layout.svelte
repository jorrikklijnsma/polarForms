<script>
	import '../theme/colors.css';
	import '../theme/general.css';
	import Header from '../components/header.svelte';
</script>

<div class="polar-charts">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style lang="scss" scoped>
	.polar-charts {
		display: grid;
		grid-template-rows: auto 1fr;
		min-height: 100vh;
	}
	main {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		background: var(--light-grey);
		padding: 1rem;
		padding-top: 4rem;

		&:has(.is-white-page) {
			background: var(--white);
			align-items: center;
		}
	}
</style>
