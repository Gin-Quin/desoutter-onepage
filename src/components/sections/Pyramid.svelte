<script lang="ts">
	import { fly, fade } from "svelte/transition"
	import ArrowDownCircleOutline from "icons/ArrowDownCircleOutline.svelte"
	import { onDestroy, onMount } from "svelte"
	import PyramidBlock from "atoms/PyramidBlock.svelte"
	import { _, json } from "svelte-i18n"

	const pyramidBlocks = [
		{ left: 0, bottom: 0 },
		{ left: 53, bottom: 88 },
		{ left: 108, bottom: 176 },
		{ left: 161, bottom: 260 },
	]
	const transitionDuration = 700
	const throttle = 520
	const basePyramidGap = 30
	const fusionStage = pyramidBlocks.length + 1

	let touchStart = 0
	let currentStage = 0
	let lastScrollDown = 0
	let lastScrollUp = 0
	let section!: HTMLElement
	let pyramidGap = basePyramidGap
	let animationIsDone = false

	$: stages = $json("section.pyramid.stages") as Array<{ title: string; description: string }>

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
		if (animationIsDone && delta >= 4) {
			lastScrollDown = Date.now()
			return
		}
		event.preventDefault()
		if (currentStage == fusionStage) return
		if (delta < 4) return
		if (lastScrollDown + throttle > Date.now()) {
			return
		}
		lastScrollDown = Date.now()
		currentStage++
		if (currentStage >= fusionStage) pyramidGap = 0
		if (currentStage == fusionStage) {
			setTimeout(() => {
				if (currentStage == fusionStage) animationIsDone = true
			}, transitionDuration)
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
		if (currentStage < fusionStage) pyramidGap = basePyramidGap
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
		{#each stages as { description, title }, index}
			{#if index == currentStage}
				<div
					class="stage"
					in:fly={{ y: -200, duration: transitionDuration }}
					out:fly={{ y: -400, duration: transitionDuration }}
				>
					<div
						class="index"
						class:hidden={!index || index >= fusionStage}
						in:fly={{ y: -200, duration: transitionDuration }}
						out:fly={{ y: -400, duration: transitionDuration }}
					>
						{index}
					</div>
					<div class="title bold">{title}</div>
					<p>{description}</p>
				</div>
			{/if}
		{/each}
	</main>

	<aside>
		<!-- <img class="pyramid" src="/images/pyramid.png" alt="pyramid" /> -->
		<div class="pyramid" class:fusion={currentStage == fusionStage}>
			<div class="blocks">
				{#each pyramidBlocks as { left, bottom }, index}
					{#if index < currentStage}
						<div
							class="pyramid-block"
							style={`left: ${left}px; bottom: ${bottom + index * pyramidGap}px;`}
						>
							<div
								class:shadow={index == 0}
								transition:fly={{ y: -80, duration: transitionDuration }}
							>
								<PyramidBlock {index} />
							</div>
						</div>
					{/if}
				{/each}
			</div>

			{#if currentStage == fusionStage}
				<div class="pyramid-block shadow" style={`left: 0; bottom: 0;`}>
					<img
						in:fade={{ delay: 400 }}
						out:fade
						src={`/images/pyramid/6.svg`}
						alt="pyramid-final"
					/>
				</div>
			{/if}
		</div>
	</aside>

	{#if animationIsDone}
		<div class="next primary" transition:fly={{ y: -20, duration: 300 }}>
			<img src="images/arrow-down.svg" alt="next" />
		</div>
	{/if}
</section>

<style lang="sass">
	section
		height: 100vh
		padding: var(--header-height) 12rem
		justify-content: space-evenly
		place-items: center
		background: white
	
	main
		width: 420px
		height: 24vh
		overflow: visible
		position: relative
	
	.stage
		gap: 4rem
		position: absolute
		width: 100%
		height: 100%
		> *
			z-index: 1
		
		.index
			z-index: 0
			position: absolute
			font-size: 54rem
			color: var(--gray-2)
			top: -44rem
			left: 4rem
			font-weight: bold
		
		p
			font-size: 4.75rem

		.title
			font-size: 9rem

	aside
		width: 474px

	.pyramid
		flex-direction: column-reverse
		position: relative
		height: 110rem
		width: auto
		transition: filter 0.55s 0.3s

		> .blocks
			transition: opacity 0.45s
			transition-delay: 0.3s

		&.fusion
			// filter: contrast(0.1) brightness(1.6) grayscale(1)
			> .blocks
				transition-delay: 0
				opacity: 0
	
	.pyramid-block
		position: absolute
		transition: bottom 0.6s
	
		// > img
		// 	position: absolute

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
			padding: calc(var(--header-height) + 6vh) 0 6vh
			justify-content: space-between

			main
				width: auto
				height: 40%
				max-width: 90%
				text-align: center

			aside
				height: 40%

	@media (max-width: 510px)
		aside
			transform: scale(0.7)

	@media (max-width: 390px)
		aside
			transform: scale(0.58)
</style>
