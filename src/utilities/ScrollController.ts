type Event = (event: UIEvent) => void

export default class ScrollListener {
	public active = true
	public throttle = 520

	constructor(properties: { onScrollDown?: Event; onScrollUp?: Event }) {
		this.onScrollDown = properties.onScrollDown
		this.onScrollUp = properties.onScrollUp
		addEventListener("keydown", this.onKeyDown, { passive: false })
		addEventListener("wheel", this.onWheel, { passive: false })
		addEventListener("touchstart", this.onTouchStart, { passive: false })
		addEventListener("touchmove", this.onTouchMove, { passive: false })
	}

	destroy(): void {
		removeEventListener("keydown", this.onKeyDown)
		removeEventListener("wheel", this.onWheel)
		removeEventListener("touchstart", this.onTouchStart)
		removeEventListener("touchmove", this.onTouchMove)
	}

	protected onScrollDown?: Event
	protected onScrollUp?: Event
	protected touchStart = 0
	protected lastScrollDown = 0
	protected lastScrollUp = 0

	protected onKeyDown = (event: KeyboardEvent): void => {
		switch (event.key) {
			case "ArrowDown":
				return this.triggerScrollDown(event)
			case "ArrowUp":
				return this.triggerScrollUp(event)
		}
	}

	protected onTouchStart = (event: TouchEvent): void => {
		this.touchStart = event.changedTouches[0].clientY
	}

	protected onTouchMove = (event: TouchEvent): void => {
		const delta = this.touchStart - event.changedTouches[0].clientY
		if (delta > 0) this.triggerScrollDown(event, delta)
		else this.triggerScrollUp(event, delta)
	}

	protected onWheel = (event: WheelEvent): void => {
		if (event.deltaY > 0) this.triggerScrollDown(event, event.deltaY)
		else this.triggerScrollUp(event, event.deltaY)
	}

	protected triggerScrollDown = (event: UIEvent, delta = 4): void => {
		if (document.documentElement.scrollTop > 0) return
		if (!this.active) return
		// if (this.active && delta >= 4) {
		// 	this.lastScrollDown = Date.now()
		// 	return
		// }
		event.preventDefault()
		// if (currentStage == fusionStage) return
		if (delta < 4) return
		if (this.lastScrollDown + this.throttle > Date.now()) {
			return
		}
		this.lastScrollDown = Date.now()
		this.onScrollDown?.(event)
		// currentStage++
		// if (currentStage >= fusionStage) pyramidGap = 0
		// if (currentStage == fusionStage) {
		// 	setTimeout(() => {
		// 		if (currentStage == fusionStage) animationIsDone = true
		// 	}, transitionDuration)
		// }
	}

	protected triggerScrollUp = (event: UIEvent, delta = -4): void => {
		console.log("triggerScrollUp")
		if (document.documentElement.scrollTop > 0) {
			this.lastScrollUp = Date.now()
			return
		}
		event.preventDefault()
		// if (currentStage == 0) return
		if (delta > -4) return
		if (this.lastScrollUp + this.throttle > Date.now()) {
			return
		}
		this.lastScrollUp = Date.now()
		this.onScrollUp?.(event)

		// animationIsDone = false
		// currentStage--
		// if (currentStage < fusionStage) pyramidGap = basePyramidGap
	}
}
