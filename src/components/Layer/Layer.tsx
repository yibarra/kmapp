import { useContext, useState } from 'react'
import { Group, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'

import { GridContext } from '../../providers/GridProvider/GridProvider'
import { LayersContext } from '../../providers/LayersProvider'
import Anchor from './Anchor/Anchor'
import Curve from './Curve'
import Line from './Line'
import Point from './Point'
import type { LayerProps } from '../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from './Point/interfaces'
import type { PointAnchorPosition } from './Anchor/interfaces'

const Layer = (props: LayerProps & { active?: boolean, index: number }) => {
  const { getCell, sizeBox } = useContext(GridContext)
  const { updateLayer, updateLayerPoint } = useContext(LayersContext)

  const { active, currentPoint, points, pointsProperties } = props

  const [pointXY, setPointXY] = useState<Omit<PointTypePosition, 'position'>>(props.points[currentPoint])
  const [anchorXY, setAnchorXY] = useState<PointAnchorPosition>({ x: 0, y: 0 })
  
  const radius = (sizeBox / 2) - 2

  // draw points
  const drawPoints = (context: Context) => {
    context.beginPath()

    for (const point of points) {
      const posXY = getCell(point.x, point.y)
        
      if (posXY) {
        const fill = pointsProperties?.fill ?? '#FFF000'

        context.fillStyle = fill ?? '#FF00'
        context.arc(posXY[0], posXY[1], radius, 0, 2 * Math.PI, false)
        context.closePath()
        context.fill()
      }
    }
  }

  // on click point
  const onClickPoint = (event: KonvaEventObject<MouseEvent>) => {
    const { evt: { clientX, clientY }} = event

    const values = getCell(clientX, clientY)

    if (values && active) {
      for (const [index, point] of points.entries()) {
        const valuesPoint = getCell(point.x, point.y)

        if (valuesPoint) {
          if (valuesPoint[0] === values[0] && valuesPoint[1] === values[1]) {
            setPointXY({ x: valuesPoint[0], y: valuesPoint[1] })
            updateLayer(props.index, { ...props, currentPoint: index })
          }
        }
      }
    }
  }

  // set position point
  const setPositionPoint = (posX: number, posY: number, position: number) => {
    if (!posX || !posY || !active) {
      return false;
    }
    
    updateLayerPoint(
      {
        x: posX,
        y: posY,
        position,
      }, currentPoint
    )
  }
  
  // render
  return (
    <Group opacity={active ? 1 : 0.1}>
      <Line
        {...props}
        anchorXY={anchorXY}
        getCell={getCell}
        pointXY={pointXY}
      />

      <Curve
        {...props}
        anchorXY={anchorXY}
        getCell={getCell}
        pointXY={pointXY}
      />

      <Shape sceneFunc={drawPoints} onClick={onClickPoint} />

      <Point
        {...points[props.currentPoint]}
        active={active}
        currentPoint={currentPoint}
        getCell={getCell}
        pointsProperties={{ ...pointsProperties, radius: (sizeBox / 2) - 2 }}
        setPointXY={setPointXY}
        setPositionPoint={setPositionPoint}
      />

      {active && (
        <Anchor
          {...props}
          anchorXY={anchorXY}
          getCell={getCell}
          pointXY={pointXY}
          setAnchorXY={setAnchorXY}
        />
      )}
    </Group>
  )
}

export default Layer
