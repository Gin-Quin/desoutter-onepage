<script lang="ts">
	import { fly } from "svelte/transition"
	export let name: string
	export let style: string
	export let position: undefined | { left: number; top: number } = undefined
	export let delay = 0
	export let duration = 300
	export let active = false
	export let transparent = false
	export let flyFrom = {
		x: Math.random() * 100 - 50,
		y: Math.random() * 100 - 50,
	}
	export let flyTo = {
		x: Math.random() * 100 - 50,
		y: Math.random() * 100 - 50,
	}
	console.log("tool", name, flyFrom, flyTo)
</script>

<div
	class="tool"
	class:logo={style == "logo"}
	class:small={style == "small"}
	class:large={style == "large"}
	style="
		position: {position ? 'absolute' : 'relative'};
		top: {position ? position.top + '%' : 'unset'};
		left: {position ? position.left + '%' : 'unset'};
		transition-duration: {Math.random() * 350 + 150}ms;
		transition-delay: {Math.random() * 100};
		background: {active ? 'var(--primary)' : transparent ? 'none' : 'white'};
		box-shadow: {transparent ? 'none' : 'box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15)'}
	"
	in:fly={{
		...flyFrom,
		delay,
		duration,
	}}
	out:fly={{
		...flyTo,
		duration: 200,
	}}
>
	<img src="/images/tools/{name}.png" alt={name} />
</div>

<style lang="sass">
	.tool
		--small-size: var(--tool-size, 100px)
		--medium-size: calc(var(--tool-size) * 1.5)
		--logo-width: calc(var(--tool-size) * 1.7)
		--logo-height: var(--tool-size)
		
		justify-content: center
		align-items: center

		&.small
			border-radius: 100%
			width: var(--small-size)
			height: var(--small-size)
			> img
				width: 70%
				height: 70%

		&.large
			border-radius: 100%
			width: var(--medium-size)
			height: var(--medium-size)
			> img
				width: 70%
				height: 70%

		&.logo
			border-radius: 16px
			width: var(--logo-width)
			height: var(--logo-height)
			> img
				max-width: 90%
</style>
