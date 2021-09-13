/**
 * Old xode loosely put here.
 * This functions aim to control the position of the factory image, which is unnecessary now for desktops.
 */
export default class FactoryController {
	grabbing = false
	grabX = 0
	grabY = 0
	zoom = 1
	width = 2800
	height = 1800
	left = (this.width * (this.zoom - 1)) / 2
	top = (this.height * (this.zoom - 1)) / 2

	constructor() {
		addEventListener("mouseup", this.onStopGrabbing)
		addEventListener("mousemove", this.onGrabbing)
		this.centerItem(this.items[0])
		// @ts-ignore
		window.setPosition = setPosition
	}

	clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max)

	onStartGrabbing(event: MouseEvent) {
		this.grabbing = true
		this.grabX = event.screenX
		this.grabY = event.screenY
		event.preventDefault()
	}

	onStopGrabbing(event: MouseEvent) {
		if (this.grabbing) {
			this.grabbing = false
			event.preventDefault()
		}
	}

	updateLeft(newLeftValue = left) {
		const { clientWidth } = imageContainer
		left = clamp(clientWidth - (width * (zoom + 1)) / 2, newLeftValue, (width * (zoom - 1)) / 2)
	}

	updateTop(newTopValue = top) {
		const { clientHeight } = imageContainer
		top = clamp(clientHeight - (height * (zoom + 1)) / 2, newTopValue, (height * (zoom - 1)) / 2)
	}

	getMinZoom() {
		const { clientWidth, clientHeight } = imageContainer
		return Math.max(clientWidth / width, clientHeight / height)
	}

	onGrabbing(event: MouseEvent) {
		if (!this.grabbing) return
		// console.log(left + event.screenX - this.grabX, clamp(-width, left + event.screenX - this.grabX, 0))
		updateLeft(left + event.screenX - this.grabX)
		updateTop(top + event.screenY - this.grabY)
		this.grabX = event.screenX
		this.grabY = event.screenY
		event.preventDefault()
	}

	onWheel(event: WheelEvent) {
		if (event.ctrlKey || event.metaKey) {
			event.preventDefault()
			zoom = clamp(getMinZoom(), zoom - event.deltaY / 100, 1)
			updateLeft()
			updateTop()
		}
	}

	// move image to center (x, y)
	setPosition(x: number, y: number) {
		const { clientWidth, clientHeight } = imageContainer
		const x1 = (width * (1 - zoom)) / 2 // padding due to zoom
		const x2 = x * zoom // distance to the value
		const x3 = clientWidth / 2 // we subtract half the view's width to center

		const y1 = (height * (1 - zoom)) / 2
		const y2 = y * zoom
		const y3 = clientHeight / 2

		updateLeft(x3 - x2 - x1)
		updateTop(y3 - y2 - y1)
	}

	centerItem(item: Item) {
		setPosition(item.x + item.width / 2, item.y + item.height / 2)
	}
}
