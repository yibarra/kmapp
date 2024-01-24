import type { PropsWithChildren } from 'react'
import type { Context } from 'konva/lib/Context'

type propertiesType = {
  center: number[]
  drag: {
    start: number[]
    end: number[]
    offset: number[]
    active: boolean
  },
  offset: number[]
  zoom: number
}

export interface ViewportContextProps {
  getMouse(offsetX: number, offsetY: number, subtractDragOffset?: boolean): number[]
  properties: propertiesType
  onDrag(offsetX: number, offsetY: number): void
  onMove(offsetX: number, offsetY: number, event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent): void
  onMoveEnd(): void
  onZoom(direction: number): void
  reset(context: Context): void
}

export interface ViewportProviderProps extends PropsWithChildren {
  height: number
  width: number
}