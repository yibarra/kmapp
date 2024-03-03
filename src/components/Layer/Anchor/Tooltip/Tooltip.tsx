import { useContext } from 'react'
import { Shape} from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import { calculateDashArray, getDistanceBetweenPoints } from '../../../../providers/GridProvider/helpers'
import { MainContext } from '../../../../providers/MainProvider/MainProvider'
import type { TooltipProps } from './interfaces'

// tooltip
const Tooltip = ({ anchorXY, curves, isAnchor = false, size }: TooltipProps) => {
  const { viewport } = useContext(MainContext)

  // checked
  const checkedPosX = (posX: number, width: number) => (posX + width) > viewport.width

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
  const drawText = (context: Context, shape: ShapeType, posXY: number[]) => {
    context.beginPath()
    context.font = '12px Roboto Condensed'
    context.textBaseline = 'middle'
    shape.fill('#222')
    
    coordinateAnchor(context, `(${anchorXY.x}px, ${anchorXY.y}px)`, [anchorXY.x, anchorXY.y], size * 4)
    context.closePath()
    context.fillShape(shape)
    
    context.beginPath()
    context.font = '12px Roboto Condensed'
    context.textBaseline = 'middle'
    shape.fill('#222')
    coordinateAnchor(context, `(${posXY[0]}px, ${posXY[1]}px)`, posXY, size * 2)
    
    context.closePath()
    context.fillShape(shape)
  }

  // draw
  const onDraw = (context: Context, shape: ShapeType) => {
    const point = curves.find((_, index) => index === anchorXY.index)

    if (point) {
      const posXY = [point.curve[0], point.curve[1]]
      
      context.beginPath()
      shape.fill('#222')
      context.arc(posXY[0], posXY[1], size, 0, 2 * Math.PI)
      context.fillShape(shape)

      if (isAnchor) {
        const dist = getDistanceBetweenPoints([anchorXY.x, anchorXY.y], posXY)
        
        context.moveTo(posXY[0], posXY[1])
        shape.stroke('#222')
        shape.strokeWidth(1)
        context.lineTo(anchorXY.x, anchorXY.y)
        context.setLineDash(calculateDashArray(dist, size * 2))
        context.strokeShape(shape)
        
        context.beginPath()
        shape.fill('#222')
        context.arc(anchorXY.x, anchorXY.y, size, 0, 2 * Math.PI)
        context.closePath()

        context.fillShape(shape)
        context.strokeShape(shape)

        // pos text
        drawText(context, shape, posXY)
      }
    }
  }

  // render
  return (
    <Shape
      listening={false}
      sceneFunc={onDraw}
    />
  )
}

export default Tooltip
