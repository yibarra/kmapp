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

  // draw points
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const { x, y } = point

      if (active && isDragging) {
        context.arc(x, y, radius, 0, Math.PI * 2, false)
      } else if (active) {
        if (isDragging) {
          context.arc(pointXY.x, pointXY.y, radius, 0, Math.PI * 2, false)
        } else {
          context.arc(x, y, radius, 0, Math.PI * 2, false)
        }
      } else {
        context.arc(x, y, radius, 0, Math.PI * 2, false)
      }
      
      context.closePath()
    }
    
    context.fillShape(shape)
  }
  
  // on click point
  const onClickPoint = (event: KonvaEventObject<MouseEvent>) => {
    const { evt: { clientX, clientY }} = event

    if (active) {
      const point = getNearestPosition([clientX, clientY], points, radius)

      if (point) {
        const anchor = curves.find((cur) => cur.pointEnd === point.position || cur.pointInit === point.position)

        if (anchor) {
          const pointCurve = points.find((value) => value.position === anchor.curve)

          if (pointCurve) {
            setAnchorXY({ x: pointCurve.x, y: pointCurve?.y })
          }
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
