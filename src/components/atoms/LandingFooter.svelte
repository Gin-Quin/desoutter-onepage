<script lang="ts">
	import { t } from "svelte-i18n"
	import ArrowDown from "svelte-material-icons/ArrowDown.svelte"
	import { fly, fade } from "svelte/transition"

	export let done = false
	export let delay = 0
</script>

<footer in:fly={{ y: -30, duration: 750, delay }} out:fly={{ y: -30, duration: 450, delay }}>
	<div class="next" class:done>
		<ArrowDown size={done ? "28" : "24"} />
		{#if !done}
			{$t("section.landing.scroll")}
		{/if}
	</div>
</footer>

<style lang="sass">
	footer
		position: absolute
		bottom: 0
		left: var(--landing-aside-width)
		height: var(--landing-footer-height)
		width: var(--landing-main-width)
		// background: rgba(0, 255, 0, 0.5)
		align-items: center
		justify-content: center

	.next
		transition: 0.3s
		color: var(--gray-4)
		gap: 14px
		font-size: 20px
		flex-direction: row
		align-items: center

		&.done
			color: var(--primary)
</style>
