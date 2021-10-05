import type { FactoryItem } from "types/FactoryItem"

export function getFactoryItemSize(item: Pick<FactoryItem, "tool" | "largeTool">): number {
	return item.tool ? (item.largeTool ? 324 : 180) : 130
}
