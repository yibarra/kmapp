import type { Dispatch, SetStateAction } from 'react'

import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { PointAnchorPosition } from '../Anchor/interfaces'
import type { ViewportContextProps } from '../../../providers/ViewportProvider/interfaces'

export interface PointsProps extends Pick<LayerProps, 'currentPoint' | 'points' | 'pointsProperties'> {
  active?: boolean
  getMouse: ViewportContextProps['getMouse']
  radius: number
  properties: ViewportContextProps['properties']
  setPointXY: Dispatch<SetStateAction<PointAnchorPosition>>
  setUpdateLayer(value: number): void
}