<script lang="ts">
	import { fade } from "svelte/transition"
	export let position: {
		left: number
		top: number
	}
</script>

<div
	class="dome"
	style="left: {position.left}%; top: {position.top}%;"
	in:fade={{ duration: 250, delay: 150 }}
	out:fade={{ duration: 150 }}
/>

<style lang="sass">
	.dome
		background: url("/images/dome.svg")
		width: 440px
		height: 320px
		background-size: cover
		pointer-events: none
		position: absolute
</style>
