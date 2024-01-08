import { useContext } from 'react'
import { Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import { calculateDashArray, getDistanceBetweenPoints } from '../../../../providers/GridProvider/helpers'
import { MainContext } from '../../../../providers/MainProvider/MainProvider'
import type { TooltipProps } from './interfaces'

// tooltip
const Tooltip = ({ anchorXY, curves, getCell, isAnchor = false, size }: TooltipProps) => {
  const { viewport } = useContext(MainContext)

  // checked
  const checkedPosX = (posX: number, width: number) => posX + width > viewport.width

  // texts
  const coordinateAnchor = (context: Context, text: string, points: number[], width: number) => {
    const textWidth = context.measureText(text).width

    if (checkedPosX(points[0], textWidth)) {
      context.fillText(text, points[0] - (textWidth + width), points[1])
    } else {
      context.fillText(text, points[0] + width, points[1])
    }
  }

  // text
  const drawText = (context: Context, posXY: number[]) => {
    context.beginPath()
    context.font = '12px Roboto Condensed'
    context.textBaseline = 'middle'

    coordinateAnchor(context, `(${anchorXY.x}px, ${anchorXY.y}px)`, [anchorXY.x, anchorXY.y], size * 4)
    coordinateAnchor(context, `(${posXY[0]}px, ${posXY[1]}px)`, posXY, size * 2)

    context.closePath()
    context.fillStyle = '#222'
    context.fill()
  }

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
        context.strokeStyle = '#222'
        context.fillStyle = 'transparent'
        context.lineWidth = 1
        context.setLineDash(calculateDashArray(distance, size * 2))
        context.lineTo(anchorXY.x, anchorXY.y)
        context.stroke()
        context.closePath()

        context.beginPath()
        context.arc(anchorXY.x, anchorXY.y, size, 0, 2 * Math.PI)
        context.closePath()
        context.fillStyle = '#222'
        context.fill()

        // pos text
        drawText(context, posXY)
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
