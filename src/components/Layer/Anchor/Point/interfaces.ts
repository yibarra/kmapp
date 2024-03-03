import type { CurveType } from '../../../../providers/LayersProvider/interfaces'
import type { AnchorProps } from '../interfaces'

export interface PointAnchorProps extends CurveType, Pick<AnchorProps, 'setAnchorXY'> {
  index: number
  size: number
}
