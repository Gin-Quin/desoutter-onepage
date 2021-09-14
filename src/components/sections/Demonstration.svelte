<script lang="ts">
	import { fly, slide } from "svelte/transition"
	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte"
	import ArrowRight from "svelte-material-icons/ArrowRight.svelte"
	import Information from "svelte-material-icons/Information.svelte"
	import { json, t } from "svelte-i18n"
	import type { TranslationObject } from "locales/TranslationObject"
	import type { FactoryItem } from "types/FactoryItem"
	import MiniPyramid from "atoms/MiniPyramid.svelte"
	import { onMount, tick } from "svelte"
	import FactoryController from "utilities/FactoryController"
	import Header from "./Header.svelte"
	import ToolCard from "atoms/ToolCard.svelte"
	import tippy from "tippy.js"
	import type { Instance as TippyInstance } from "tippy.js"

	type Group = {
		title?: string
		items: Array<FactoryItem>
	}

	const itemSize = 180

	let imageContainer!: HTMLElement
	let activeItem: Element | undefined = undefined
	let tippyInstance: TippyInstance | null = null
	let factoryController!: FactoryController
	let currentItem = -1
	let currentChapter = 0
	let left = 0
	let top = 0
	let zoom = 1

	$: chapters = $json(
		"section.demonstration.chapters"
	) as TranslationObject["section"]["demonstration"]["chapters"]

	onMount(() => {
		factoryController = new FactoryController(imageContainer, (update) => {
			left = update.left
			top = update.top
			zoom = update.zoom
		})
	})

	const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

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
		factoryController.centerItem(item, itemSize)
		tippyInstance?.hide()
		await tick()
		await sleep(250)
		if (!activeItem) return

		tippyInstance = tippy(activeItem, {
			content: getTippyContent(item),
			duration: 0,
			arrow: false,
			allowHTML: true,
			theme: "desoutter",
			hideOnClick: false,
			placement: factoryController.getPreferredPlacement(item, itemSize),
			onShow({ popper }) {
				popper.animate([{ opacity: 0 }, { opacity: 1 }], {
					duration: 100,
				})
			},
		})
		tippyInstance.show()
	}

	function getTippyContent(item: FactoryItem): string {
		return `<div class="tippy-desoutter-title">${item.label}</div><div class="tippy-desoutter-description">${item.description}</div>`
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
</script>

<section id="demonstration" style="--tool-size: {itemSize}px">
	<aside>
		{#if currentChapter > 0}
			<button
				class="previous-chapter"
				on:click={previousChapter}
				transition:fly={{ opacity: 1, y: -200, duration: 200 }}
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
			<Information size="36" />
			<div class="description">
				{$t("section.demonstration.infotip")}
			</div>
		</div>

		{#if currentChapter < chapters.length - 1}
			<button
				class="next-chapter"
				on:click={nextChapter}
				transition:fly={{ opacity: 1, y: 200, duration: 200 }}
			>
				<div />
				{chapters[currentChapter + 1].title}
				<ArrowRight size="24" />
			</button>
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
							<div
								bind:this={activeItem}
								class="factory-item active"
								style="
									left: {item.position.left}%;
									top: {item.position.top}%;
								"
							>
								{#if item.tool}
									<ToolCard name={item.tool} style="small" transparent active />
								{/if}
							</div>
						{:else if isItemVisible(currentChapter, currentItem, chapter, itemIndex)}
							<div
								class="factory-item"
								style="
									left: {item.position.left}%;
									top: {item.position.top}%;
								"
							>
								{#if item.tool}
									<ToolCard name={item.tool} style="small" transparent />
								{/if}
							</div>
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

	// -- Left panel --
	aside
		width: min(35%, 440px)
		gap: 6rem
		padding: calc(var(--chapter-navigation-height) + 9rem) 6rem
		background: var(--dark)
		position: relative
		color: white

		> header
			gap: 3rem

			> .title
				font-size: 6rem
				font-weight: bold

		> .description
			font-size: 3.5rem

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

		&.previous-chapter
			top: 0
		&.next-chapter
			bottom: 0
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
		gap: 3rem
		font-style: italic
		font-size: 3.5rem
		align-items: flex-start


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

	.factory-item
		pointer-events: none
		position: absolute
</style>
