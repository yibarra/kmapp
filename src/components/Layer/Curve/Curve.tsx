import { useContext, useRef } from 'react'
import { Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { CurveProps } from './interfaces'
import type { PointTypePosition } from '../Point/interfaces'

// curve
const Curve = ({
  active = false,
  anchorXY,
  currentPoint,
  curves,
  lineProperties,
  points,
  pointXY,
}: CurveProps) => {
  const elementLayerRef = useRef(null)
  const { isDragging, isAnchor } = useContext(UIContext)

  // create point
  const createPoint = (context: Context, [x, y]: number[], [init, end]: number[]): void => (
    context.quadraticCurveTo(
      x,
      y,
      init,
      end,
    )
  )

  // set point
  const setPoint = (context: Context, { pointEnd, xy }: { pointEnd: PointTypePosition, xy: number[]}, k: number) => {
    if (active) {
      if (isDragging && !isAnchor) {
        if (pointEnd.position === currentPoint) {
          createPoint(context, xy, [pointXY.x, pointXY.y])
        } else {
          createPoint(context, xy, [pointEnd.x, pointEnd.y])
        }
      } else if (isAnchor) {
        const pos = anchorXY.index === k ? [anchorXY.x, anchorXY.y] : xy

        createPoint(context, pos, [pointEnd.x, pointEnd.y])
      } else {
        createPoint(context, xy, [pointEnd.x, pointEnd.y])
      }
    } else {
      createPoint(context, xy, [pointEnd.x, pointEnd.y])
    }
  }

  // draw line
  const drawLine = (context: Context, shape: Shape) => {
    context.beginPath()

    // draw curves
    for (let k = 0; k < curves.length; k++) {
      const curve = curves[k]

      const pointInit = points.find((p) => p.position === curve.pointInit)
      const pointEnd = points.find((p) => p.position === curve.pointEnd)

      if (pointInit && pointEnd) {
        const pointCurveInit = [pointInit.x, pointInit.y]
        const [xC, yC] = curve.curve

        if (pointCurveInit) {
          if (active && isDragging && pointInit.position === currentPoint) {
            context.moveTo(pointXY.x, pointXY.y)
          } else {
            context.moveTo(pointCurveInit[0], pointCurveInit[1])
          }

          setPoint(context, { pointEnd, xy: [xC, yC] }, k)
        }
      }
    }

    context.fillStrokeShape(shape)
  }

  // render
  return (
    <ShapeK
      {...lineProperties}
      listening={false}
      ref={elementLayerRef}
      sceneFunc={drawLine}
    />
  )
}

export default Curve
