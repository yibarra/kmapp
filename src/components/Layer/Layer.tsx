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
import { ViewportContext } from '../../providers/ViewportProvider/ViewportProvider'

// layer
const Layer = (props: LayerProps & { active?: boolean, index: number }) => {
  const { sizeBox } = useContext(GridContext)
  const { current, updateLayer, updateLayerPoint } = useContext(LayersContext)
  const { properties } = useContext(ViewportContext)

  const [pointXY, setPointXY] = useState<Omit<PointTypePosition, 'position'>>({
    x: props.points[props.currentPoint].x - properties.drag.offset[0],
    y: props.points[props.currentPoint].y - properties.drag.offset[1],
  })
  const [anchorXY, setAnchorXY] = useState<PointAnchorPosition>({
    x: properties.drag.offset[0],
    y: properties.drag.offset[1],
    index: 0
  })
  
  const { active, curves, currentPoint, drag, points, pointsProperties } = props
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

  const curvesPosition = curves.map(({ curve: [x, y], ...curve}) => ({...curve, curve: [x + (drag?.offset ? drag?.offset[0] : 0), y + (drag?.offset ? drag?.offset[1] : 0) ]}))
  const pointsPosition = points.map(({ x, y, position }) => ({ x: x + (drag?.offset ? drag?.offset[0] : 0), y: y + (drag?.offset ? drag?.offset[1] : 0), position }))
  
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
        points={pointsPosition}
      />

      <Curve
        {...props}
        curves={curvesPosition}
        points={pointsPosition}
        anchorXY={anchorXY}
        pointXY={pointXY}
      />

      <Points
        {...props}
        curves={curvesPosition}
        points={pointsPosition}
        radius={radius}
        pointXY={pointXY}
        setAnchorXY={setAnchorXY}
        setUpdateLayer={setUpdateLayer}
        setPointXY={setPointXY}
      />

      <Point
        {...props}
        pointsProperties={{ ...pointsProperties, radius: (sizeBox / 2) - 2 }}
        pointXY={pointXY}
        setPositionPoint={setPositionPoint}
        setPointXY={setPointXY}
        x={point.x + (drag?.offset ? drag?.offset[0] : 0)}
        y={point.y + (drag?.offset ? drag?.offset[1] : 0)}
      />

      {active && (
        <Anchor
          {...props}
          anchorXY={anchorXY}
          curves={curvesPosition}
          pointXY={pointXY}
          points={pointsPosition}
          setAnchorXY={setAnchorXY}
        />
      )}
    </Group>
  )
}

export default Layer
