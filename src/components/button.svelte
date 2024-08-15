<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	type ButtonType = 'secondary' | 'tertiary' | 'fourth' | 'empty' | '';
	type ButtonSize = 'extraLarge' | 'large' | 'medium' | 'small';
	export let buttonType: ButtonType = '';
	export let size: ButtonSize = 'medium';
	export let isDisabled: boolean | null | undefined = false;
	export let iconName: string | null | undefined = null;

	const buttonFontSizes = {
		extraLarge: 'var(--font-size-button-extra-large)',
		large: 'var(--font-size-button-large)',
		medium: 'var(--font-size-button-medium)',
		small: 'var(---font-size-button-small)'
	};

	const dispatch = createEventDispatcher();

	function registerClick() {
		dispatch('buttonClickedEvent');
	}
</script>

<button
	on:click={registerClick}
	class="{buttonType} ${$$props.class}"
	disabled={isDisabled}
	style="--font-size: {buttonFontSizes[size]}"
>
	{#if iconName}
		<i class="fa-solid fa-{iconName}" />
	{/if}
	<slot />
</button>

<style lang="scss">
	button {
		display: block;
		background: var(--teal);
		font-size: var(--font-size);
		text-align: center;
		border-radius: 0.25rem;
		color: var(--white);
		font-weight: bold;
		text-decoration: none;
		padding: 0.5rem 1rem;
		word-break: keep-all;
		position: relative;
		outline: none;
		border: none;
		cursor: pointer;
		transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

		&.secondary {
			background: var(--light-blue);
			color: var(--blue);
		}

		&.tertiary {
			background: var(--white);
			color: var(--black);
		}

		&.fourth {
			background: var(--orange);
			color: var(--white);
		}

		&.empty {
			background: inherit;
			color: inherit;
		}

		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;

			&:hover {
				background: inherit;
				color: inherit;
			}
		}

		&:hover {
			background: var(--blue);
			color: var(--white);
		}
	}
</style>
