import type { HTMLAttributes } from "react"

export interface SelectorLineTypeProps<T = HTMLDivElement>
  extends HTMLAttributes<T> {
  defaultValue?: number
  items: Record<string, string>[]
  onChangeValue(val: string): void
  variant?: string
}
