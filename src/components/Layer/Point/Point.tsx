import { useContext, useRef } from 'react'
import { Group, Shape } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import ToolTip from './ToolTip'
import type { PointProps } from './interfaces'
import { ViewportContext } from '../../../providers/ViewportProvider/ViewportProvider'

// point
const Point = ({
  active,
  currentPoint,
  pointsProperties,
  pointXY,
  setPointXY,
  setPositionPoint,
  x: xPos,
  y: yPos,
}: PointProps) => {
  const { isDragging, setIsDragging } = useContext(UIContext)
  const { sizeBox } = useContext(GridContext)
  const { getMouse } = useContext(ViewportContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = useRef<any>(null)

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsDragging(true)
  }

  // on drag move point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    element.current.position({ x: event.evt.clientX, y: event.evt.clientY })
    setPointXY({ x: event.evt.clientX, y: event.evt.clientY })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true
    
    const point = getMouse(event.evt.clientX, event.evt.clientY)

    if (active && point && element.current) {
      const [x, y] = point

      element.current.to({ x, y })
      setIsDragging(false)
      setPositionPoint(x, y, currentPoint)
    }
  }

  // on draw
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()
    context.arc(0, 0, (sizeBox / 4), 0, Math.PI * 2)
    context.closePath()
    context.strokeShape(shape)
    context.fillShape(shape)
  }

  // render
  return (
    <Group>
      <Shape
        {...pointsProperties}
        draggable
        listening={active}
        onDragStart={onDragStartPoint}
        onMouseDown={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        ref={element}
        sceneFunc={onDraw}
        x={xPos}
        y={yPos}
      />

      <ToolTip
        isDragging={isDragging}
        radius={pointsProperties.radius}
        size={sizeBox}
        point={[xPos, yPos]}
        pointXY={pointXY}
      />
    </Group>
  )
}

export default Point
