<div class="folded-card">
	<slot />
</div>

<style lang="sass">
	$fold-height: 40%
	$fold-width: 18px
	$color: white
	$fold-color: transparent
	$folded-color: white

	// computed variables
	$fill-height: 100% - $fold-height

	.folded-card
		padding: 10px 18px
		filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.05))
		font-weight: 700
		position: relative

		background-image: linear-gradient($color, $color), linear-gradient(to top right, $fold-color 50%, $folded-color 50%), linear-gradient($color, $color), linear-gradient($color, $color), linear-gradient(to top right, $folded-color 50%, $fold-color 50%)
		background-position-x: 0, 0, $fold-width, right, right
		background-position-y: 0, bottom, 0, bottom, 0
		background-size: $fold-width $fill-height, $fold-width $fold-height, calc(100% - #{2 * $fold-width}) 100%, $fold-width $fill-height, $fold-width $fold-height
		background-repeat: no-repeat
</style>
