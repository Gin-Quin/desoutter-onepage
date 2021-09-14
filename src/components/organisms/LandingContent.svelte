<script lang="ts">
	import Pyramid from "molecules/Pyramid.svelte"
	import { json, t } from "svelte-i18n"
	import { fly, slide } from "svelte/transition"
	import ArrowRight from "icons/ArrowRight.svelte"
	import FoldedCard from "atoms/FoldedCard.svelte"
	import ToolCard from "atoms/ToolCard.svelte"

	export let step = 0

	const inDuration = 650
	const outDuration = 550

	$: content = $json(`section.landing.stages.content.steps`) as Array<{
		title: string
		subtitle: string
		descriptionTitle: string
		description: string
		tools: Array<string>
		coreBenefits: Array<string>
	}>
</script>

<div id="landing-content" style="--tool-size: 100px;">
	<main>
		{#each content as stepContent, index}
			{#if index == step}
				<div
					class="content-step"
					in:fly={{ y: -200, duration: inDuration }}
					out:fly={{ y: -300, duration: outDuration }}
				>
					<div
						class="index"
						in:fly={{ y: -200, duration: inDuration }}
						out:fly={{ y: -300, duration: outDuration }}
					>
						{step || ""}
					</div>

					<div class="infos">
						<FoldedCard>
							<div class="title">{stepContent.title}</div>
						</FoldedCard>

						<div class="description">{@html stepContent.description}</div>

						<div class="tools">
							{#each stepContent.tools as tool}
								<ToolCard
									name={tool}
									style={tool.toLowerCase().includes("logo") ? "logo" : "small"}
								/>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}

		<aside in:fly={{ y: -400, duration: inDuration }} out:fly={{ y: -500, duration: outDuration }}>
			<Pyramid gap={25} focus={step ? step - 1 : null} scale={0.9} />
		</aside>
	</main>

	<footer in:slide={{ delay: 150, duration: 300 }} out:slide={{ duration: 200 }}>
		<div class="benefits-title">
			<div class="transformer">
				{$t("section.landing.stages.content.coreBenefits")}
			</div>
		</div>
		<div class="benefits">
			{#each content[step].coreBenefits as benefit}
				<div class="benefit">
					<ArrowRight size="20" />
					<p>{@html benefit}</p>
				</div>
			{/each}
		</div>
	</footer>
</div>

<style lang="sass">
	:global(#landing-content .infos .description em)
		font-weight: bold
		font-style: normal

	:global(#landing-content .infos .description p)
		line-height: 7rem

	:global(#landing-content .benefits em)
		font-weight: bold
		font-style: normal
		color: var(--primary)

	:root
		--content-footer-height: 220px
	
	#landing-content
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		pointer-events: none
		flex-wrap: wrap
	
	main
		height: calc(100% - var(--content-footer-height))
		width: 100%
		display: flex
		flex-direction: row
		position: relative

	footer
		position: absolute
		bottom: 0
		left: 0
		width: 100%
		height: var(--content-footer-height)
		background: white

	.benefits-title
		width: 160px
		font-weight: bold
		color: var(--gray-2)
		font-size: 5rem

		> .transformer
			transform-origin: right top
			transform: rotate(-90deg) translateY(-7rem) translateX(-4px)

	.benefits
		padding: 8rem 4rem
		gap: 2rem

	.benefit
		flex-direction: row
		align-items: center
		gap: 2rem
		font-size: 14px

	
	.content-step
		gap: 4rem
		position: absolute
		width: 60%
		height: 100%
		flex-direction: row
		padding-left: 7%
		padding-top: 2%

		> *
			z-index: 1
		
		.index
			flex: 0 0 80px
			z-index: 0
			font-size: 36rem
			color: var(--primary)
			opacity: 0.12
			left: 4rem
			font-weight: bold

	.infos
		padding-top: 10rem
		padding-left: 2rem
		align-items: flex-start

		.title
			font-size: 6rem

		.description
			padding: 8rem 0
			// line-height: 10rem !important
			gap: 2rem

		.tools
			flex-direction: row
			gap: 4rem

	aside
		position: absolute
		right: 0
		top: 0
		width: 40%
		height: 100%
		align-items: center
		justify-content: center

	@media (max-width: 510px)
		aside
			transform: scale(0.7)

	@media (max-width: 390px)
		aside
			transform: scale(0.58)
</style>
