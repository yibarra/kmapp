import { useContext, useState } from 'react'
import { Group } from 'react-konva'

import { GridContext } from '../../providers/GridProvider/GridProvider'
import { LayersContext } from '../../providers/LayersProvider'
import Anchor from './Anchor/Anchor'
import Curve from './Curve'
import Line from './Line'
import Point from './Point'
import type { LayerProps } from '../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from './Point/interfaces'
import type { PointAnchorPosition } from './Anchor/interfaces'
import Points from './Points'
import { ViewportContext } from '../../providers/ViewportProvider/ViewportProvider'

const Layer = (props: LayerProps & { active?: boolean, index: number }) => {
  const { getCell, sizeBox } = useContext(GridContext)
  const { updateLayer, updateLayerPoint } = useContext(LayersContext)
  const { getMouse, properties } = useContext(ViewportContext)

  const { active, currentPoint, points, pointsProperties } = props

  const [pointXY, setPointXY] = useState<Omit<PointTypePosition, 'position'>>(props.points[currentPoint])
  const [anchorXY, setAnchorXY] = useState<PointAnchorPosition>({ x: 0, y: 0 })
  
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
    <Group opacity={active ? 1 : 0.1}>
      <Line
        {...props}
        anchorXY={anchorXY}
        getCell={getCell}
        getMouse={getMouse}
        pointXY={pointXY}
      />

      <Curve
        {...props}
        anchorXY={anchorXY}
        getCell={getCell}
        getMouse={getMouse}
        pointXY={pointXY}
      />

      <Points
        active={active}
        currentPoint={currentPoint}
        getMouse={getMouse}
        radius={radius}
        points={points}
        properties={properties}
        pointsProperties={pointsProperties}
        setUpdateLayer={setUpdateLayer}
        setPointXY={setPointXY}
      />

      <Point
        {...points[props.currentPoint]}
        active={active}
        currentPoint={currentPoint}
        pointsProperties={{ ...pointsProperties, radius: (sizeBox / 2) - 2 }}
        pointXY={pointXY}
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
