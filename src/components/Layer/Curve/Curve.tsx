import { useContext, useEffect, useRef } from 'react'
import { Shape as LineKonva } from 'react-konva'
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
  getCell,
  lineProperties,
  points,
  pointXY,
}: CurveProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementLayerRef = useRef<any>(null)

  const { isAnchor, isDragging } = useContext(UIContext)

  // draw line
  const drawLine = (context: Context, shape: Shape) => {
    context.beginPath()

    const parentCurve = curves.find((cv) => cv.pointEnd === currentPoint)

    // draw curves
    for (let k = 0; k < curves.length; k++) {
      const curve = curves[k]

      const pointInit = points.find((p) => p.position === curve.pointInit)
      const pointEnd = points.find((p) => p.position === curve.pointEnd)

      if (pointInit && pointEnd) {
        const pointCurveInit = getCell(pointInit.x, pointInit.y) ?? [0, 0]
        const pointCurveEnd = getCell(pointEnd.x, pointEnd.y) ?? [0, 0]

        if (pointCurveInit) {
          if (active && isDragging && pointInit.position === currentPoint) {
            context.moveTo(pointXY.x, pointXY.y)
          } else {
            context.moveTo(pointCurveInit[0], pointCurveInit[1])
          }

          if (active && isAnchor && anchorXY.index === k) {
            context.quadraticCurveTo(
              anchorXY.x,
              anchorXY.y,
              pointCurveEnd[0],
              pointCurveEnd[1],
            )
          } else {
            if (active && isDragging && parentCurve) {
              if (parentCurve === curve && parentCurve.pointEnd === pointEnd.position) {
                context.quadraticCurveTo(
                  curve.curve[0],
                  curve.curve[1],
                  pointXY.x,
                  pointXY.y
                )

                continue
              }
            }

            context.quadraticCurveTo(
              curve.curve[0],
              curve.curve[1],
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
    <LineKonva
      {...lineProperties}
      listening={false}
      ref={elementLayerRef}
      sceneFunc={drawLine}
    />
  )
}

export default Curve
