import type { AnchorProps } from '../interfaces'

export interface TooltipProps extends Pick<AnchorProps, 'curves' | 'currentPoint' | 'points' | 'anchorXY'> {
  isAnchor?: boolean
  size: number
}