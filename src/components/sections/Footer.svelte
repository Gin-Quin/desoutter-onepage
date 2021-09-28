<script lang="ts">
	import { json, _ } from "svelte-i18n"
	import Facebook from "icons/Facebook.svelte"
	import Instagram from "icons/Instagram.svelte"
	import Twitter from "icons/Twitter.svelte"
	import Youtube from "icons/Youtube.svelte"
	import Linkedin from "icons/Linkedin.svelte"
	import type { TranslationObject } from "locales/TranslationObject"

	const socialNetworks = $json(
		"section.footer.socialNetworks"
	) as TranslationObject["section"]["footer"]["socialNetworks"]

	const navigation = $json(
		"section.footer.navigation"
	) as TranslationObject["section"]["footer"]["navigation"]

	const socialNetworkIcons: Record<string, typeof Twitter> = {
		Twitter,
		Facebook,
		Instagram,
		Youtube,
		Linkedin,
	}
</script>

<footer class="bg-black">
	<div class="inner-footer row">
		<aside>
			<div class="subtitle">{$_("section.footer.stayConnected")}</div>
			<div class="infos">
				{$_(`section.footer.signUp`)}
			</div>
			<a target="_blank" class="button small" href={$_(`section.footer.subscribe.link`)}>
				{$_(`section.footer.subscribe.label`)}
			</a>
			<div class="socialNetworks row">
				{#each socialNetworks as { name, link }}
					<a target="_blank" href={link}>
						<svelte:component this={socialNetworkIcons[name]} size="2em" />
					</a>
				{/each}
			</div>
		</aside>

		<main>
			<div class="subtitle">
				{$_(`Desoutter`)}
				<span class="slogan">{$_(`section.footer.moreThanProductivity`)}</span>
			</div>
			<div class="infos">
				{$_(`section.footer.history`)}
			</div>
			<a
				target="_blank"
				class="button small margin-bottom-4"
				href={$_(`section.footer.discoverTheBrand.link`)}
			>
				{$_(`section.footer.discoverTheBrand.label`)}
			</a>
			<div class="miscellaneous row">
				<a target="_blank" href={$_(`section.footer.legalNotice.link`)}
					>{$_(`section.footer.legalNotice.label`)}</a
				>
				<!-- <a href="/">{$_(`section.footer.SDS`)}</a> -->
				<!-- <a href="/">{$_(`section.footer.editSettings`)}</a> -->
			</div>
		</main>

		<nav>
			{#each navigation as { label, link }}
				<a href={link}>{label}</a>
			{/each}
		</nav>
	</div>
</footer>

<style lang="sass">
	footer
		font-size: 3.5rem
		color: var(--white)
		padding: 12.5rem 5%
		z-index: 100

		a
			color: var(--white)
			&:hover
				text-decoration: underline

		button, .button
			border: 1px solid var(--white)

		.inner-footer
			justify-content: space-around
			gap: 12rem
			margin: auto
			max-width: 880px
			
			> *
				gap: 4rem
				align-items: start
	
	aside
		width: 60rem
		
	main
		width: 115rem
		
	nav
		align-self: center
		text-decoration: underline
	
	.socialNetworks
		gap: 3rem
	
	.subtitle
		flex-direction: row
		gap: 5rem
		font-size: 5rem
		align-items: center
		// margin-bottom: 1rem
		font-weight: bold
	
	.slogan
		font-size: 3rem
	
	.margin-bottom-4
		margin-bottom: 4rem

	.miscellaneous
		gap: 3rem 7.5rem
		font-weight: bold
		font-size: 3rem

		> a
			text-align: center

	@media (max-width: 720px)
		footer
			flex-direction: column
			align-items: center

			> *
				width: 100% !important
			
			nav, .miscellaneous
				justify-content: center
				flex-direction: row
				flex-wrap: wrap
			
			aside, main
				align-items: center
</style>
