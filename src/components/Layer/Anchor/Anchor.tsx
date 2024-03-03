import { useContext } from 'react'
import { Group, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

import Point from './Point'
import Tooltip from './Tooltip'
import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { PointTypePosition } from '../Point/interfaces'
import type { AnchorProps } from './interfaces'
import { calculateDashArray, getDistance } from '../../../providers/GridProvider/helpers'

// anchor
const Anchor = ({ anchorXY, currentPoint, curves, getCell, points, pointXY, setAnchorXY }: AnchorProps) => {
  const { isAnchor, isDragging } = useContext(UIContext)
  const { sizeBox } = useContext(GridContext)

  // move point
  const movePoint = (context: Context, pointCurveInit: number[], position: number) => {
    context.beginPath()

    if (isDragging && currentPoint === position) {
      context.moveTo(pointXY.x, pointXY.y)
    } else {
      context.moveTo(pointCurveInit[0], pointCurveInit[1])
    }
  }

  // create point line
  const createPointLine = (context: Context, point: PointTypePosition, shape: ShapeType) => {
    const posXY = [point.x, point.y]

    if (pointXY) {
      shape.fill('#222')
      context.beginPath()

      if (isDragging) {
        if (point.position === currentPoint) {
          context.arc(pointXY.x, pointXY.y, sizeBox / 6, 0, Math.PI * 2)
        } else {
          context.arc(posXY[0], posXY[1], sizeBox / 6, 0, Math.PI * 2)
        }
      } else {
        context.arc(posXY[0], posXY[1], sizeBox / 6, 0, Math.PI * 2)
      }

      context.fillShape(shape)
    }
  }

  // create line
  const createLine = (context: Context, curvePos: number[], anchorPoints: boolean, point: number[]) => {
    if (isAnchor && anchorPoints) {
      const dist = getDistance(curvePos, [anchorXY.x, anchorXY.y])
      
      context.setLineDash(calculateDashArray(dist, sizeBox / 2))
      context.lineTo(anchorXY.x, anchorXY.y)
    } else {
      const dist = getDistance(curvePos, point)

      context.setLineDash(calculateDashArray(dist, sizeBox / 2))
      context.lineTo(curvePos[0], curvePos[1])  
    }
  }

  // create line anchor
  const createLineAnchor = (context: Context, shape: ShapeType, curvePos: number[], point: PointTypePosition, anchors: boolean) => {
    const pointCurve = [point.x, point.y]

    if (pointCurve) {
      movePoint(context, pointCurve, point.position)

      shape.stroke('#222')
      shape.strokeWidth(1)
      createLine(context, curvePos, anchors, [point.x, point.y])
      context.fillShape(shape)
      context.strokeShape(shape)
      
      createPointLine(context, point, shape)
    }
  }

  // draw line
  const drawLine = (context: Context, shape: ShapeType) => {
    context.beginPath()

    // draw curves
    for (let k = 0; k < curves.length; k++) {
      const curve = curves[k]

      if (curve) {
        const pointInit = points.find((p) => p.position === curve.pointInit)
        const pointEnd = points.find((p) => p.position === curve.pointEnd)

        if (pointInit && pointEnd) {
          const curvePos = curve.curve

          if (curvePos) {
            const anchors = (k === anchorXY.index)

            createLineAnchor(context, shape, curvePos, pointInit, anchors) // line init
            createLineAnchor(context, shape, curvePos, pointEnd, anchors) // line end
          }
        }
      }
    }

    context.fillShape(shape)
  }
  
  // render
  return (
    <Group>
      <Shape
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
        isAnchor={isAnchor}
        points={points}
        size={sizeBox / 4}
      />
    </Group>
  )
}

export default Anchor
