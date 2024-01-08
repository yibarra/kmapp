import { Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import type { TooltipProps } from './interfaces'

const Tooltip = ({ anchorXY, curves, getCell, size }: TooltipProps) => {
  // draw
  const onDraw = (context: Context) => {
    const point = curves.find((_, index) => index === anchorXY.index)

    if (point) {
      const posXY = getCell(point.curve[0], point.curve[1]) ?? [0, 0]

      context.beginPath()
      context.moveTo(posXY[0], posXY[1])
      context.lineTo(anchorXY.x, anchorXY.y)
      context.strokeStyle = '#CCC'
      context.lineWidth = 2
      context.setLineDash([size, size])
      context.stroke()
      context.closePath()

      context.beginPath()
      context.arc(posXY[0], posXY[1], size, 0, 2 * Math.PI)
      context.fillStyle = '#222'
      context.fill()
      context.closePath()
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
