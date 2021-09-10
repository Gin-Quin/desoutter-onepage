<script lang="ts">
	import FoldedCard from "atoms/FoldedCard.svelte"
	import LandingHeader from "atoms/LandingHeader.svelte"
	import LandingMain from "atoms/LandingMain.svelte"
	import Pyramid from "molecules/Pyramid.svelte"
	import { onDestroy, onMount } from "svelte"
	import { t } from "svelte-i18n"
	import { fade, fly } from "svelte/transition"

	export let step = 0

	const inDuration = 650
	const outDuration = 300

	let focus = 0
	let focusTimeout = setInterval(() => step == 0 && (focus = (focus + 1) % 4), 500)

	onDestroy(() => {
		console.log("Destroy outro")
		clearInterval(focusTimeout)
	})
</script>

<div
	id="landing-outro"
	in:fade={{ duration: inDuration }}
	out:fade={{ duration: outDuration }}
	style="
		--landing-header-height: 120px;
		--landing-aside-width: 0;
		--landing-header-width: 100%;
		--landing-main-width: 100%;
	"
>
	<LandingHeader>
		<header>
			<div class="title">
				{$t("section.landing.stages.outro.title")}
			</div>
			<FoldedCard>
				<div class="subtitle">
					{$t("section.landing.stages.outro.subtitle")}
				</div>
			</FoldedCard>
		</header>
	</LandingHeader>

	<LandingMain>
		<main>
			<div class="content">
				<FoldedCard>
					<div class="description-title">
						{$t("section.landing.stages.outro.descriptionTitle")}
					</div>
				</FoldedCard>
				<div class="description">
					{@html $t("section.landing.stages.outro.description")}
				</div>
			</div>

			<aside>
				<Pyramid gap={step ? 0 : 25} focus={step ? null : focus} scale={0.8} />
			</aside>
		</main>
	</LandingMain>
</div>

<style lang="sass">
	:global(#landing-outro .content .description p)
		line-height: 6.5rem

	:global(#landing-outro .content .description em)
		font-weight: bold
		font-style: normal
		color: var(--primary)

	#landing-outro
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%

	header
		height: 100%
		flex-direction: column
		align-items: center
		justify-content: flex-end
		gap: 3.5rem

		.title
			font-size: 5rem

		.subtitle
			font-size: 6rem

	main
		flex-direction: row
		width: 100%
		height: 100%
		align-items: center
		padding-bottom: 5%

	.content
		align-items: flex-start
		width: 60%
		padding-left: 15%
		padding-right: 5%

	.description-title
		font-size: 6rem

	.description
		padding: 8rem 4rem
		text-align: justify
		gap: 4rem
		font-size: 3.5rem

	aside
		width: 40%
</style>
