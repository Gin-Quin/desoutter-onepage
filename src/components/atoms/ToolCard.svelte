<script context="module" lang="ts">
	export interface Tool {
		name: string
		style: string
		position: Array<{ left: number; top: number }>
	}
</script>

<script lang="ts">
	import { fly } from "svelte/transition"
	export let tool: Tool
	export let step = 0
</script>

<div
	class="tool"
	class:logo={tool.style == "logo"}
	class:small={tool.style == "small"}
	class:large={tool.style == "large"}
	style="
		top: {tool.position[step].top}%;
		left: {tool.position[step].left}%;
		transition-duration: {Math.random() * 300 + 100}ms;
		transition-delay: {Math.random() * 100}
	"
	in:fly={{
		x: Math.random() * 100 - 50,
		y: Math.random() * 100,
		delay: 1200,
		duration: 1200,
	}}
>
	<img src="/images/tools/{tool.name}.png" alt={tool.name} />
</div>

<style lang="sass">
	.tool
		--small-size: var(--tool-size)
		--medium-size: calc(var(--tool-size) * 1.5)
		--logo-width: calc(var(--tool-size) * 1.7)
		--logo-height: var(--tool-size)

		background: white
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15)
		justify-content: center
		align-items: center
		position: absolute

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
