export type FactoryItem = {
	label: string
	description: string
	position: {
		left: number
		top: number
	}
	tool?: string
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
