import { useContext, useMemo } from 'react'
import { Circle, Group, Shape as ShapeK } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import { LayersContext } from '../../../providers/LayersProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { AnchorProps, PointAnchorProps } from './interfaces'
import { AxisType } from '../../Grid/interfaces'

const PointAnchor = ({ curve, getCell, index, pointInit, pointEnd, setAnchorXY }: PointAnchorProps) => {
  const { setIsAnchor } = useContext(UIContext)
  const { updateLayerCurvePoint } = useContext(LayersContext)

  const posXY = useMemo(() => getCell(curve[0], curve[1]) ?? [0, 0], [curve, getCell])

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsAnchor(true)
  }

  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const x = event.evt.clientX
    const y = event.evt.clientY

    setAnchorXY({ x, y })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event

    updateLayerCurvePoint(index, pointInit, pointEnd, [clientX, clientY])
    setIsAnchor(false)
  }

  // render
  return (
    <Circle
      draggable
      fill="#222"
      onDragEnd={onDragEndPoint}
      onDragMove={onDragMovePoint}
      onDragStart={onDragStartPoint}
      radius={8}
      x={posXY[0]}
      y={posXY[1]}
    />
  )
}

const Anchor = ({ anchorXY, currentPoint, curves, getCell, points, pointXY, setAnchorXY }: AnchorProps) => {
  const { isAnchor, isDragging } = useContext(UIContext)

  // move point
  const movePoint = (context: Context, pointCurveInit: number[], position: number) => {
    if (isDragging && currentPoint === position) {
      context.moveTo(pointXY.x, pointXY.y)
    } else {
      context.moveTo(pointCurveInit[0], pointCurveInit[1])
    }
  }

  // create line
  const createLine = (context: Context, curvePos: AxisType, anchorPoints = false) => {
    if (isAnchor && anchorPoints) {
      context.lineTo(anchorXY.x, anchorXY.y)
    } else {
      context.lineTo(curvePos[0], curvePos[1])
    }
  }

  // draw line
  const drawLine = (context: Context, shape: Shape) => {
    context.beginPath()

    // draw curves
    for (let k = 0; k < curves.length; k++) {
      const curve = curves[k]

      if (curve) {
        const pointInit = points.find((p) => p.position === curve.pointInit)
        const pointEnd = points.find((p) => p.position === curve.pointEnd)

        if (pointInit && pointEnd) {
          const pointCurveInit = getCell(pointInit.x, pointInit.y) ?? [0, 0]
          const pointCurveEnd = getCell(pointEnd.x, pointEnd.y) ?? [0, 0]

          if (pointCurveInit) {
            const curvePos = getCell(curve.curve[0], curve.curve[1])

            if (curvePos) {
              const anchorPointInit = anchorXY.curve?.pointInit === pointInit.position
              const anchorPointEnd = anchorXY.curve?.pointEnd === pointEnd.position

              // init point
              movePoint(context, pointCurveInit, pointInit.position)
              createLine(context, curvePos, anchorPointInit && anchorPointEnd)

              // end point
              movePoint(context, pointCurveEnd, pointEnd.position)
              createLine(context, curvePos, anchorPointInit && anchorPointEnd)
            }
          }
        }
      }
    }

    context.fillStrokeShape(shape)
  }
  
  // render
  return (
    <Group>
      <ShapeK
        stroke="#00FF00"
        strokeWidth={2}
        listening={false}
        sceneFunc={drawLine}
      />

      {Array.isArray(curves) && curves.map((curve, key) => (
        <PointAnchor
          {...curve}
          index={key}
          getCell={getCell}
          key={key}
          setAnchorXY={setAnchorXY}
        />
      ))}
    </Group>
  )
}

export default Anchor
