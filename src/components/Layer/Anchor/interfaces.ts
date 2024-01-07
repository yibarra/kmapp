import type { Dispatch, SetStateAction } from 'react'

import type { CurveType, LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { PointTypePosition } from '../Point/interfaces'

export interface PointAnchorPosition {
  index?: number
  x: number
  y: number
}

export interface PointAnchorProps extends CurveType, Pick<AnchorProps, 'setAnchorXY'> {
  getCell: GridContextProps['getCell']
  index: number
}

export interface AnchorProps extends Pick<LayerProps, 'currentPoint'> {
  curves: LayerProps['curves']
  getCell: GridContextProps['getCell']
  points: LayerProps['points']
  anchorXY: PointAnchorPosition
  setAnchorXY: Dispatch<SetStateAction<PointAnchorPosition>>
  pointXY: Omit<PointTypePosition, 'position'>
}