import type { FactoryItem } from "types/FactoryItem"

export default class FactoryController {
	grabbing = false
	grabX = 0
	grabY = 0
	zoom = 1
	width = 2277
	height = 1962
	imageWidth = 0
	imageHeight = 0
	left = 0
	top = 0

	constructor(
		public imageContainer: HTMLElement,
		public update: ({ left, top, zoom }: { left: number; top: number; zoom: number }) => void
	) {
		imageContainer.addEventListener("mousedown", this.onStartGrabbing)
		imageContainer.addEventListener("wheel", this.onWheel)
		addEventListener("mouseup", this.onStopGrabbing)
		addEventListener("mousemove", this.onGrabbing)
		addEventListener("resize", this.computeZoom, { passive: true })
		this.computeZoom()
		// this.centerImage()
	}

	clamp = (min: number, value: number, max: number): number => Math.min(Math.max(value, min), max)

	private _update(): void {
		this.update({ top: this.top, left: this.left, zoom: this.zoom })
	}

	computeZoom = (): void => {
		// this.zoom = Math.min(this.getMinZoom(), 0.3)
		this.zoom = this.getMinZoom()
		this.updateLeft()
		this.updateTop()
		this._update()
	}

	centerImage(): void {
		const { clientWidth, clientHeight } = this.imageContainer
		this.left = (clientWidth - this.imageWidth) / 2
		this.top = (clientHeight - this.imageHeight) / 2
	}

	onStartGrabbing = (event: MouseEvent): void => {
		this.grabbing = true
		this.grabX = event.screenX
		this.grabY = event.screenY
		event.preventDefault()
	}

	onStopGrabbing = (event: MouseEvent): void => {
		if (this.grabbing) {
			this.grabbing = false
			event.preventDefault()
		}
	}

	onGrabbing = (event: MouseEvent): void => {
		if (!this.grabbing) return
		this.updateLeft(this.left + event.screenX - this.grabX)
		this.updateTop(this.top + event.screenY - this.grabY)
		this.grabX = event.screenX
		this.grabY = event.screenY
		this._update()
		event.preventDefault()
	}

	onWheel = (event: WheelEvent): void => {
		if (event.ctrlKey || event.metaKey) {
			event.preventDefault()
			this.zoom = this.clamp(this.getMinZoom(), this.zoom - event.deltaY / 100, 1)
			this.updateLeft()
			this.updateTop()
			this._update()
		}
	}

	updateLeft(newLeftValue = this.left): void {
		const { clientWidth } = this.imageContainer
		this.left = this.clamp(
			clientWidth - (this.width * (this.zoom + 1)) / 2,
			newLeftValue,
			(this.width * (this.zoom - 1)) / 2
		)
	}

	updateTop(newTopValue = this.top): void {
		const { clientHeight } = this.imageContainer
		this.top = this.clamp(
			clientHeight - (this.height * (this.zoom + 1)) / 2,
			newTopValue,
			(this.height * (this.zoom - 1)) / 2
		)
	}

	getMinZoom(): number {
		const { clientWidth, clientHeight } = this.imageContainer
		return Math.max(clientWidth / this.width, clientHeight / this.height)
	}

	// move image to center (x, y)
	setPosition(x: number, y: number): void {
		const { clientWidth, clientHeight } = this.imageContainer
		const x1 = (this.width * (1 - this.zoom)) / 2 // padding due to zoom
		const x2 = x * this.zoom // distance to the value
		const x3 = clientWidth / 2 // we subtract half the view's width to center

		const y1 = (this.height * (1 - this.zoom)) / 2
		const y2 = y * this.zoom
		const y3 = clientHeight / 2

		console.log("Ideal new left value", x3 - x2 - x1)
		this.updateLeft(x3 - x2 - x1)
		this.updateTop(y3 - y2 - y1)
	}

	centerItem(item: FactoryItem, width: number, height = width): void {
		console.log("before center item", this.left, this.top)
		this.setPosition(
			(item.position.left * this.width) / 100 + width / 2,
			(item.position.top * this.height) / 100 + height / 2
		)
		console.log("after center item", this.left, this.top)
		this._update()
	}
}
