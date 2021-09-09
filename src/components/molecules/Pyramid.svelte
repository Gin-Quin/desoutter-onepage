<script lang="ts">
	import PyramidBlock from "atoms/PyramidBlock.svelte"
	import pyramidBlocks from "config/pyramidBlocks.json"
</script>

<div class="pyramid">
	<div class="blocks">
		{#each pyramidBlocks as _, index}
			<PyramidBlock {index} />
		{/each}
	</div>

	<!-- {#if currentStage == fusionStage}
		<div class="pyramid-block shadow" style={`left: 0; bottom: 0;`}>
			<img in:fade={{ delay: 400 }} out:fade src={`/images/pyramid/6.svg`} alt="pyramid-final" />
		</div>
	{/if} -->
</div>
