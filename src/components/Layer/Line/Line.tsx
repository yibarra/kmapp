import { useContext, useEffect, useRef } from 'react'
import { Shape as LineKonva } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import type { LineProps } from './interfaces'
import type { CurveType } from '../../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../Point/interfaces'
import { UIContext } from '../../../providers/UIProvider/UIProvider'

// line
const Line = ({
  active = false,
  anchorXY,
  currentPoint,
  curves,
  getCell,
  points,
  lineProperties,
  pointXY,
}: LineProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementLayerRef = useRef<any>(null)

  const { isAnchor, isDragging } = useContext(UIContext)

  // find point curve
  const findPointCurve = (index: number) => {
    let translate = false
    let pointInitial = false

    const element = curves.filter((item: CurveType) => {
      if (item.pointEnd === index || item.pointInit === index) {
        if (item.pointInit === index) {
          translate = true
        }

        if (item.pointEnd === index) {
          pointInitial = true
        }

        return true
      }

      return false
    })

    return {
      element: element[0],
      pointInitial,
      translate
    }
  }

  // convert points
  const convertPoints = (items: PointTypePosition[]): number[][] => {
    const result: number[][] = []

    for (let index = 0; index < items.length; index++) {
      const item = items[index]

      if (item) {
        const point = getCell(item.x, item.y)
  
        if (point) {
          const { element } = findPointCurve(index)
          const x: number = Math.floor(point[0])
          const y: number = Math.floor(point[1])
  
          if (!element) {
            if (isDragging && currentPoint === item.position) {
              result.push([pointXY.x, pointXY.y, 0])
            } else {
              result.push([x, y, 0])
            }
          }
  
          if (element) {
            if (element.pointInit === index && element.pointInit < element.pointEnd) {
              if (isDragging && currentPoint === item.position) {
                result.push([pointXY.x, pointXY.y, 0])
              } else {
                result.push([x, y, 0])
              }
            } else {
              if (isDragging && currentPoint === item.position) {
                result.push([pointXY.x, pointXY.y, 1])
              } else {
                result.push([x, y, 1])
              }
            }
          }
        }
      }
    }

    return result
  }

  // move points
  const movePoints = (points: PointTypePosition[]) => {
    if (!isDragging) {
      return points
    }

    return points.map((point) => {
      if (point.position === currentPoint) {
        return { ...point, ...pointXY }
      }

      return point
    })
  }

  // draw line
  const drawLine = (context: Context, shape: Shape) => {
    const lines = convertPoints(movePoints(points))

    context.beginPath()

    // draw points
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line) {
        const [ x, y, move ] = line

        if (move) {
          context.moveTo(x, y)
        } else {
          context.lineTo(x, y)
        }
      }
    }

    const parentCurve = curves.find((cv) => cv.pointEnd === currentPoint)

    // draw curves
    for (const curve of curves) {
      const pointInit = points.find((p) => p.position === curve.pointInit)
      const pointEnd = points.find((p) => p.position === curve.pointEnd)

      if (pointInit && pointEnd) {
        const pointCurveInit = getCell(pointInit.x, pointInit.y) ?? [0, 0]
        const pointCurveEnd = getCell(pointEnd.x, pointEnd.y) ?? [0, 0]

        if (pointCurveInit) {
          if (isDragging && pointInit.position === currentPoint) {
            context.moveTo(pointXY.x, pointXY.y)
          } else {
            context.moveTo(pointCurveInit[0], pointCurveInit[1])
          }

          if (isAnchor && parentCurve?.pointEnd === pointEnd.position) {
            context.quadraticCurveTo(
              anchorXY.x,
              anchorXY.y,
              pointCurveEnd[0],
              pointCurveEnd[1],
            )
          } else {
            if (isDragging && parentCurve) {
              if (parentCurve === curve && parentCurve.pointEnd === pointEnd.position) {
                context.quadraticCurveTo(
                  curve.curve[0],
                  curve.curve[1],
                  pointXY.x, pointXY.y
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

export default Line
