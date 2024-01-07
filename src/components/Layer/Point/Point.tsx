import { useContext, useEffect, useMemo, useRef } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { PointProps } from './interfaces'

// point
const Point = ({
  active,
  currentPoint,
  getCell,
  pointsProperties,
  setPointXY,
  setPositionPoint,
  x: xPos,
  y: yPos,
}: PointProps) => {
  const { setIsDragging } = useContext(UIContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = useRef<any>(null)
  
  const [x, y] = useMemo(() => {
    const pos = getCell(xPos, yPos)

    return Array.isArray(pos) ? pos : [0, 0]
  }, [getCell, xPos, yPos])

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

    setPointXY({ x, y })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true
    
    const point = getCell(event.evt.clientX, event.evt.clientY)

    if (active && point && element.current) {
      const posX = Math.floor(point[0])
      const posY = Math.floor(point[1])

      element.current.to({
        x: posX,
        y: posY,
        duration: 0.4,
      })
      
      setPositionPoint(posX, posY, currentPoint)
      setIsDragging(false)
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
  }

  // use effect
  useEffect(() => {
    if (element.current) {
      if (typeof element.current.to !== 'undefined') {
        element.current.to({ ...pointsProperties })
      }
    }
  }, [pointsProperties])

  // render
  return (
    <Circle
      {...pointsProperties}
      draggable={active}
      onDragStart={onDragStartPoint}
      onMouseDown={onDragStartPoint}
      onDragMove={onDragMovePoint}
      onDragEnd={onDragEndPoint}
      ref={element}
      x={x}
      y={y}
    />
  )
}

export default Point
