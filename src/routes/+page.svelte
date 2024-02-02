<script>
	import Button from "../components/button.svelte";

</script>

<div class="titleWrapper is-white-page">
	<h1>Welcome to polarForms</h1>
		<Button
			buttonType="tertiary"
			size="extraLarge"
		>
			<a href="/questions">Start!</a>
		</Button>
</div>

<style lang="scss">
	.titleWrapper {
		display: flex;
		justify-content: center;
		flex-direction: column;

		h1 {
			color: var(--teal);
			font-size: 3rem;
		}
	}
</style>
