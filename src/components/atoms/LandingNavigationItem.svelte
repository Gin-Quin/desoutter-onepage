<script lang="ts">
	export let active = false
	export let label = ""
	let labelVisible = false
</script>

<div
	class="dot"
	class:active
	on:click
	on:mouseenter={() => (labelVisible = true)}
	on:mouseleave={() => (labelVisible = false)}
>
	<button class="label" class:labelVisible>
		{label}
	</button>
</div>

<style lang="sass">
	.dot
		cursor: pointer
		border-radius: 100%
		width: 22px
		height: 22px
		justify-content: center
		align-items: center
		position: relative
		z-index: 1
		// border: 4px solid transparent

		&::before
			content: ""
			background: white
			border: 1px solid var(--gray-6)
			border-radius: 100%
			width: 10px
			height: 10px
			transition: all 200ms

		&.active
			&::before
				background: var(--primary)
				border: 1px solid var(--primary)
				width: 12px
				height: 12px
				box-shadow: 0 0 3px 1px rgba(255, 0, 0, 0.5)
	
	.label
		position: absolute
		display: none
		left: 8rem
		top: -2rem
		background: var(--primary)
		border-radius: 5rem
		padding: 2.5rem 5rem
		font-size: 3.5rem
		height: 10rem

		&.labelVisible
			display: flex

</style>
