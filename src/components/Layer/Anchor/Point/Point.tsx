import { useContext } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { GridContext } from '../../../../providers/GridProvider/GridProvider'
import { LayersContext } from '../../../../providers/LayersProvider'
import { UIContext } from '../../../../providers/UIProvider/UIProvider'
import type { PointAnchorProps } from './interfaces'

const Point = ({ curve, getCell, index, pointInit, pointEnd, setAnchorXY }: PointAnchorProps) => {
  const { setIsAnchor } = useContext(UIContext)
  const { sizeBox } = useContext(GridContext)
  const { updateLayerCurvePoint } = useContext(LayersContext)

  const radius = (sizeBox / 2) - 2
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

    const x = event.evt.clientX
    const y = event.evt.clientY

    setAnchorXY({ index, x, y })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event
    const pos = getCell(clientX, clientY) ?? [0, 0]

    updateLayerCurvePoint(index, pointInit, pointEnd, [pos[0], pos[1]])
    setIsAnchor(false)
  }

  // render
  return (
    <>
      <Circle
        draggable
        fill="#FFF"
        stroke="#222"
        strokeWidth={2}
        onDragEnd={onDragEndPoint}
        onDragMove={onDragMovePoint}
        onDragStart={onDragStartPoint}
        radius={radius}
        x={posXY[0]}
        y={posXY[1]}
      />
    </>
  )
}

export default Point
