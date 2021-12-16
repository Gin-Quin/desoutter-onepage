<script lang="ts">
	import ChevronDown from "icons/ChevronDown.svelte"
	import ChevronUp from "icons/ChevronUp.svelte"

	type Item = {
		value: any
		text?: string
	}

	export let name = ""
	export let value: null | unknown = null
	export let placeholder = "Select an option..."
	export let items: Item[]

	let selectedItem = -1

	$: empty = selectedItem == -1

	function select(index: number) {
		selectedItem = index
		value = items[selectedItem].value
	}

	function onKeypress(event: KeyboardEvent) {
		event.preventDefault()
	}
</script>

<div class="svelect">
	<input
		{name}
		placeholder={empty ? placeholder : ""}
		on:keypress={onKeypress}
		autocomplete="off"
	/>

	<div class="dropdown">
		{#each items as item, index}
			<div class="option" on:mousedown={() => select(index)}>
				<slot name="item" {item}>
					{item.text || item.value}
				</slot>
			</div>
		{/each}
	</div>

	{#if !empty}
		<div class="content">
			<div class="option">
				<slot name="item" item={items[selectedItem]}>
					{items[selectedItem].text || items[selectedItem].value}
				</slot>
			</div>
		</div>
	{/if}

	<div class="chevron down">
		<ChevronDown size="1.5em" />
	</div>

	<div class="chevron up">
		<ChevronUp size="1.5em" />
	</div>
</div>

<style lang="sass">
	.svelect
		position: relative
		height: 10rem
		width: 100%
		display: flex
		place-items: center
		cursor: pointer
		flex-direction: row
		padding: 0
		border: none

	input
		width: 100%
		height: 100%
		caret-color: transparent
		cursor: default
	
	.chevron
		position: absolute
		right: 3rem
		pointer-events: none
	
	.option
		height: 8rem
		display: flex
		flex-direction: row
		display: flex
		place-items: center
		padding: 0 2rem

	.content
		position: absolute
		overflow: hidden
		width: 100%
		height: 100%
		pointer-events: none

		> .option
			height: 10rem


	.dropdown
		display: none
		position: absolute
		left: 1px
		top: 10rem
		background: var(--white)
		width: calc(100% - 2px)
		box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.3)
		z-index: 10000
		
		> .option
			&:hover
				background: var(--gray)
	
	input:focus
		~ .dropdown
			display: flex
		~ .down
			display: none

	input:not(:focus)
		~ .up
			display: none

</style>
