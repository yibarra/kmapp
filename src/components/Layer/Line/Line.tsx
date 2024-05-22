import { useContext, useRef } from 'react'
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
  const elementLayerRef = useRef(null)
  const { isDragging } = useContext(UIContext)

  // find point curve
  const findPointCurve = (index: number) => {
    let translate = false
    let pointInitial = false

    const element = curves.filter((item: CurveType) => {
      if (item.pointEnd === index || item.pointInit === index || item.curve === index) {
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

  // set point
  const setPoint = (item: PointTypePosition, result: number[][], position: number[]) => {
    if (active && isDragging && currentPoint === item.position) {
      return result.push([pointXY.x, pointXY.y, 0])
    }
    
    return result.push([...position, 0])
  }

  // convert point
  const convertPoint = (item: PointTypePosition, index: number, result: number[][]) => {
    const point = [item.x, item.y]
  
    if (point) {
      const { element } = findPointCurve(index)
      const [x, y] = point

      if (element) {
        if (element.pointInit === index && element.pointInit < element.pointEnd) {
          setPoint(item, result, [x, y])
        } else if (active && isDragging && currentPoint === item.position) {
          return result.push([pointXY.x, pointXY.y, 1])
        }

        return result.push([x, y, 1])
      }
      
      if (!element) {
        setPoint(item, result, [x, y])
      }
    }
  }

  // convert points
  const convertPoints = (items: PointTypePosition[]): number[][] => {
    const result: number[][] = []

    for (let index = 0; index < items.length; index++) {
      const item = items[index]

      if (item) {
        convertPoint(item, index, result)
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
