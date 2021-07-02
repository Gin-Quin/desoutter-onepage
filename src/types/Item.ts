export default class Item {
	src: string
	x: number
	y: number
	width: number
	height: number

	constructor(from: { src: string; x: number; y: number; width: number; height: number }) {
		this.src = from.src
		this.x = from.x
		this.y = from.y
		this.width = from.width
		this.height = from.height
	}

	stylize(): string {
		const left = this.x - this.width / 2,
			top = this.y - this.height / 2
		return `left: ${left}px; top: ${top}px;`
	}
}
