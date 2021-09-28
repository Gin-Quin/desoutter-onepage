<script lang="ts">
	import { fly } from "svelte/transition"
	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte"
	import ArrowRight from "svelte-material-icons/ArrowRight.svelte"
	import Information from "svelte-material-icons/Information.svelte"
	import { json, t } from "svelte-i18n"
	import type { TranslationObject } from "locales/TranslationObject"
	import type { FactoryItem } from "types/FactoryItem"
	import MiniPyramid from "atoms/MiniPyramid.svelte"
	import FactoryItemCard from "atoms/FactoryItemCard.svelte"
	import { onMount, tick } from "svelte"
	import FactoryController from "utilities/FactoryController"
	import tippy from "tippy.js"
	import type { Instance as TippyInstance } from "tippy.js"

	type Group = {
		title?: string
		items: Array<FactoryItem>
	}

	let imageContainer!: HTMLElement
	let activeItem: Element | undefined = undefined
	let tippyInstance: TippyInstance | null = null
	let factoryController!: FactoryController
	let currentItem = -1
	let currentChapter = 0
	let left = 0
	let top = 0
	let zoom = 1
	let isFullyVisible = false

	$: chapters = $json(
		"section.demonstration.chapters"
	) as TranslationObject["section"]["demonstration"]["chapters"]

	onMount(() => {
		checkIfFullyVisible()
		factoryController = new FactoryController(imageContainer, (update) => {
			left = update.left
			top = update.top
			zoom = update.zoom
		})
	})

	const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

	function checkIfFullyVisible() {
		const { top } = imageContainer.getBoundingClientRect()
		if (window.scrollY >= top) isFullyVisible = true
	}

	function getChapterGroups(chapter: number): Array<Group> {
		const groups = chapters[chapter].groups as Array<Group>
		let itemIndex = 0
		groups.forEach((group) => group.items.forEach((item) => (item.index = itemIndex++)))
		return groups
	}

	function getChapterItems(chapter: number): Array<FactoryItem> {
		return getChapterGroups(chapter)
			.map((group) => group.items)
			.flat()
	}

	function isItemActive(
		currentChapter: number,
		currentItem: number,
		chapter: number,
		item: number
	): boolean {
		return chapter == currentChapter && item == currentItem
	}

	function isItemVisible(
		currentChapter: number,
		currentItem: number,
		chapter: number,
		item: number
	): boolean {
		return chapter < currentChapter || (chapter == currentChapter && item <= currentItem)
	}

	async function selectItem(item: FactoryItem) {
		currentItem = item.index || 0
		factoryController.centerItem(item, getFactoryItemSize(item))
		tippyInstance?.hide()
		tippyInstance = null
		await tick()
		await sleep(250)
		tippyInstance!?.hide()
		if (!activeItem) return

		tippyInstance = tippy(activeItem, {
			content: getTippyContent(item),
			zIndex: 99,
			duration: 0,
			arrow: false,
			allowHTML: true,
			theme: "desoutter",
			hideOnClick: false,
			// sticky: false,
			placement: factoryController.getPreferredPlacement(item, getFactoryItemSize(item)),
			maxWidth: item.image ? 530 : 350,
			onShow({ popper }) {
				popper.animate([{ opacity: 0 }, { opacity: 1 }], {
					duration: 150,
				})
			},
		})
		tippyInstance.show()
	}

	function getTippyContent(item: FactoryItem): string {
		const rowMode = item.image && item.image.height > item.image.width
		const wrapper = (content: string, row = false) =>
			`<div class="tippy-wrapper ${row ? "row" : "column"}">${content}</div>`
		const image = item.image
			? `<img src="${item.image.src}" width="${item.image.width}" height="${item.image.height}">`
			: ""
		return wrapper(
			image +
				`<div class="tippy-inner-content"><div class="tippy-desoutter-title">${item.label}</div><div class="tippy-desoutter-description">${item.description}</div></div>`,
			rowMode
		)
	}

	function previousChapter() {
		currentChapter--
		tippyInstance?.hide()
		tippyInstance = null
		currentItem = getChapterItems(currentChapter).length
	}

	function nextChapter() {
		currentChapter++
		tippyInstance?.hide()
		tippyInstance = null
		currentItem = -1
	}

	function getFactoryItemSize(item: FactoryItem): number {
		return item.tool ? (item.largeTool ? 324 : 180) : 130
	}
</script>

<svelte:window on:scroll={checkIfFullyVisible} />

<section id="demonstration">
	<aside>
		{#if currentChapter > 0}
			<button
				class="previous-chapter"
				on:click={previousChapter}
				transition:fly={{ opacity: 1, y: -200, duration: 400 }}
			>
				<ArrowLeft size="24" />
				{chapters[currentChapter - 1].title}
				<div />
			</button>
		{/if}

		<header>
			<MiniPyramid step={currentChapter} />
			<div class="title">
				{chapters[currentChapter].title}
			</div>
		</header>

		<div class="description">
			{@html chapters[currentChapter].description}
		</div>

		<div class="groups">
			{#each getChapterGroups(currentChapter) as group}
				<div class="group">
					{#if group.title}
						<div class="group-title">{group.title}</div>
					{/if}
					<div class="group-items">
						{#each group.items as item}
							<button
								class="group-item"
								class:active={item.index == currentItem}
								on:click={() => selectItem(item)}
							>
								{item.label}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div style="flex: 1;" />

		<div class="infotip">
			<div class="icon">
				<Information size="22" />
			</div>
			<div class="description">
				{@html chapters[currentChapter].infotip}
			</div>
		</div>

		{#if isFullyVisible}
			{#if currentChapter < chapters.length - 1}
				<button
					class="next-chapter"
					on:click={nextChapter}
					transition:fly={{ opacity: 1, y: 200, duration: 400 }}
				>
					<div />
					{chapters[currentChapter + 1].title}
					<ArrowRight size="24" />
				</button>
			{/if}
		{/if}
	</aside>

	<main bind:this={imageContainer}>
		{#if factoryController}
			<div
				class="factory"
				style="
					left: {left}px;
					top: {top}px;
					transform: scale({zoom});
				"
			>
				<img
					src="/images/factory-large-cropped.jpg"
					alt="factory"
					width={factoryController.width}
					height={factoryController.height}
				/>

				{#each chapters as _, chapter (chapter)}
					{#each getChapterItems(chapter) as item, itemIndex (1000 * chapter + itemIndex)}
						{#if isItemActive(currentChapter, currentItem, chapter, itemIndex)}
							<FactoryItemCard
								bind:element={activeItem}
								active
								{item}
								size={getFactoryItemSize(item)}
							/>
						{:else if isItemVisible(currentChapter, currentItem, chapter, itemIndex)}
							<FactoryItemCard {item} size={getFactoryItemSize(item)} />
						{/if}
					{/each}
				{/each}
			</div>
		{/if}
	</main>
</section>

<style lang="sass">
	#demonstration
		--chapter-navigation-height: 12rem
		height: 100vh
		width: 100%
		flex-direction: row
		overflow: hidden

	// -- Left panel --
	aside
		width: min(35%, 460px)
		gap: 6rem
		padding: calc(var(--chapter-navigation-height) + 9rem) 6rem
		background: var(--dark)
		position: relative
		color: white

		> header
			gap: 3rem

			> .title
				font-size: 6.5rem
				letter-spacing: 0.3rem
				font-weight: bold
				font-family: Montserrat

		> .description
			font-size: 3.5rem
			display: block

	.previous-chapter, .next-chapter
		position: absolute
		left: 0
		width: 100%
		height: var(--chapter-navigation-height)
		background: var(--gray-6)
		color: white
		flex-direction: row
		padding: 0 6rem
		justify-content: space-between
		align-items: center
		font-size: 4.5rem
		font-weight: bold
		cursor: pointer
		border-radius: 0

	.previous-chapter
		top: 0
	.next-chapter
		bottom: 0
		background: var(--primary)
		&:active
			bottom: -1px
			top: unset

	.groups
		gap: 6rem

		.group-title
			font-weight: bold

		.group
			gap: 2.5rem

		.group-items
			flex-direction: row
			flex-wrap: wrap
			gap: 2.5rem
		
		.group-item
			border: 1px solid
			border-radius: 12rem
			height: 10rem
			padding: 0 5rem
			&.active
				background: var(--white)
				color: var(--dark)

	.infotip
		flex-direction: row
		gap: 2rem
		font-style: italic
		font-size: 3.5rem
		align-items: flex-start
		> .icon
			flex-shrink: 0


	// -- Factory image and floating items --
	main
		flex: 1 0 0
		height: 100%
		alig-self: stretch
		position: relative
		overflow: hidden

	.factory
		position: absolute
		transition: 200ms
</style>
