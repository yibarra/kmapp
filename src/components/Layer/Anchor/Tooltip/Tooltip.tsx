import { Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import { calculateDashArray, getDistanceBetweenPoints } from '../../../../providers/GridProvider/helpers'
import type { TooltipProps } from './interfaces'

// tooltip
const Tooltip = ({ anchorXY, curves, getCell, isAnchor = false, size }: TooltipProps) => {
  // draw
  const onDraw = (context: Context) => {
    const point = curves.find((_, index) => index === anchorXY.index)

    if (point) {
      const posXY = getCell(point.curve[0], point.curve[1]) ?? [0, 0]
      
      context.beginPath()
      context.arc(posXY[0], posXY[1], size, 0, 2 * Math.PI)
      context.closePath()
      context.fillStyle = '#222'
      context.fill()

      if (isAnchor) {
        const distance = getDistanceBetweenPoints([anchorXY.x, anchorXY.y], posXY)

        context.beginPath()
        context.moveTo(posXY[0], posXY[1])
        context.lineTo(anchorXY.x, anchorXY.y)
        context.strokeStyle = '#222'
        context.fillStyle = 'transparent'
        context.lineWidth = 1
        context.setLineDash(calculateDashArray(distance, size * 2))
        context.stroke()
        context.closePath()

        context.beginPath()
        context.arc(anchorXY.x, anchorXY.y, size, 0, 2 * Math.PI)
        context.closePath()
        context.fillStyle = '#222'
        context.fill()
      }
    }
  }

  // render
  return (
    <ShapeK
      listening={false}
      sceneFunc={onDraw}
    />
  )
}

export default Tooltip
