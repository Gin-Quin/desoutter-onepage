<script lang="ts">
	import PyramidBlock from "atoms/PyramidBlock.svelte"
	import pyramidBlocks from "config/pyramidBlocks.json"

	export let gap = 0
	export let focus: null | number = null
	export let scale = 1
	export let gray = false
</script>

<div class="pyramid" style="transform: scale({scale}) translateY({2 * gap}px);">
	<div class="blocks">
		{#each pyramidBlocks as _, index}
			<PyramidBlock {index} {gap} transparent={focus != null && index != focus} {gray} />
		{/each}
	</div>

	<!-- {#if currentStage == fusionStage}
		<div class="pyramid-block shadow" style={`left: 0; bottom: 0;`}>
			<img in:fade={{ delay: 400 }} out:fade src={`/images/pyramid/6.svg`} alt="pyramid-final" />
		</div>
	{/if} -->
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

		// &.fusion
		// 	> .blocks
		// 		transition-delay: 0
		// 		opacity: 0
</style>
