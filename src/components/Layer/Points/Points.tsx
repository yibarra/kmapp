import { useContext } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import { ViewportContext } from '../../../providers/ViewportProvider/ViewportProvider'
import { getNearestPosition } from '../../../providers/GridProvider/helpers'
import type { PointsProps } from './interfaces'

const Points = ({
  active,
  curves,
  radius,
  points,
  pointXY,
  pointsProperties,
  setAnchorXY,
  setPointXY,
  setUpdateLayer
}: PointsProps) => {
  const { isDragging } = useContext(UIContext)
  const { getMouse } = useContext(ViewportContext)

  // draw points
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const { x, y } = point

      
      if (active && isDragging) {
        shape.fill(pointsProperties.fill ?? '#222')
        context.arc(x, y, radius, 0, Math.PI * 2, false)
      } else {
        shape.fill(pointsProperties.fill ?? '#222')
      
        if (active) {
          if (isDragging) {
            context.arc(pointXY.x, pointXY.y, radius, 0, Math.PI * 2, false)
          } else {
            context.arc(x, y, radius, 0, Math.PI * 2, false)
          }
        } else {
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
      const point = getNearestPosition(getMouse(clientX, clientY), points, radius)

      if (point) {
        const anchor = curves.find((cur) => cur.pointEnd === point.position || cur.pointInit === point.position)

        if (anchor) {
          setAnchorXY({ x: anchor.curve[0], y: anchor.curve[1] })
        }

        setPointXY({ ...point })
        setUpdateLayer(point.position)
      }
    }
  }
  
  // render
  return (
    <Shape {...pointsProperties} listening onClick={onClickPoint} sceneFunc={onDraw} />
  )
}

export default Points
