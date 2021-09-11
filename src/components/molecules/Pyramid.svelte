<script lang="ts">
	import PyramidBlock from "atoms/PyramidBlock.svelte"
	import pyramidBlocks from "config/pyramidBlocks.json"
	import { fade } from "svelte/transition"

	export let gap = 0
	export let focus: null | number = null
	export let scale = 1
	export let gray = false
	export let neon = false
	export let arrow = false
</script>

<div class="pyramid" style="transform: scale({scale}) translateY({2 * gap}px);">
	{#if arrow}
		<img
			in:fade={{ delay: 300, duration: 1000 }}
			out:fade={{ duration: 400 }}
			class="circular-arrow"
			src="/images/pyramid/circular-arrow.png"
			alt="circular-arrow"
		/>
	{/if}

	<div class="blocks">
		{#each pyramidBlocks as _, index}
			<PyramidBlock {index} {gap} transparent={focus != null && index != focus} {gray} />
		{/each}
	</div>

	{#if neon}
		<img
			in:fade={{ delay: 350, duration: 900 }}
			out:fade={{ duration: 400 }}
			class="neon"
			src="/images/pyramid/neon.svg"
			alt="neon"
		/>
	{/if}
</div>

<style lang="sass">
	.pyramid
		flex-direction: column-reverse
		position: absolute
		width: 476px
		height: 362px
		transition: filter 0.55s 0.3s
		justify-content: center
		align-items: center
		transition: 250ms

		> .blocks
			transition: opacity 0.45s
			transition-delay: 0.3s
			position: relative
	
	.circular-arrow
		position: absolute
		transform: translate(-8px, -10px) scale(1.3)

	.neon
		position: absolute
		transform: translate(0px, -14px)
</style>
