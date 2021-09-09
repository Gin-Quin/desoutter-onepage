<script lang="ts">
	import { fly } from "svelte/transition"
	import { onDestroy, onMount } from "svelte"
	import { _, json, t } from "svelte-i18n"
	import { tsParticles } from "tsparticles"
	import particles from "src/config/particles.json"
	import ScrollController from "utilities/ScrollController"
	import LandingIntro from "organisms/LandingIntro.svelte"
	import LandingContent from "organisms/LandingContent.svelte"
	import LandingOutro from "organisms/LandingOutro.svelte"
	import ArrowDown from "icons/ArrowDown.svelte"
	import LandingFooter from "atoms/LandingFooter.svelte"

	// const pyramidBlocks = [
	// 	{ left: 0, bottom: 0 },
	// 	{ left: 53, bottom: 88 },
	// 	{ left: 108, bottom: 176 },
	// 	{ left: 161, bottom: 260 },
	// ]
	// const transitionDuration = 700
	// const basePyramidGap = 30
	// let pyramidGap = basePyramidGap
	// const fusionStage = pyramidBlocks.length + 1

	const stages = $json("section.landing.stages") as Record<string, { steps: Array<unknown> }>
	const numberOfStages = Object.keys(stages).length

	let currentStage = 0
	let step = 0
	let scrollController: ScrollController
	let mounted = false
	let done = false // last stage done AND last animation finished

	$: stage = stages[Object.keys(stages)[currentStage]]
	$: lastStageDone = currentStage == numberOfStages
	$: console.log(`currentStage`, currentStage)
	$: console.log(`step`, step)

	function onScrollDown() {
		console.log("onScrollDown!")
		if (lastStageDone) return
		step++
		if (step == stage.steps.length) {
			currentStage++
			step = 0
			// if (lastStageDone) {
			// 	setTimeout(() => {
			// 	if (lastStageDone) done = true
			// }, transitionDuration)
			// }
		}
	}

	function onScrollUp() {
		console.log("onScrollUp!")
		if (step == 0 && currentStage == 0) return
		step--
		if (step < 0) {
			currentStage--
			step = stage.steps.length - 1
		}
	}

	onMount(() => {
		console.log("Mount!")
		scrollController = new ScrollController({ onScrollUp, onScrollDown })
		// @ts-ignore
		tsParticles.load("particles", particles)
		mounted = true
	})

	onDestroy(() => {
		console.log("Destroy!")
		scrollController?.destroy()
	})
</script>

<section id="ecosystem" class="row">
	<div class="inner-section">
		<div id="particles" class:mounted />

		{#if mounted}
			{#if currentStage == 0}
				<LandingIntro {step} />
			{:else if currentStage == 1}
				<LandingContent {step} />
			{:else if currentStage == 2}
				<LandingOutro {step} />
			{/if}
		{/if}
	</div>

	{#if mounted}
		<LandingFooter>
			<div class="next" class:done in:fly={{ y: -50, duration: 2800, delay: 2200 }}>
				<ArrowDown />
				{$t("section.landing.scroll")}
			</div>
		</LandingFooter>
	{/if}
</section>

<style lang="sass">
	:root
		--landing-footer-height: 80px
		--landing-footer-width: var(--landing-main-width)
		--landing-header-height: 160px
		--landing-header-width: var(--landing-main-width)
		--landing-main-height: calc(100% - var(--landing-header-height) - var(--landing-footer-height))
		--landing-main-width: calc(100% - 2 * var(--landing-aside-width))
		--landing-aside-width: 28%

		@media (max-width: 1100px)
			--landing-aside-width: 0px

		@media (max-width: 700px), (max-height: 700px)
			--landing-footer-height: 60px
			--landing-header-height: 110px

	#particles 
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		opacity: 0
		transition: opacity 1s
		
		&.mounted
			opacity: 1

	.intro
		position: absolute
		z-index: 1
		pointer-events: none
		text-align: center
		display: flex
		flex-direction: column
		gap: 2px
		margin-top: 4vmin

		> .title
			font-size: 36px
			font-weight: bold
		> .subtitle
			font-size: 20px
		> img
			max-width: 100vw
			max-height: 70vh

	section
		height: 100vh
		padding: var(--header-height) 0 0
		justify-content: space-evenly
		place-items: center
		background: white
		position: relative
	
	.inner-section
		width: 100%
		height: 100%
		position: relative
		background: linear-gradient(to right bottom, #FFFEFE, #EAEAEA)

	.stages
		position: absolute
		pointer-events: none
		flex-direction: row
		align-items: center
		justify-content: center
		flex-wrap: wrap
	
	main
		width: 420px
		max-width: 95vw
		height: 24vh
		overflow: visible
	
	.stage
		gap: 4rem
		position: absolute
		width: 420px
		max-width: 95vw
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
			> .blocks
				transition-delay: 0
				opacity: 0
	
	.pyramid-block
		position: absolute
		transition: bottom 0.6s
	

	.shadow
		filter: drop-shadow(0 16rem 8rem rgba(0, 0, 0, 0.2))

	.next
		transition: 0.3s
		color: var(--gray-4)
		gap: 14px
		font-size: 20px
		flex-direction: row
		align-items: center

		&.done
			color: var(--primary)
	
	@media (max-width: 900px)
		.stage
			align-items: center
		
		.index
			font-size: 36rem !important
			top: -26rem !important
			left: unset !important

	@media (max-width: 510px)
		aside
			transform: scale(0.7)

	@media (max-width: 390px)
		aside
			transform: scale(0.58)
</style>
