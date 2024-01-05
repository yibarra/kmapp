import { useCallback, useContext, useState } from 'react'
import { Group, Shape } from 'react-konva'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { Context } from 'konva/lib/Context'

import { GridContext } from '../../providers/GridProvider/GridProvider'
import { KonvaEventObject } from 'konva/lib/Node'
import { LayersContext } from '../../providers/LayersProvider'
import Anchor from './Anchor/Anchor'
import Line from './Line'
import Point from './Point'
import type { LayerProps } from '../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from './Point/interfaces'
import { PointAnchorPosition } from './Anchor/interfaces'

const Layer = (props: LayerProps & { active?: boolean, index: number }) => {
  const { getCell } = useContext(GridContext)
  const { updateLayer, updateLayerPoint } = useContext(LayersContext)

  const [pointXY, setPointXY] = useState<Omit<PointTypePosition, 'position'>>({ x: 0, y: 0 })
  const [anchorXY, setAnchorXY] = useState<PointAnchorPosition>({ x: 0, y: 0 })

  const { active = false, currentPoint, points, pointsProperties } = props

  // draw points
  const drawPoints = (context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const values = getCell(point.x, point.y)
        
      if (values) {
        const x = values[0]
        const y = values[1]

        const fill = pointsProperties?.fill ?? '#FFF000'
        const radius = Number(pointsProperties?.radius) ?? 5

        shape.fill(fill ?? '#FFF000')
        context.arc(x, y, radius, 0, 2 * Math.PI, false)
      }
      
      context.closePath()
    }
    
    context.fillShape(shape)
  }

  // on click point
  const onClickPoint = (event: KonvaEventObject<MouseEvent>) => {
    const { evt: { clientX, clientY }} = event

    const values = getCell(clientX, clientY)

    if (values) {
      for (const [index, point] of points.entries()) {
        const valuesPoint = getCell(point.x, point.y)

        if (valuesPoint) {
          if (valuesPoint[0] === values[0] && valuesPoint[1] === values[1]) {
            updateLayer(props.index, { ...props, currentPoint: index })
          }
        }
      }
    }
  }

  // set position point
  const setPositionPoint = useCallback((posX: number, posY: number, position: number) => {
    if (!posX || !posY) {
      return false;
    }
    
    updateLayerPoint(
      {
        x: posX,
        y: posY,
        position,
      }, currentPoint
    )
  }, [currentPoint, updateLayerPoint])
  
  // render
  return (
    <Group>
      <Line
        {...props}
        anchorXY={anchorXY}
        getCell={getCell}
        pointXY={pointXY}
      />

      <Anchor
        {...props}
        anchorXY={anchorXY}
        getCell={getCell}
        setAnchorXY={setAnchorXY}
        pointXY={pointXY}
      />

      <Shape sceneFunc={drawPoints} onClick={onClickPoint} />

      <Point
        {...points[props.currentPoint]}
        active={active}
        currentPoint={currentPoint}
        getCell={getCell}
        pointsProperties={pointsProperties}
        setPointXY={setPointXY}
        setPositionPoint={setPositionPoint}
      />
    </Group>
  )
}

export default Layer
