import type { CurveType } from '../../../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../../Point/interfaces'
import type { AnchorProps } from '../interfaces'

export interface PointAnchorProps extends Omit<CurveType, 'curve'>, Pick<AnchorProps, 'setAnchorXY'> {
  curve?: PointTypePosition
  index: number
  size: number
}
