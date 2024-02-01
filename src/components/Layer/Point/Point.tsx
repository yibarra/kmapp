import { useContext, useMemo, useRef } from 'react'
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
  const { getCell, sizeBox } = useContext(GridContext)
  const { getMouse } = useContext(ViewportContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = useRef<any>(null)
  
  // x, y
  const [x, y] = useMemo(() => {
    const xy = getMouse(xPos, yPos)
    const pos = getCell(xy[0], xy[1])

    return Array.isArray(pos) ? pos : [0, 0]
  }, [getCell, getMouse, xPos, yPos])

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
    
    const xy = getMouse(event.evt.clientX, event.evt.clientY)
    const point = getCell(xy[0], xy[1])

    if (active && point && element.current) {
      const [x, y] = point

      element.current.to({ x, y })
      setPositionPoint(x, y, currentPoint)
    }

    setIsDragging(false)
  }

  // on move point
  const onMovePoint = () => {
    const mouseXY = getMouse(xPos, yPos)
    const posXY = getCell(mouseXY[0], mouseXY[1]) ?? [0, 0]
    
    if (isDragging) {
      return { x: mouseXY[0], y: mouseXY[1] }
    }

    return { x: posXY[0], y: posXY[1] }
  }

  // on draw
  const onDraw = (context: Context, shape: ShapeType) => {
    context.beginPath()
    context.arc(sizeBox / 2, sizeBox / 2, (sizeBox / 2) - 2, 0, Math.PI * 2)
    context.closePath()
    context.strokeShape(shape)
    context.fillShape(shape)
  }

  // render
  return (
    <Group>
      <Shape
        {...pointsProperties}
        {...onMovePoint()}
        draggable
        listening={active}
        onDragStart={onDragStartPoint}
        onMouseDown={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        ref={element}
        sceneFunc={onDraw}
      />

      <ToolTip
        isDragging={isDragging}
        radius={pointsProperties.radius}
        size={sizeBox}
        point={[x, y]}
        pointXY={pointXY}
      />
    </Group>
  )
}

export default Point
