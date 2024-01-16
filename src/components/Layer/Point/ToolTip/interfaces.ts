import { UIContextProps } from '../../../../providers/UIProvider/interfaces'
import type { PointAnchorPosition } from '../../Anchor/interfaces'

export interface ToolTipProps extends Pick<UIContextProps, 'isDragging'> {
  point: number[]
  size: number
  radius: number
  pointXY: PointAnchorPosition
}
