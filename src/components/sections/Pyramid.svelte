<script lang="ts">
	import _ from "src/i18n"
	import { fly } from "svelte/transition"
	import ArrowDownCircleOutline from "icons/ArrowDownCircleOutline.svelte"
	import { onDestroy, onMount } from "svelte"

	const pyramidBlocks = [
		{ width: 474, height: 211, position: [0, 0] },
		{ width: 363, height: 169, position: [53, 89] },
		{ width: 247, height: 128, position: [110, 176] },
		{ width: 130, height: 100, position: [165, 260] },
	]
	const transitionDuration = 700
	const throttle = 450
	const stageCount = pyramidBlocks.length - 1

	let touchStart = 0
	let currentStage = 0
	let lastScrollDown = 0
	let lastScrollTop = 0
	let section!: HTMLElement
	let pyramidGap = 30
	let animationIsDone = false

	$: console.log("currentStage", currentStage)

	function canScrollTop(): boolean {
		return document.documentElement.scrollTop != 0 && lastScrollTop + throttle < Date.now()
	}

	function onWheel(event: WheelEvent) {
		return (event.deltaY > 0 ? onScrollDown : onScrollTop)(event, event.deltaY)
	}

	function onKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case "ArrowDown":
				return onScrollDown(event)
			case "ArrowUp":
				return onScrollTop(event)
		}
	}

	function onScrollDown(event: Event, delta = 4) {
		if (animationIsDone) return
		event.preventDefault()
		if (currentStage == stageCount) return
		if (delta < 4) return
		if (lastScrollDown + throttle > Date.now()) {
			return
		}
		lastScrollDown = Date.now()
		currentStage++
		if (currentStage == stageCount) {
			setTimeout(() => {
				if (currentStage == stageCount) animationIsDone = true
			}, throttle)
		}
	}

	function onScrollTop(event: Event, delta = -4) {
		if (canScrollTop()) return
		if (currentStage == 0) return
		if (delta > -4) return
		if (lastScrollTop + throttle > Date.now()) {
			return
		}
		animationIsDone = false
		lastScrollTop = Date.now()
		currentStage--
	}

	function onTouchStart(event: TouchEvent) {
		touchStart = event.changedTouches[0].clientY
	}

	function onTouchMove(event: TouchEvent) {
		const delta = touchStart - event.changedTouches[0].clientY
		return (delta > 0 ? onScrollDown : onScrollTop)(event, delta)
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
		<p>{$_("section.pyramid.description")}</p>
	</main>

	<aside>
		<!-- <img class="pyramid" src="/images/pyramid.png" alt="pyramid" /> -->
		<div class="pyramid">
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
		> *
			width: 35%
	
	main
		gap: 4rem

		> .title
			font-size: 9rem

		> p
			font-size: 5rem
	
	.pyramid
		flex-direction: column-reverse
		position: relative
		height: 110rem

		> img
			position: absolute
			left: 0

	.shadow
		filter: drop-shadow(0 16rem 8rem rgba(0, 0, 0, 0.2))

	.next
		position: absolute
		bottom: 8rem
		width: auto
		opacity: 0.9
</style>
