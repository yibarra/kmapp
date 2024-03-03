import type { Dispatch, SetStateAction } from 'react'

import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { PointAnchorPosition } from '../Anchor/interfaces'

export interface PointsProps extends Pick<LayerProps, 'currentPoint' | 'points' | 'pointsProperties'> {
  active?: boolean
  curves: LayerProps['curves']
  radius: number
  pointXY: PointAnchorPosition
  setPointXY: Dispatch<SetStateAction<PointAnchorPosition>>
  setAnchorXY: Dispatch<SetStateAction<PointAnchorPosition>>
  setUpdateLayer(value: number): void
}