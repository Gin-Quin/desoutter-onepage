<script lang="ts">
	import { fly } from "svelte/transition"
	import ArrowDownCircleOutline from "icons/ArrowDownCircleOutline.svelte"
	import { onDestroy, onMount } from "svelte"
	import { _, json } from "svelte-i18n"

	const pyramidBlocks = [
		{ width: 480, height: 213, position: [0, 0] },
		{ width: 361, height: 181, position: [59, 105] },
		{ width: 238, height: 144, position: [121, 216] },
		{ width: 114, height: 101, position: [183, 325] },
	]
	const transitionDuration = 700
	const throttle = 520
	const stageCount = 5
	const basePyramidGap = 30
	const noGapStage = pyramidBlocks.length
	const fusionStage = pyramidBlocks.length + 1

	let touchStart = 0
	let currentStage = 0
	let lastScrollDown = 0
	let lastScrollUp = 0
	let section!: HTMLElement
	let pyramidGap = basePyramidGap
	let animationIsDone = false

	function onWheel(event: WheelEvent) {
		return (event.deltaY > 0 ? onScrollDown : onScrollUp)(event, event.deltaY)
	}

	function onKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case "ArrowDown":
				return onScrollDown(event)
			case "ArrowUp":
				return onScrollUp(event)
		}
	}

	function onScrollDown(event: Event, delta = 4) {
		if (document.documentElement.scrollTop > 0) return
		if (animationIsDone) {
			lastScrollUp = Date.now()
			return
		}
		event.preventDefault()
		if (currentStage == stageCount) return
		if (delta < 4) return
		if (lastScrollDown + throttle > Date.now()) {
			return
		}
		lastScrollDown = Date.now()
		currentStage++
		if (currentStage >= noGapStage) pyramidGap = 0
		if (currentStage == stageCount) {
			setTimeout(() => {
				if (currentStage == stageCount) animationIsDone = true
			}, throttle)
		}
	}

	function onScrollUp(event: Event, delta = -4) {
		if (document.documentElement.scrollTop > 0) {
			lastScrollUp = Date.now()
			return
		}
		event.preventDefault()
		if (currentStage == 0) return
		if (delta > -4) return
		if (lastScrollUp + throttle > Date.now()) {
			return
		}
		animationIsDone = false
		lastScrollUp = Date.now()
		currentStage--
		if (currentStage < noGapStage) pyramidGap = basePyramidGap
	}

	function onTouchStart(event: TouchEvent) {
		touchStart = event.changedTouches[0].clientY
	}

	function onTouchMove(event: TouchEvent) {
		const delta = touchStart - event.changedTouches[0].clientY
		return (delta > 0 ? onScrollDown : onScrollUp)(event, delta)
	}

	onMount(() => {
		addEventListener("keydown", onKeydown, { passive: false })
		addEventListener("wheel", onWheel, { passive: false })
		addEventListener("touchstart", onTouchStart, { passive: false })
		addEventListener("touchmove", onTouchMove, { passive: false })
	})
</script>

<section id="ecosystem" class="row" bind:this={section}>
	<main>
		<div class="title bold">{$_("section.pyramid.title")}</div>
		{#each $json("section.pyramid.description") as description, index}
			{#if index == currentStage}
				<p>{description}</p>
			{/if}
		{/each}
	</main>

	<aside>
		<!-- <img class="pyramid" src="/images/pyramid.png" alt="pyramid" /> -->
		<div class="pyramid" class:fusion={currentStage == fusionStage}>
			{#each pyramidBlocks as { width, height, position: [left, bottom] }, index}
				{#if index <= currentStage}
					<img
						transition:fly={{ y: -200, duration: transitionDuration }}
						class:shadow={index == 0}
						{width}
						{height}
						style={`left: ${left}px; bottom: ${bottom + index * pyramidGap}px;`}
						src={`/images/pyramid/pyramid-${index}.png`}
						alt={`pyramid-${index}`}
					/>
				{/if}
			{/each}
		</div>
	</aside>

	{#if animationIsDone}
		<div class="next primary" transition:fly={{ y: -20, duration: 300 }}>
			<ArrowDownCircleOutline size="10rem" />
		</div>
	{/if}
</section>

<style lang="sass">
	section
		height: 100vh
		justify-content: space-evenly
		place-items: center
	
	main
		gap: 4rem
		width: 35%
		height: 240px
		overflow: visible

		> .title
			font-size: 9rem

		> p
			font-size: 5rem

	aside
		width: 474px
		transform: scale(0.9)
		transition: filter 0.6s

	.pyramid
		flex-direction: column-reverse
		position: relative
		height: 110rem
		width: auto
		transition: filter 0.6s

		&.fusion
			filter: contrast(0.1) brightness(1.66) grayscale(1)
	
		> img
			transition: bottom 0.6s
			position: absolute
			left: 0

	.shadow
		filter: drop-shadow(0 16rem 8rem rgba(0, 0, 0, 0.2))

	.next
		position: absolute
		bottom: 3%
		width: auto
		opacity: 0.9
	
	@media (max-width: 900px)
		section
			flex-direction: column
			padding: 20rem 0
		
		main
			width: 580px
			max-width: 90%
			text-align: center

	@media (max-width: 510px)
		aside
			transform: scale(0.72)

	@media (max-width: 390px)
		aside
			transform: scale(0.58)
</style>
