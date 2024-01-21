import { useContext } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { PointsProps } from './interfaces'
import { getNearestPosition } from '../../../providers/GridProvider/helpers'
import { ViewportContext } from '../../../providers/ViewportProvider/ViewportProvider'

const Points = ({
  active,
  currentPoint,
  getCell,
  radius,
  points,
  pointsProperties,
  setPointXY,
  setUpdateLayer
}: PointsProps) => {
  const { isDragging } = useContext(UIContext)
  const { properties } = useContext(ViewportContext)

  console.info(properties, '------')

  // draw points
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const pos = getCell(point.x, point.y)
        
      if (pos) {
        const [x, y] = pos

        if (active && isDragging) {
          if (currentPoint !== point.position) {
            shape.fill(pointsProperties.fill ?? '#222')
            context.arc(x, y, radius, 0, Math.PI * 2, false)
          }
        } else {
          shape.fill(pointsProperties.fill ?? '#222')
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

    const pos = getCell(clientX, clientY)

    if (pos && active) {
      const point = getNearestPosition([pos[0], pos[1]], points, radius * 3)

      if (point) {
        const restPos = getCell(point.x, point.y) ?? [0, 0]

        setPointXY({ x: restPos[0], y: restPos[1] })
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
