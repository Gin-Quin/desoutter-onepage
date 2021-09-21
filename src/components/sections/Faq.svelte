<script lang="ts">
	import { json } from "svelte-i18n"
	import type { TranslationObject } from "locales/TranslationObject"
	import Tile from "atoms/Tile.svelte"

	type Tiles = TranslationObject["section"]["faq"]["tiles"]

	$: tiles = $json("section.faq.tiles") as Tiles
</script>

{#if tiles?.length}
	<section id="faq">
		<div class="grid">
			{#each tiles as tile}
				{#if tile}
					<Tile {tile} />
				{:else}
					<div class="empty-tile" />
				{/if}
			{/each}
		</div>
	</section>
{/if}

<style lang="sass">
	section
		width: 100%
		
	.grid
		width: 100%
		grid-template-columns: repeat(4, 1fr)

	@media (max-width: 1000px)
		.grid
			grid-template-columns: repeat(2, 1fr)
		.empty-tile
			display: none
</style>
