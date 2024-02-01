<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'fourth' | 'link' | 'empty';
	export let buttonType: ButtonType = 'primary';
	export let isActive: Boolean = false;
	export let isDisabled: boolean | null | undefined = false;

	const buttonTypeColors = {
		primary: 'var(--teal)',
		secondary: 'var(--blue)',
		tertiary: 'var(--orange)',
		fourth: 'var(--light-blue)',
		link: 'var(--transparent)',
		empty: 'var(--transparent)'
	};
	
	const buttonTypeHoverColors = {
		primary: 'var(--blue)',
		secondary: 'var(--light-blue)',
		tertiary: 'var(--light-orange)',
		fourth: 'var(--orange)',
		link: 'var(--blue)',
		empty: 'transparent'
	};

	const dispatch = createEventDispatcher();

	function registerClick() {
		dispatch('buttonClickedEvent');
	}
</script>

<button on:click={registerClick} class="{buttonType} {isActive ? 'active' : ''} ${$$props.class}" disabled={isDisabled} style="--background-color: {buttonTypeColors[buttonType]}; --background-hover-color: {buttonTypeHoverColors[buttonType]}">
	<slot></slot>
</button>

<style lang="scss">
	button {
		display: block;
		background: var(--background-color);
		text-align: center;
		border-radius: 0.25rem;
		color: inherit;
		font-weight: bold;
		text-decoration: none;
		font-size: 1.25rem;
		padding: 0.5rem 1rem;
		word-break: keep-all;
		position: relative;
		outline: none;
		border: none;
		cursor: pointer;
		transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

		&.tertiary {
			color: var(--white);
		}

		&.active {
			background: var(--teal);
			color: var(--white);
		}

		&:disabled {
			opacity: .3;
			cursor: not-allowed;

			&:hover {
				background: var(--background-color);
			}
		}

		&:hover {
			background: var(--background-hover-color);
		}
	}
</style>
