import type { PropsWithChildren } from 'react'

type propertiesType = {
  center: number[]
  drag: {
    offset: number[]
  },
  offset: number[]
}

export interface ViewportContextProps {
  getMouse(offsetX: number, offsetY: number, subtractDragOffset?: boolean): number[]
  properties: propertiesType
  onDrag(): void
  onMove(offset: number[], event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent): void
  onMoveEnd(offset: number[]): void
}

export interface ViewportProviderProps extends PropsWithChildren {
  height: number
  width: number
}