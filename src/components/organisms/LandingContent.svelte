<script lang="ts">
	import Pyramid from "molecules/Pyramid.svelte"
	import { json, t } from "svelte-i18n"
	import { fly } from "svelte/transition"
	import ArrowRight from "icons/ArrowRight.svelte"

	export let step = 0

	const transitionDuration = 520

	$: content = $json(`section.landing.stages.content.steps`) as Array<{
		title: string
		subtitle: string
		descriptionTitle: string
		description: string
		tools: Array<string>
		coreBenefits: Array<string>
	}>
</script>

<div class="stages">
	<main>
		<div
			class="stage"
			in:fly={{ y: -200, duration: transitionDuration }}
			out:fly={{ y: -400, duration: transitionDuration }}
		>
			<div
				class="index"
				in:fly={{ y: -200, duration: transitionDuration }}
				out:fly={{ y: -400, duration: transitionDuration }}
			>
				{step + 1}
			</div>
			<div class="title">{content[step].title}</div>
			<div class="subtitle">{content[step].subtitle}</div>
			<p>{@html content[step].description}</p>
		</div>

		<aside>
			<Pyramid />
		</aside>
	</main>

	<footer>
		<div class="benefits-title">{$t("section.landing.stages.content.coreBenefits")}</div>
		<div class="benefits">
			{#each content[step].coreBenefits as benefit}
				<div class="benefit">
					<ArrowRight />
					<p>{@html benefit}</p>
				</div>
			{/each}
		</div>
	</footer>
</div>
