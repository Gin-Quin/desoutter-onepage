<script lang="ts">
	import _ from "src/i18n"
	import { onMount } from "svelte"

	type Item = {
		src: string
		x: number
		y: number
	}

	const objects: string[] = ["PLC", "MES", "Virtual cable", "Visiopositionning", "Sight remote HMI"]
	const objectName = (object: string) => $_(`section.demonstration.objects.${object}`)
	const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max)

	const items: Item[] = [{ src: "images/crosshair.svg", x: 60, y: 80 }]

	let imageContainer!: HTMLElement
	let currentObject = 0
	let grabbing = false
	let grabX = 0,
		grabY = 0
	let zoom = 0.5
	let width = 2800
	let height = 1800
	let left = (width * (zoom - 1)) / 2,
		top = (height * (zoom - 1)) / 2

	onMount(() => {
		addEventListener("mouseup", onStopGrabbing)
	})

	function onStartGrabbing(event: MouseEvent) {
		grabbing = true
		grabX = event.screenX
		grabY = event.screenY
		event.preventDefault()
	}

	function onStopGrabbing(event: MouseEvent) {
		if (grabbing) {
			grabbing = false
			event.preventDefault()
		}
	}

	function updateLeft(newLeftValue = left) {
		const { clientWidth } = imageContainer
		left = clamp(clientWidth - (width * (zoom + 1)) / 2, newLeftValue, (width * (zoom - 1)) / 2)
	}

	function updateTop(newTopValue = top) {
		const { clientHeight } = imageContainer
		top = clamp(clientHeight - (height * (zoom + 1)) / 2, newTopValue, (height * (zoom - 1)) / 2)
	}

	function getMinZoom() {
		const { clientWidth, clientHeight } = imageContainer
		return Math.max(clientWidth / width, clientHeight / height)
	}

	function onGrabbing(event: MouseEvent) {
		if (!grabbing) return
		// console.log(left + event.screenX - grabX, clamp(-width, left + event.screenX - grabX, 0))
		updateLeft(left + event.screenX - grabX)
		updateTop(top + event.screenY - grabY)
		grabX = event.screenX
		grabY = event.screenY
		event.preventDefault()
	}

	function onWheel(event: WheelEvent) {
		if (event.ctrlKey || event.metaKey) {
			console.log(event)
			event.preventDefault()
			zoom = clamp(getMinZoom(), zoom - event.deltaY / 100, 1)
			updateLeft()
			updateTop()
			console.log(left, top)
		}
	}

	// move image to center (x, y)
	function setPosition(x: number, y: number) {
		updateLeft(x)
		updateTop(y)
	}
</script>

<section id="demonstration" class="row">
	<main class:grabbing bind:this={imageContainer}>
		<img
			src="/images/warehouse.jpg"
			alt="warehouse"
			{width}
			{height}
			style={`left: ${left}px; top: ${top}px; transform: scale(${zoom}`}
			on:mousedown={onStartGrabbing}
			on:mousemove={onGrabbing}
			on:wheel={onWheel}
		/>
		{#each items as { src, x, y }}
			<img {src} alt="" style={``} />
		{/each}
	</main>
	<aside>
		<img class="stage" src="" alt="stage" />
		<div class="title">{$_("section.demonstration.title")}</div>
		<div class="subtitle">{objectName(objects[currentObject])}</div>
		<div class="description">{$_("section.demonstration.description")}</div>
		<div class="objects row wrap">
			{#each objects as object}
				<button
					class="tag object"
					class:active={objects.indexOf(object) == currentObject}
					on:click={() => (currentObject = objects.indexOf(object))}
				>
					{objectName(object)}
				</button>
			{/each}
		</div>
	</aside>
</section>

<style lang="sass">
	section
		height: 100vh
		background: var(--dark)
		justify-content: space-evenly
		place-items: center
		color: white

	main
		border-radius: 100%
		overflow: hidden
		width: 560px
		height: 560px
		overflow: hidden
		cursor: grab
		position: relative

		&.grabbing
			cursor: grabbing

		> img
			position: absolute

	aside
		width: 35%
		gap: 6rem
	
	.stage
		margin-bottom: -4rem

	.title
		font-weight: bold
		font-size: 9rem
		margin-bottom: -4rem
		// line-height: 1.4rem
	
	.subtitle
		font-size: 8rem
		margin-bottom: -2rem
	
	.objects
		gap: 2.5rem

	.object
		border: 1px solid
		border-radius: 12rem
		&.active
			background: var(--white)
			color: var(--dark)
</style>
