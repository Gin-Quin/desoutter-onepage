<script lang="ts">
	import _ from "src/i18n"
	import ArrowRight from "icons/ArrowRight.svelte"
</script>

<header>
	<!-- <div class="title bold">{$_("Desoutter")}</div> -->
	<img
		src="https://www.desouttertools.com/bundles/desiwid/images/desoutter-logo.png?3.28"
		alt="desoutter-logo"
	/>
	<div class="grow" />
	<nav>
		<a href="#demonstration">{$_("ourProducts")}</a>
		<a href="#faq">{$_("services")}</a>
		<a href="#contact">{$_("contact")}</a>
		<a class="visit-tools" href="https://www.desouttertools.com/" target="_blank">
			<button class=" bg-primary">
				{$_("section.header.visitDesoutterTools")}
				<ArrowRight size="1.5em" />
			</button>
		</a>
	</nav>
</header>

<style lang="sass">
	header
		position: absolute
		top: 0
		width: 100%
		justify-content: space-between
		height: var(--header-height)
		padding-left: 3rem
		place-items: center
		gap: 7rem
		text-transform: uppercase
		font-weight: 400
		z-index: 200
		position: absolute
		
	nav
		display: contents	
		> a
			color: inherit
			text-align: center
	
	.visit-tools
		height: 100%

		> button
			justify-content: center
			width: 100%
			height: 100%
			border-radius: 0
			font-weight: bold
			padding: 0 6rem
			gap: 3rem
			font-size: 4rem
			&:active
				top: 0

	@media (max-width: 1020px)
		nav
			> a:not(.visit-tools)
				display: none

	@media (max-width: 680px)
		header
			padding: 0
			gap: 0
			> img
				display: none
		.visit-tools
			width: 100%
</style>
