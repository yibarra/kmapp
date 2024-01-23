import { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../Point/interfaces'
import type { PointAnchorPosition } from '../Anchor/interfaces'
import { ViewportContextProps } from '../../../providers/ViewportProvider/interfaces'

export interface LineProps extends Omit<LayerProps, 'pointsProperties'> {
  anchorXY: PointAnchorPosition
  active?: boolean
  getCell: GridContextProps['getCell']
  getMouse: ViewportContextProps['getMouse']
  pointXY: Omit<PointTypePosition, 'position'>
}
