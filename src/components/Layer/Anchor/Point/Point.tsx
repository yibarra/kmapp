import { useContext, useRef } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { LayersContext } from '../../../../providers/LayersProvider'
import { UIContext } from '../../../../providers/UIProvider/UIProvider'
import { ViewportContext } from '../../../../providers/ViewportProvider/ViewportProvider'
import type { PointAnchorProps } from './interfaces'

const Point = ({ curve, index, setAnchorXY, size }: PointAnchorProps) => {
  const pointRef = useRef(null)

  const { properties } = useContext(ViewportContext)
  const { setIsAnchor } = useContext(UIContext)
  const { updateLayerPoint } = useContext(LayersContext)

  const radius = (size / 2) - 2
  const posXY = [curve?.x, curve?.y]

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

    const x = event.target.x() + properties.drag.offset[0]
    const y = event.target.y() + properties.drag.offset[1]

    setIsAnchor(false)
    updateLayerPoint({ position: curve?.position ?? 0, x, y}, curve?.position ?? 0)
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
