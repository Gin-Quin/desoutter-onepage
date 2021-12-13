<script lang="ts">
	import { json } from "svelte-i18n"
	import type { TranslationObject } from "locales/TranslationObject"
	import LandingNavigationItem from "atoms/LandingNavigationItem.svelte"
	import { fade } from "svelte/transition"

	type Link = TranslationObject["section"]["landing"]["navigation"]["links"][number]

	$: content = $json(
		`section.landing.navigation`
	) as TranslationObject["section"]["landing"]["navigation"]

	export let currentStage: number
	export let step: number

	let activeLink: number | null = null

	$: findLinkActive(currentStage, step)

	function onClickLink(link: Link) {
		currentStage = link.stage
		step = link.step
		document.documentElement.scrollTop = 0
	}

	function findLinkActive(currentStage: number, step: number) {
		activeLink = content.links.findIndex((link) => link.stage == currentStage && link.step == step)
	}
</script>

<nav in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
	{#each content.links as link, index}
		<LandingNavigationItem
			active={index == activeLink}
			on:click={() => onClickLink(link)}
			label={link.label}
		/>
	{/each}
</nav>

<style lang="sass">
	nav
		position: absolute
		flex-direction: column
		align-items: center
		top: 20vh
		left: 3vw
</style>
