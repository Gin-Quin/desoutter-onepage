<script lang="ts">
	import _ from "src/i18n"

	let currentPyramidStage = 0
	let pyramidImages = ["1", "2", "3"]
	let lastWheelAt = 0
	let section!: HTMLElement

	function onWheel(event: WheelEvent) {
		if (section.getBoundingClientRect().top != 0) return
		if (currentPyramidStage < pyramidImages.length) event.preventDefault()

		// we ignore very small values
		if (Math.abs(event.deltaY) < 4) return

		// we throttle the event
		const now = Date.now()
		if (lastWheelAt + 300 > now) return
		lastWheelAt = now

		if (event.deltaY > 0)
			currentPyramidStage = Math.min(pyramidImages.length, currentPyramidStage + 1)
		else currentPyramidStage = Math.max(0, currentPyramidStage - 1)
	}
</script>

<section id="ecosystem" class="row" bind:this={section} on:wheel={onWheel}>
	<aside>
		<div class="title bold">{$_("section.pyramid.title")}</div>
		<p>{$_("section.pyramid.description")}</p>
	</aside>
	<main>
		<img src="/images/pyramid.png" alt="pyramid" />
	</main>
</section>

<style lang="sass">
	section
		height: 100vh
		justify-content: space-evenly
		place-items: center
		> *
			width: 35%
	
	aside
		gap: 4rem

		> .title
			font-size: 9rem

		> p
			font-size: 5rem

</style>
