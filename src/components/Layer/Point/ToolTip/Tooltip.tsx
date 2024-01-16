import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import { calculateDashArray, getDistance } from '../../../../providers/GridProvider/helpers'
import type { ToolTipProps } from './interfaces'
import type { PointAnchorPosition } from '../../Anchor/interfaces'

const ToolTip = ({ isDragging = false, point, radius, pointXY, size }: ToolTipProps) => {
  // draw line
  const createLine = (context: Context, shape: ShapeType, point: number[]) => {
    context.beginPath()
    shape.stroke('#222')
    shape.strokeWidth(1)

    const distance = getDistance([pointXY.x, pointXY.y], [point[0], point[1]])

    context.beginPath()
    context.moveTo(point[0], point[1])
    shape.stroke('#222')
    shape.fill('transparent')
    shape.strokeWidth(1)
    shape.dash(calculateDashArray(distance, size * 2))
    context.lineTo(pointXY.x, pointXY.y)
    context.closePath()
    context.strokeShape(shape)
    context.fillShape(shape)
  
    drawText(context, shape, point)
    drawText(context, shape, [pointXY.x, pointXY.y])
  }

  // create point
  const createPoint = (context: Context, shape: ShapeType, point: PointAnchorPosition) => {
    context.beginPath()
    shape.fill('#222')
    context.arc(point.x, point.y, radius / 2, 0, Math.PI * 2)
    context.closePath()

    context.fillShape(shape)
  }

  // text
  const drawText = (context: Context, shape: ShapeType, posXY: number[]) => {
    context.beginPath()
    context.font = '12px Roboto Condensed'
    context.textBaseline = 'middle'
    shape.fill('#222')
    context.fillText(`(${posXY[0]}px, ${posXY[1]}px)`, posXY[0] + (size / 2), posXY[1])

    context.closePath()
    context.fillShape(shape)
  }

  // draw
  const onDraw = (context: Context, shape: ShapeType) => {
    createPoint(context, shape, { x: point[0], y: point[1]})

    if (isDragging) {
      createPoint(context, shape, pointXY)
      createLine(context, shape, point)
    }
  }

  // render
  return (
    <Shape listening={false} sceneFunc={onDraw} />
  )
}

export default ToolTip
