import { Dispatch, SetStateAction } from 'react'
import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { CurveType, LayerProps } from '../../../providers/LayersProvider/interfaces'

export interface PointAnchorPosition {
  curve?: CurveType
  x: number
  y: number
}

export interface PointAnchorProps extends CurveType, Pick<AnchorProps, 'setAnchorXY'> {
  getCell: GridContextProps['getCell']
  index: number
}

export interface AnchorProps {
  curves: LayerProps['curves']
  getCell: GridContextProps['getCell']
  points: LayerProps['points']
  anchorXY: PointAnchorPosition
  setAnchorXY: Dispatch<SetStateAction<PointAnchorPosition>>
}