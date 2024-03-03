import { useContext, useEffect, useRef } from 'react'
import { Shape as LineKonva } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { LineProps } from './interfaces'
import type { CurveType } from '../../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../Point/interfaces'

// line
const Line = ({
  active = false,
  currentPoint,
  curves,
  lineProperties,
  points,
  pointXY,
}: LineProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementLayerRef = useRef<any>(null)
  const { isDragging } = useContext(UIContext)

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
        const point = [item.x, item.y]
  
        if (point) {
          const { element } = findPointCurve(index)
          const [x, y] = point

          if (element) {
            if (element.pointInit === index && element.pointInit < element.pointEnd) {
              if (active && isDragging && currentPoint === item.position) {
                result.push([pointXY.x, pointXY.y, 0])
              } else {
                result.push([x, y, 0])
              }
            } else if (active && isDragging && currentPoint === item.position) {
              result.push([pointXY.x, pointXY.y, 1])
            } else {
              result.push([x, y, 1])
            }
          }
          
          if (!element) {
            if (active && isDragging && currentPoint === item.position) {
              result.push([pointXY.x, pointXY.y, 0])
            } else {
              result.push([x, y, 0])
            }
          }
        }
      }
    }

    return result
  }

  // move points
  const movePoints = (points: PointTypePosition[]) => {
    if (!isDragging || !active) {
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
    for (const line of lines) {
      if (line) {
        const [ cx, cy, move ] = line

        if(move) {
          context.moveTo(cx, cy)
        } else {
          context.lineTo(cx, cy)
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
