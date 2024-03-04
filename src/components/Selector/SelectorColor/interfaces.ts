import type { HTMLAttributes } from 'react'

export type TypeSelector = 'line' | 'border' | 'default'

export interface SelectorColorProps<T = HTMLDivElement>
  extends HTMLAttributes<T> {
  color: string
  setColor(color: string): void
  radius?: boolean
  variation?: TypeSelector
}