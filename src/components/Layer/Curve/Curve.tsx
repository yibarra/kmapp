import { useContext, useEffect, useRef } from 'react'
import { Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { CurveProps } from './interfaces'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementLayerRef = useRef<any>(null)

  const { isDragging, isAnchor } = useContext(UIContext)

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
        const pointCurveEnd = [pointEnd.x, pointEnd.y]
        const [xC, yC] = curve.curve

        if (pointCurveInit) {
          if (active && isDragging && pointInit.position === currentPoint) {
            context.moveTo(pointXY.x, pointXY.y)
          } else {
            context.moveTo(pointCurveInit[0], pointCurveInit[1])
          }

          if (active) {
            if (isDragging && !isAnchor) {
              if (pointInit.position === currentPoint) {
                context.quadraticCurveTo(
                  xC,
                  yC,
                  pointCurveEnd[0],
                  pointCurveEnd[1],
                )
                
              } else if (pointEnd.position === currentPoint) {
                context.quadraticCurveTo(
                  xC,
                  yC,
                  pointXY.x,
                  pointXY.y,
                )
              } else {
                context.quadraticCurveTo(
                  xC,
                  yC,
                  pointCurveEnd[0],
                  pointCurveEnd[1],
                )
              }
            } else if (isAnchor) {
              if (anchorXY.index === k) {
                context.quadraticCurveTo(
                  anchorXY.x,
                  anchorXY.y,
                  pointCurveEnd[0],
                  pointCurveEnd[1],
                )
              } else {
                context.quadraticCurveTo(
                  xC,
                  yC,
                  pointCurveEnd[0],
                  pointCurveEnd[1],
                )
              }
            } else {
              context.quadraticCurveTo(
                xC,
                yC,
                pointCurveEnd[0],
                pointCurveEnd[1],
              )
            }
          } else {
            context.quadraticCurveTo(
              xC,
              yC,
              pointCurveEnd[0],
              pointCurveEnd[1],
            )
          }
        }
      }
    }

    context.fillStrokeShape(shape)
  }

  // use effect
  useEffect(() => {
    if (elementLayerRef.current && typeof elementLayerRef.current.to !== 'undefined') {
      elementLayerRef.current.to({ ...lineProperties })
    }
  }, [active, isDragging, lineProperties])

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
