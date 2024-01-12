import { useContext } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import { calculateDashArray, getDistance } from '../../../../providers/GridProvider/helpers'
import { GridContext } from '../../../../providers/GridProvider/GridProvider'
import type { ToolTipProps } from './interfaces'

const ToolTip = ({ point, radius, pointXY }: ToolTipProps) => {
  const { sizeBox } = useContext(GridContext)

  // draw line
  const createLine = (context: Context, point: number[], shape: ShapeType) => {
    shape.stroke('#222')
    shape.strokeWidth(1)
    context.moveTo(point[0], point[1])
  
    const dist = getDistance([point[0], point[1]], [pointXY.x, pointXY.y])

    context.lineTo(pointXY.x, pointXY.y)
    context.setLineDash(calculateDashArray(dist, radius))

    context.strokeShape(shape)
    drawText(context, point)
  }

  // text
  const drawText = (context: Context, posXY: number[]) => {
    context.beginPath()
    context.font = '12px Roboto Condensed'
    context.textBaseline = 'middle'
    context.fillText(`(${posXY[0]}px, ${posXY[1]}px)`, posXY[0] + (sizeBox / 2), posXY[1])

    context.closePath()
    context.fillStyle = '#222'
    context.fill()
  }

  // draw

  // draw
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()
    shape.fill('#222')
    context.arc(point[0], point[1], radius / 2, 0, Math.PI * 2)
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
