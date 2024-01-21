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
  getMouse(event: WheelEvent): number[]
  properties: MutableRefObject<propertiesType>
  onDrag(event: WheelEvent): void
  onMove(event: WheelEvent): void
  onMoveEnd(): void
  onZoom(event: WheelEvent): void
  reset(context: Context): void
}

export interface ViewportProviderProps extends PropsWithChildren {
  height: number
  width: number
}