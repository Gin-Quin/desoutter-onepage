<script lang="ts">
	import { t } from "svelte-i18n"
	import ArrowDown from "svelte-material-icons/ArrowDown.svelte"
</script>

<footer>
	<div class="next">
		<ArrowDown />
		{$t("section.landing.scroll")}
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

		// &.done
		// 	color: var(--primary)
</style>
