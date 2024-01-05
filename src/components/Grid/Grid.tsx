import React, { memo, useCallback } from 'react'
import { Context } from 'konva/lib/Context'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Group, Shape as ShapeK } from 'react-konva'

import type { GridProps } from './interfaces'

// grid
const Grid: React.FC<GridProps> = ({ createGridBoxes, width, height }) => {
  // create axis
  const createAxis = useCallback((ctx: Context): false | void => {
    createGridBoxes(ctx, width, height)
  }, [createGridBoxes, height, width])

  // create grid scene
  const createGridScene = useCallback((ctx: Context, shape: Shape<ShapeConfig>): void => {
    ctx.beginPath()
    createAxis(ctx) // x & y
    ctx.closePath()

    ctx.fillStrokeShape(shape)
  }, [createAxis])

  // render
  return <Group>
    <ShapeK
      fill="#FFFFFF"
      listening={false}
      stroke="#222"
      strokeWidth={0.5}
      opacity={0.05}
      sceneFunc={createGridScene}
    />
  </Group>
}

export default memo(Grid)
