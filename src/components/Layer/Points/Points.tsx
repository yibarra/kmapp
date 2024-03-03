import { useContext } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import { getNearestPosition } from '../../../providers/GridProvider/helpers'
import type { PointsProps } from './interfaces'

const Points = ({
  active,
  radius,
  points,
  pointXY,
  pointsProperties,
  setPointXY,
  setUpdateLayer
}: PointsProps) => {
  const { isDragging } = useContext(UIContext)

  // draw points
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const { x, y } = point
      
      if (active && isDragging) {
        shape.fill(pointsProperties.fill ?? '#222')
        context.arc(x, y, radius, 0, Math.PI * 2, false)
      } else {
        shape.fill('#FF8877') // pointsProperties.fill ?? '#222'

        if (isDragging) {
          context.arc(pointXY.x, pointXY.y, radius, 0, Math.PI * 2, false)
        } else {
          shape.fill('#FF00FF')
          context.arc(x, y, radius, 0, Math.PI * 2, false)
        }
      }
      
      context.closePath()
    }
    
    context.fillShape(shape)
  }
  
  // on click point
  const onClickPoint = (event: KonvaEventObject<MouseEvent>) => {
    const { evt: { clientX, clientY }} = event

    if (active) {
      const point = getNearestPosition([clientX, clientY], points, radius * 3)

      if (point) {
        setPointXY({ ...point })
        setUpdateLayer(point.position)
      }
    }
  }
  
  // render
  return (
    <Shape listening onClick={onClickPoint} sceneFunc={onDraw} />
  )
}

export default Points
