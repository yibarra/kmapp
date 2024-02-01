import { Dispatch, SetStateAction } from "react"
import { LayerProps } from "../../../providers/LayersProvider/interfaces"

export type PointTypePosition = {
  x: number
  y: number
  position: number
}

export interface PointProps extends Pick<PointTypePosition, 'x' | 'y'> {
  active?: boolean
  currentPoint: number
  pointsProperties: LayerProps['pointsProperties']
  pointXY: Omit<PointTypePosition, "position">
  setPointXY: Dispatch<SetStateAction<Omit<PointTypePosition, 'position'>>>
  setPositionPoint(posX: number, posY: number, position: number): void
}