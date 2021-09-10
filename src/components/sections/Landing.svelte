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
	const stageKeys = Object.keys(stages)

	let currentStage = 0
	let step = 0
	let mounted = false
	let done = false // last stage done AND last animation finished

	$: stage = stages[stageKeys[currentStage]]
	$: lastStageDone = currentStage == stageKeys.length
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
			step = stages[stageKeys[currentStage]].steps.length - 1
		}
	}

	onMount(() => {
		console.log("Mount!")
		new ScrollController({ onScrollUp, onScrollDown })
		// @ts-ignore
		tsParticles.load("particles", particles)
		mounted = true
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
</style>
