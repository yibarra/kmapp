import { useContext, useRef } from 'react'
import { Group, Shape } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import { ViewportContext } from '../../../providers/ViewportProvider/ViewportProvider'
import ToolTip from './ToolTip'
import type { PointProps } from './interfaces'

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
  const { properties } = useContext(ViewportContext)

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

    const x = event.evt.clientX
    const y = event.evt.clientY

    if (element.current) {
      element.current?.position({ x, y })
    }

    setPointXY({ x, y })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true
    
    const x = event.evt.clientX 
    const y = event.evt.clientY 

    if (active && element.current) {
      element.current.to({ x, y })

      setIsDragging(false)
      setPositionPoint(x + properties.drag.offset[0], y + properties.drag.offset[1], currentPoint)
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

      {active && (
        <ToolTip
          isDragging={isDragging}
          radius={pointsProperties.radius}
          size={sizeBox}
          point={[xPos, yPos]}
          pointXY={pointXY}
        />
      )}
    </Group>
  )
}

export default Point
