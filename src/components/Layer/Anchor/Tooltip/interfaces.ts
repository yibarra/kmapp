import type { GridContextProps } from '../../../../providers/GridProvider/interfaces'
import { AnchorProps } from '../interfaces'

export interface TooltipProps extends Pick<AnchorProps, 'curves' | 'currentPoint' | 'points' | 'anchorXY'> {
  isAnchor?: boolean
  getCell: GridContextProps['getCell']
  size: number
}