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
		<a href="/">{$_("header.ecosystem")}</a>
		<a href="/">{$_("Desoutter")}</a>
		<a href="/">{$_("header.contact")}</a>
		<button class="visit-tools bg-primary">
			{$_("header.visitDesoutterTools")}
			<ArrowRight size="1.5em" />
		</button>
	</nav>
</header>

<style lang="sass">
	header
		position: absolute
		top: 0
		width: 100%
		justify-content: space-between
		height: 17rem
		padding-left: 3rem
		place-items: center
		gap: 7rem
		text-transform: uppercase
		font-weight: 400
	
		// > .title
		// 	font-size: 6rem
	
	nav
		display: contents

		> button
			height: 100%
			border-radius: 0
			font-weight: bold
			padding: 0 6rem
			gap: 3rem
			font-size: 4rem
</style>
