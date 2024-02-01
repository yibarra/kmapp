import { Group, Shape as ShapeK } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape, ShapeConfig } from 'konva/lib/Shape'

import type { GridProps } from './interfaces'
import { useContext } from 'react'
import { GridContext } from '../../providers/GridProvider/GridProvider'

// grid
const Grid = ({ createGridBoxes, width, height }: GridProps) => {
  const { pos, sizeBox } = useContext(GridContext)

  // create axis
  const createAxis = (ctx: Context): false | void => {
    createGridBoxes(ctx, width, height)
  }

  // create grid scene
  const createGridScene = (ctx: Context, shape: Shape<ShapeConfig>): void => {
    ctx.beginPath()
    createAxis(ctx) // x & y
    ctx.closePath()

    ctx.fillRect(pos[0], pos[1], sizeBox, sizeBox)
    shape.fill('#555')

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
