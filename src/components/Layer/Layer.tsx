import { useContext, useState } from 'react'
import { Group } from 'react-konva'

import Anchor from './Anchor/Anchor'
import Curve from './Curve'
import Line from './Line'
import Point from './Point'
import Points from './Points'
import { GridContext } from '../../providers/GridProvider/GridProvider'
import { LayersContext } from '../../providers/LayersProvider'
import type { LayerProps } from '../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from './Point/interfaces'
import type { PointAnchorPosition } from './Anchor/interfaces'


// layer
const Layer = (props: LayerProps & { active?: boolean, index: number }) => {
  const { sizeBox } = useContext(GridContext)
  const { current, updateLayer, updateLayerPoint } = useContext(LayersContext)

  const { active, currentPoint, points, pointsProperties } = props

  const [pointXY, setPointXY] = useState<Omit<PointTypePosition, 'position'>>(props.points[currentPoint])
  const [anchorXY, setAnchorXY] = useState<PointAnchorPosition>({ x: 0, y: 0, index: 0 })
  
  const radius = (sizeBox / 2) - 2

  // update point
  const setUpdateLayer = (index: number) => updateLayer(props.index, { ...props, currentPoint: index })

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
    <Group opacity={active || current === null ? 1 : 0.1}>
      <Line {...props} anchorXY={anchorXY} pointXY={pointXY} />

      <Curve {...props} anchorXY={anchorXY} pointXY={pointXY} />

      <Points
        {...props}
        radius={radius}
        pointXY={pointXY}
        setAnchorXY={setAnchorXY}
        setUpdateLayer={setUpdateLayer}
        setPointXY={setPointXY}
      />

      <Point
        {...props}
        {...points[props.currentPoint]}
        pointsProperties={{ ...pointsProperties, radius: (sizeBox / 2) - 2 }}
        pointXY={pointXY}
        setPointXY={setPointXY}
        setPositionPoint={setPositionPoint}
      />

      {active && (
        <Anchor {...props} anchorXY={anchorXY} pointXY={pointXY} setAnchorXY={setAnchorXY} />
      )}
    </Group>
  )
}

export default Layer
