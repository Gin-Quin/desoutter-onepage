<script lang="ts">
	import { onMount } from "svelte"
	import { _, json, t } from "svelte-i18n"
	import { tsParticles } from "tsparticles"
	import particles from "src/config/particles.json"
	import ScrollController from "utilities/ScrollController"
	import LandingIntro from "organisms/LandingIntro.svelte"
	import LandingContent from "organisms/LandingContent.svelte"
	import LandingOutro from "organisms/LandingOutro.svelte"
	import ArrowDown from "icons/ArrowDown.svelte"
	import LandingFooter from "atoms/LandingFooter.svelte"
	import { fly } from "svelte/transition"
	import Header from "./Header.svelte"

	const stages = $json("section.landing.stages") as Record<string, { steps: Array<unknown> }>
	const stageKeys = Object.keys(stages)
	const lastAnimationDuration = 500

	let currentStage = 0
	let step = 0
	let mounted = false
	let done = false // last stage done AND last animation finished
	let scrollController: null | ScrollController = null

	$: stage = stages[stageKeys[currentStage]]
	$: updateScreenControllerStatus(done)

	function isLastStageDone() {
		return (
			currentStage == stageKeys.length - 1 &&
			step == stages[stageKeys[currentStage]].steps.length - 1
		)
	}

	function updateScreenControllerStatus(done: boolean) {
		if (scrollController) scrollController.active = !done
	}

	function onScrollDown() {
		if (isLastStageDone()) return

		step++
		if (step == stage.steps.length) {
			currentStage++
			step = 0
		}

		if (isLastStageDone()) {
			setTimeout(() => {
				if (isLastStageDone()) done = true
			}, lastAnimationDuration)
		}
	}

	function onScrollUp() {
		if (step == 0 && currentStage == 0) return
		done = false
		step--
		if (step < 0) {
			currentStage--
			step = stages[stageKeys[currentStage]].steps.length - 1
		}
	}

	onMount(() => {
		scrollController = new ScrollController({ onScrollUp, onScrollDown })
		particles.particles.number.value =
			(($json("section.landing.particles.density") as number) * innerWidth * innerHeight) / 10 ** 6
		particles.particles.line_linked.color = $t("section.landing.particles.color.line")
		particles.particles.color.value = $t("section.landing.particles.color.dot")
		// @ts-ignore
		tsParticles.load("particles", particles)
		mounted = true
	})
</script>

<Header />

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

		{#if done}
			<LandingFooter done />
		{/if}
	</div>
</section>

<style lang="sass">
	:root
		--landing-footer-height: 80px
		--landing-footer-width: var(--landing-main-width)
		--landing-header-height: 190px
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
		z-index: 100
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
