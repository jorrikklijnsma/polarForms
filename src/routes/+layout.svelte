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

<style lang="scss">
	.polar-charts {
		display: grid;
		grid-template-rows: auto 1fr;
		min-height: 100vh;
	}
	main {
		display: grid;
		place-items: center;
		background: #222;
		padding: 1rem;
	}
</style>
