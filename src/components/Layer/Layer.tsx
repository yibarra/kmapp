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
import type { PointAnchorPosition } from './Anchor/interfaces'
import type { PointTypePosition } from './Point/interfaces'

// layer
const Layer = (props: LayerProps & { active?: boolean, index: number }) => {
  const { sizeBox } = useContext(GridContext)
  const { current, updateLayer, updateLayerPoint } = useContext(LayersContext)

  const { active, curves, currentPoint, drag, points, pointsProperties } = props

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
 
  const point = points[props.currentPoint]

  // render
  return (
    <Group
      opacity={active || current === null ? 1 : 0.1}
    >
      <Line
        {...props}
        anchorXY={anchorXY}
        pointXY={pointXY}
        points={points.map(({ x, y, position }) => ({ x: x + (drag?.offset ? drag?.offset[0] : 0), y: y + (drag?.offset ? drag?.offset[1] : 0), position }))}
      />

      <Curve
        {...props}
        curves={curves.map(({ curve: [x, y], ...curve}) => ({...curve, curve: [x + (drag?.offset ? drag?.offset[0] : 0), y + (drag?.offset ? drag?.offset[1] : 0) ]}))}
        points={points.map(({ x, y, position }) => ({ x: x + (drag?.offset ? drag?.offset[0] : 0), y: y + (drag?.offset ? drag?.offset[1] : 0), position }))}
        anchorXY={{ x: anchorXY.x + (drag?.offset ? drag?.offset[0] : 0), y: anchorXY.y + (drag?.offset ? drag?.offset[1] : 0), index: anchorXY.index }}
        pointXY={{ x: pointXY.x + (drag?.offset ? drag?.offset[0] : 0), y: pointXY.y + (drag?.offset ? drag?.offset[1] : 0) }}
      />

      <Points
        {...props}
        curves={curves.map(({ curve: [x, y], ...curve}) => ({...curve, curve: [x + (drag?.offset ? drag?.offset[0] : 0), y + (drag?.offset ? drag?.offset[1] : 0) ]}))}
        points={points.map(({ x, y, position }) => ({ x: x + (drag?.offset ? drag?.offset[0] : 0), y: y + (drag?.offset ? drag?.offset[1] : 0), position }))}
        radius={radius}
        pointXY={pointXY}
        setAnchorXY={setAnchorXY}
        setUpdateLayer={setUpdateLayer}
        setPointXY={setPointXY}
      />

      <Point
        {...props}
        x={point.x + (drag?.offset ? drag?.offset[0] : 0)}
        y={point.y + (drag?.offset ? drag?.offset[1] : 0)}
        pointsProperties={{ ...pointsProperties, radius: (sizeBox / 2) - 2 }}
        pointXY={pointXY}
        setPointXY={setPointXY}
        setPositionPoint={setPositionPoint}
      />

      {active && (
        <Anchor
          {...props}
          curves={curves.map(({ curve: [x, y], ...curve}) => ({...curve, curve: [x + (drag?.offset ? drag?.offset[0] : 0), y + (drag?.offset ? drag?.offset[1] : 0) ]}))}
          anchorXY={anchorXY}
          pointXY={pointXY}
          points={points.map(({ x, y, position }) => ({ x: x + (drag?.offset ? drag?.offset[0] : 0), y: y + (drag?.offset ? drag?.offset[1] : 0), position }))}
          setAnchorXY={setAnchorXY}
        />
      )}
    </Group>
  )
}

export default Layer
