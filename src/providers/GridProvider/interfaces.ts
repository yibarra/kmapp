import type { PropsWithChildren } from 'react'
import type { Context } from 'konva/lib/Context'

import type { AxisType } from '../../components/Grid/interfaces'

export interface GridContextProps {
  createGridBoxes(ctx: Context, width: number, height: number): void
  getCell(x: number, y: number): AxisType | void
  sizeBox: number
  fixPositionCenter(value: number, sizeAxis: number, axis: number, sizeBox: number): number
  setSizeBox(val: number): void
}

export interface GridProviderProps extends PropsWithChildren {
  size?: number
}