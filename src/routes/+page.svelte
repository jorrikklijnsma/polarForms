<script>
	import Button from '../components/button.svelte';
	import { t } from '$lib/translations';
</script>

<div class="titleWrapper is-white-page">
	<h1>{$t('home.title')}</h1>
	<Button buttonType="fourth" size="extraLarge">
		<a href="/questions">{$t('home.cta')}</a>
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
