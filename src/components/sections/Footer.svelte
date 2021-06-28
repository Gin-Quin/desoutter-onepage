<script lang="ts">
	import { _ } from "svelte-i18n"
	import Facebook from "icons/Facebook.svelte"
	import Twitter from "icons/Twitter.svelte"

	const socialNetworks: Array<[any, string]> = [
		[Facebook, `/`],
		[Twitter, `/`],
	]
</script>

<footer class="bg-black row">
	<aside>
		<div class="subtitle">{$_("section.footer.stayConnected")}</div>
		<div class="infos">
			{$_(`section.footer.signUp`)}
		</div>
		<button class="small">{$_(`subscribe`)}</button>
		<div class="socialNetworks row">
			{#each socialNetworks as [icon, href]}
				<a {href}>
					<svelte:component this={icon} size="2em" />
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
		<button class="small">{$_(`section.footer.discoverTheBrand`)}</button>
		<div class="miscellaneous">
			<a href="/">{$_(`section.footer.legalNotice`)}</a>
			<a href="/">{$_(`section.footer.SDS`)}</a>
			<a href="/">{$_(`section.footer.editSettings`)}</a>
		</div>
	</main>

	<nav>
		<a href="/">{$_(`Desoutter`)}</a>
		<a href="/">{$_(`ecosystem`)}</a>
		<a href="/">{$_(`ourProducts`)}</a>
		<a href="/">{$_(`services`)}</a>
		<a href="/">{$_(`contact`)}</a>
	</nav>
</footer>

<style lang="sass">
	footer
		font-size: 3.5rem
		justify-content: space-evenly
		color: var(--white)
		padding: 12.5rem 0

		> *
			max-width: 40%
			gap: 5rem
			align-items: start
		a
			color: var(--white)
			&:hover
				text-decoration: underline
		button
			border: 1px solid var(--white)
	
	.socialNetworks
		gap: 3rem
	
	.subtitle
		flex-direction: row
		gap: 7rem

</style>
