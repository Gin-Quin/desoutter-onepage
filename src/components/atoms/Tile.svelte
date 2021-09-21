<script lang="ts">
	type Tile = {
		title?: string
		description?: string
		color?: string
		size?: number
		link?: string
		image?: string
	}

	export let tile: Tile
</script>

<a
	class="tile"
	href={tile.link || ""}
	style="
		--tile-height: {100 / (tile.size || 1)}%;
		background-color: var(--{tile.color || 'primary'});
		grid-column-end: span {tile.size || 1};
	"
>
	{#if tile.image}
		<img class="image" src={tile.image} alt={tile.image} />
	{/if}

	<div class="content">
		<div class="title">
			{tile.title || ""}
		</div>

		<div class="description">
			{tile.description || ""}
		</div>
	</div>
</a>

<style lang="sass">
	.tile
		cursor: pointer
		color: var(--white)
		position: relative
		display: flex
		flex-direction: column

		&:before // trick to make height equal to width (all children must have absolute positionning)
			content: ""
			padding-top: var(--tile-height)
	
		> *
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
	
		.content
			padding: 12rem
			gap: 3rem

		.image
			opacity: 0
			transition: 600ms

		.title
			font-size: 3.5rem
			text-transform: uppercase
	
		.description
			font-size: 5rem
			font-weight: bold

		&:hover
			.image
				opacity: 0.3
</style>
