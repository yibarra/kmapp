import { useContext } from 'react'
import { Group, Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import Point from './Point'
import Tooltip from './Tooltip'
import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { AxisType } from '../../Grid/interfaces'
import type { AnchorProps } from './interfaces'

// anchor
const Anchor = ({ anchorXY, currentPoint, curves, getCell, points, pointXY, setAnchorXY }: AnchorProps) => {
  const { isAnchor, isDragging } = useContext(UIContext)
  const { sizeBox } = useContext(GridContext)

  // move point
  const movePoint = (context: Context, pointCurveInit: number[], position: number) => {
    if (isDragging && currentPoint === position) {
      context.moveTo(pointXY.x, pointXY.y)
    } else {
      context.moveTo(pointCurveInit[0], pointCurveInit[1])
    }
  }

  // create line
  const createLine = (context: Context, curvePos: AxisType, anchorPoints: boolean) => {
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
              const anchors = (k === anchorXY.index)

              // init point
              movePoint(context, pointCurveInit, pointInit.position)
              createLine(context, curvePos, anchors)

              movePoint(context, pointCurveEnd, pointEnd.position)
              createLine(context, curvePos, anchors)
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
        stroke="#222"
        strokeWidth={1}
        listening={false}
        sceneFunc={drawLine}
      />

      {Array.isArray(curves) && curves.map((curve, key) => (
        <Point
          {...curve}
          index={key}
          getCell={getCell}
          key={key}
          size={sizeBox}
          setAnchorXY={setAnchorXY}
        />
      ))}

      <Tooltip
        anchorXY={anchorXY}
        curves={curves}
        currentPoint={currentPoint}
        getCell={getCell}
        size={sizeBox / 4}
        points={points}
      />
    </Group>
  )
}

export default Anchor
