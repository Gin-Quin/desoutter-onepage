export type FactoryItem = {
	label: string
	description: string
	position: {
		left: number
		top: number
	}
	tool?: string
	flyFrom?: { x: number; y: number }
	flyTo?: { x: number; y: number }
	transitionDuration?: number
	wifi?: boolean
	dome?: {
		left: number
		top: number
	}
	largeTool?: boolean
	image?: {
		src: string
		width: number
		height: number
	}
	index?: number
	secondaryTool?: {
		tool: string
		position: {
			left: number
			top: number
		}
		largeTool?: boolean
	}
}
