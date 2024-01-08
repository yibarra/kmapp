import { useContext } from 'react'
import { Group, Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import Point from './Point'
import Tooltip from './Tooltip'
import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import type { AxisType } from '../../Grid/interfaces'
import type { PointTypePosition } from '../Point/interfaces'
import type { AnchorProps } from './interfaces'

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
  const createPointLine = (context: Context, point: PointTypePosition) => {
    const pointXY = getCell(point.x, point.y)

    if (pointXY) {
      context.beginPath()
      context.arc(pointXY[0], pointXY[1], sizeBox / 6, 0, 2 * Math.PI)
      context.closePath()
      context.fillStyle = '#222'
      context.fill()
    }
  }

  // create line
  const createLine = (context: Context, curvePos: AxisType, anchorPoints: boolean) => {
    context.strokeStyle = '#222'
    context.lineWidth = 1

    if (isAnchor && anchorPoints) {
      context.lineTo(anchorXY.x, anchorXY.y)
    } else {
      context.lineTo(curvePos[0], curvePos[1])  
    }
    
    context.closePath()
    context.stroke()
  }

  // create line anchor
  const createLineAnchor = (context: Context, curvePos: AxisType, point: PointTypePosition, anchors: boolean) => {
    const pointCurve = getCell(point.x, point.y) ?? [0, 0]

    if (pointCurve) {
      movePoint(context, pointCurve, point.position)
      createLine(context, curvePos, anchors)
      createPointLine(context, point)
    }
  }

  // draw line
  const drawLine = (context: Context) => {
    context.beginPath()

    // draw curves
    for (let k = 0; k < curves.length; k++) {
      const curve = curves[k]

      if (curve) {
        const pointInit = points.find((p) => p.position === curve.pointInit)
        const pointEnd = points.find((p) => p.position === curve.pointEnd)

        if (pointInit && pointEnd) {
          const curvePos = getCell(curve.curve[0], curve.curve[1])

          if (curvePos) {
            const anchors = (k === anchorXY.index)

            createLineAnchor(context, curvePos, pointInit, anchors) // line init
            createLineAnchor(context, curvePos, pointEnd, anchors) // line end
          }
        }
      }
    }
  }
  
  // render
  return (
    <Group>
      <ShapeK
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
        getCell={getCell}
        points={points}
        size={sizeBox / 4}
      />
    </Group>
  )
}

export default Anchor
