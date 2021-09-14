<script lang="ts">
	import type { FactoryItem } from "types/FactoryItem"
	import ToolCard from "./ToolCard.svelte"
	import { fade } from "svelte/transition"

	export let element: Element | null = null
	export let active = false
	export let item: FactoryItem
	export let size: number
</script>

<div
	bind:this={element}
	class="factory-item"
	class:active
	style="
		--tool-size: {size}px;
		left: {item.position.left}%;
		top: {item.position.top}%;
	"
>
	{#if item.tool}
		<ToolCard name={item.tool} style="small" transparent {active} />
	{:else if active}
		<div class="focus" in:fade={{ duration: 250 }} />
	{/if}
</div>

<style lang="sass">
	.factory-item
		pointer-events: none
		position: absolute
	
	.focus
		border-radius: 100%
		width: var(--tool-size)
		height: var(--tool-size)
		background: var(--primary)
		opacity: 0.5
</style>
