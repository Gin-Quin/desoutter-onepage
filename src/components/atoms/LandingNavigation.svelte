<script lang="ts">
	import type { TranslationObject } from "locales/TranslationObject"
	import { json } from "svelte-i18n"
	import { fade, slide } from "svelte/transition"

	type Content = TranslationObject["section"]["landing"]["navigation"]
	type Link = Content["links"][number]

	export let stage: number
	export let step: number

	$: content = <Content>$json("section.landing.navigation")

	function navigateTo(link: Link) {
		stage = link.stage
		step = link.step
	}
</script>

<main in:fade={{ delay: 170, duration: 200 }} out:fade={{ duration: 100 }}>
	{#each content.links as link}
		<button on:click={() => navigateTo(link)}>
			{link.label}
		</button>
	{/each}
</main>

<style lang="sass">
main
	flex-direction: row
	gap: 2.5rem
	flex-wrap: wrap
	z-index: 1
	position: fixed
	left: 0
	bottom: 220px
	height: 60px
	width: 100%
	margin-left: 30rem


button
	background: var(--primary)
	border-radius: 5rem
	padding: 2.5rem 5rem
	font-size: 3.5rem
	height: 10rem

</style>
