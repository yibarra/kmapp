import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import type { ToolTipProps } from './interfaces'

const ToolTip = ({ point, radius, pointXY }: ToolTipProps) => {
  // draw line
  const createLine = (context: Context, point: number[], shape: ShapeType) => {
    shape.stroke('#222')
    context.moveTo(point[0], point[1])
    context.lineTo(pointXY.x, pointXY.y)

    context.strokeShape(shape)
  }

  // draw
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()
    shape.fill('#222')
    context.arc(point[0], point[1], radius, 0, Math.PI * 2)
    context.closePath()
    context.fillShape(shape)

    createLine(context, point, shape)
  }

  // render
  return (
    <Shape sceneFunc={onDraw} />
  )
}

export default ToolTip
