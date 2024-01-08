import type { Dispatch, SetStateAction } from 'react'

import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { PointTypePosition } from '../Point/interfaces'

export interface PointAnchorPosition {
  index?: number
  x: number
  y: number
}
export interface AnchorProps extends Pick<LayerProps, 'currentPoint'> {
  anchorXY: PointAnchorPosition
  curves: LayerProps['curves']
  getCell: GridContextProps['getCell']
  points: LayerProps['points']
  pointXY: Omit<PointTypePosition, 'position'>
  setAnchorXY: Dispatch<SetStateAction<PointAnchorPosition>>
}