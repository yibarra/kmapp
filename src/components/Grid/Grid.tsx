import { Group, Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape, ShapeConfig } from 'konva/lib/Shape'

import type { GridProps } from './interfaces'

// grid
const Grid = ({ createGridBoxes, width, height }: GridProps) => {
  // create axis
  const createAxis = (ctx: Context): false | void => {
    createGridBoxes(ctx, width, height)
  }

  // create grid scene
  const createGridScene = (ctx: Context, shape: Shape<ShapeConfig>): void => {
    ctx.beginPath()
    createAxis(ctx) // x & y
    ctx.closePath()

    ctx.fillStrokeShape(shape)
  }

  // render
  return (
    <Group>
      <ShapeK
        fill="#FFF"
        listening={false}
        stroke="#343434"
        strokeWidth={0.5}
        opacity={0.1}
        sceneFunc={createGridScene}
      />
    </Group>
  )
}

export default Grid
