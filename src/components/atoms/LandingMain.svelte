<script lang="ts">
	let clientWidth: number
	let clientHeight: number
	$: toolSize = Math.min(clientWidth * 0.13, clientHeight * 0.17)
</script>

<main bind:clientWidth bind:clientHeight style="--tool-size: {toolSize}px">
	<slot />
</main>

<style lang="sass">
	main
		position: absolute
		top: var(--landing-header-height)
		left: var(--landing-aside-width)
		height: var(--landing-main-height)
		width: var(--landing-main-width)
		background: rgba(255, 0, 255, 0.5)
		align-items: center
		justify-content: center
</style>
