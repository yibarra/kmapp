import { useContext, useRef } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { LayersContext } from '../../../../providers/LayersProvider'
import { UIContext } from '../../../../providers/UIProvider/UIProvider'
import type { PointAnchorProps } from './interfaces'

const Point = ({ curve, getCell, index, pointInit, pointEnd, setAnchorXY, size }: PointAnchorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointRef = useRef<any>(null)

  const { setIsAnchor } = useContext(UIContext)
  const { updateLayerCurvePoint } = useContext(LayersContext)

  const radius = (size / 2) - 2
  const posXY = getCell(curve[0], curve[1]) ?? [0, 0]

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsAnchor(true)
    setAnchorXY((pos) => ({ ...pos, index }))
  }

  // on drag move point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setAnchorXY({ index, x: event.target.x(), y: event.target.y() })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const pos = getCell(event.target.x(), event.target.y()) ?? [0, 0]

    updateLayerCurvePoint(index, pointInit, pointEnd, [pos[0], pos[1]])
    setIsAnchor(false)
  }

  // render
  return (
    <Circle
      draggable
      fill="#FFF"
      stroke="#222"
      strokeWidth={2}
      onDragEnd={onDragEndPoint}
      onDragMove={onDragMovePoint}
      onDragStart={onDragStartPoint}
      radius={radius}
      ref={pointRef}
      x={posXY[0]}
      y={posXY[1]}
    />
  )
}

export default Point
