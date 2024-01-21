import type { MutableRefObject, PropsWithChildren } from 'react'
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
  bindEvents: any
  getMouse(offsetX: number, offsetY: number): number[]
  properties: MutableRefObject<propertiesType>
  onDrag(offsetX: number, offsetY: number): void
  onMove(offsetX: number, offsetY: number): void
  onMoveEnd(): void
  onZoom(direction: number): void
  reset(context: Context): void
}

export interface ViewportProviderProps extends PropsWithChildren {
  height: number
  width: number
}