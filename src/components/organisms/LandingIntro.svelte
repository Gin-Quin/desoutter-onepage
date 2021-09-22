<script lang="ts">
	import FoldedCard from "atoms/FoldedCard.svelte"
	import LandingHeader from "atoms/LandingHeader.svelte"
	import LandingMain from "atoms/LandingMain.svelte"
	import { t } from "svelte-i18n"
	import { fade, fly } from "svelte/transition"
	import introTools from "config/introTools.json"
	import ToolCard from "atoms/ToolCard.svelte"
	import LandingFooter from "atoms/LandingFooter.svelte"

	export let step: number
</script>

<div class="intro">
	<LandingHeader>
		<div class="title-container">
			<div class="title" in:fly={{ duration: 2000, y: -30 }} out:fade={{ duration: 200 }}>
				{$t("section.landing.stages.intro.title")}
			</div>
			<div class="subtitle" in:fade={{ duration: 1800, delay: 1200 }} out:fade={{ duration: 200 }}>
				<FoldedCard>
					{$t("section.landing.stages.intro.subtitle")}
				</FoldedCard>
			</div>
		</div>
	</LandingHeader>

	<LandingMain>
		{#each introTools as { name, style, position } (name)}
			<ToolCard {name} {style} position={position[step]} delay={1200} duration={1200} />
		{/each}

		{#if step > 0}
			<div class="image-container">
				<img
					in:fly={{ y: 50, duration: 800 }}
					out:fly={{ y: 50, duration: 150 }}
					class="pyramid-intro"
					src="/images/pyramid/pyramid-intro.svg"
					alt="desoutter-pyramid"
				/>
			</div>
		{/if}
	</LandingMain>

	<LandingFooter delay={1800} />
</div>

<style lang="sass">
	.intro
		width: 100%
		height: 100%
		align-items: center
		pointer-events: none

	.title-container
		gap: 10px
		align-items: center

	.title
		font-size: 20px

	.subtitle
		font-size: 36px

	.image-container
		flex: 1 0 0
		align-items: center
		justify-content: center

	@media (max-width: 700px), (max-height: 700px)
		.title-container
			gap: 6px
		.title
			font-size: 16px
		.subtitle
			font-size: 22px
</style>
