import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { PointAnchorPosition } from '../Anchor/interfaces'
import type { PointTypePosition } from '../Point/interfaces'

export interface CurveProps extends Omit<LayerProps, 'pointsProperties'> {
  anchorXY: PointAnchorPosition
  active?: boolean
  pointXY: Omit<PointTypePosition, 'position'>
}
