import type { GridContextProps } from '../../../../providers/GridProvider/interfaces'
import type { CurveType } from '../../../../providers/LayersProvider/interfaces'
import type { AnchorProps } from '../interfaces'

export interface PointAnchorProps extends CurveType, Pick<AnchorProps, 'setAnchorXY'> {
  getCell: GridContextProps['getCell']
  index: number
  size: number
}
