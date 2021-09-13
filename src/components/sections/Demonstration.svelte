<script lang="ts">
	import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte"
	import ArrowRight from "svelte-material-icons/ArrowRight.svelte"
	import Information from "svelte-material-icons/Information.svelte"
	import { json, t } from "svelte-i18n"
	import type { TranslationObject } from "locales/TranslationObject"
	import MiniPyramid from "atoms/MiniPyramid.svelte"

	type Group = {
		title?: string
		items: Array<Item>
	}

	type Item = {
		label: string
		description: string
		tool?: string
		image?: string
		index?: number
	}

	let imageContainer!: HTMLElement
	let currentItem = 0
	let currentChapter = 0

	$: chapters = $json(
		"section.demonstration.chapters"
	) as TranslationObject["section"]["demonstration"]["chapters"]
	$: console.log("chapters[currentChapter]", chapters[currentChapter])

	function getChapterGroups(chapter: number): Array<Group> {
		const groups = chapters[chapter].groups as Array<Group>
		let itemIndex = 0
		groups.forEach((group) => group.items.forEach((item) => (item.index = itemIndex++)))
		return groups
	}

	function getChapterItems(chapter: number): Array<Item> {
		return getChapterGroups(chapter)
			.map((group) => group.items)
			.flat()
	}

	function isItemActive(chapter: number, item: number): boolean {
		return chapter == currentChapter && item == currentItem
	}

	function isItemVisible(chapter: number, item: number): boolean {
		return chapter < currentChapter || (chapter == currentChapter && item <= currentItem)
	}
</script>

<section id="demonstration">
	<aside>
		{#if currentChapter > 0}
			<button class="previous-chapter" on:click={() => currentChapter--}>
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
								on:click={() => (currentItem = item.index || 0)}
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
			<button class="next-chapter" on:click={() => currentChapter++}>
				<div />
				{chapters[currentChapter + 1].title}
				<ArrowRight size="24" />
			</button>
		{/if}
	</aside>

	<main bind:this={imageContainer}>
		<div class="factory">
			<img src="/images/factory-cropped.jpg" alt="factory" />

			{#each chapters as _, chapter}
				{#each getChapterItems(chapter) as item, itemIndex}
					{#if isItemVisible(chapter, itemIndex)}
						<div class="factory-item">
							{#if isItemActive(chapter, itemIndex)}
								ACTIVE
							{/if}
							<img
								class="item"
								{...item}
								alt=""
								style="
								left: {0}px;
								top: {0}px;
							"
							/>
						</div>
					{/if}
				{/each}
			{/each}
		</div>
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
		position: relative

	.factory
		position: absolute
		width: 100%
		height: 100%

	.factory-item
		pointer-events: none
		position: absolute
</style>
