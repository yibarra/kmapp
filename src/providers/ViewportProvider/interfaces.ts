import type { PropsWithChildren } from 'react'

type propertiesType = {
  center: number[]
  drag: {
    offset: number[]
  },
  zoom: number
}

export interface ViewportContextProps {
  getMouse(offsetX: number, offsetY: number, subtractDragOffset?: boolean): number[]
  properties: propertiesType
}

export interface ViewportProviderProps extends PropsWithChildren {
  active?: boolean
  height: number
  offset?: propertiesType['drag']['offset']
  width: number
}
