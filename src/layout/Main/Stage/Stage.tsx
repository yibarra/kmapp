import { useContext } from 'react'
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import { GridContext } from '../../../providers/GridProvider/GridProvider'
import Grid from '../../../components/Grid'
import Layers from '../../../components/Layers/Layers'

import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { StageProps } from './interfaces'

// stage
const Stage = ({ size }: StageProps) => {
  const { createGridBoxes } = useContext<GridContextProps>(GridContext)

  // render
  return (
    <StageKonva
      className="stage"
      tabIndex={0}
      height={size.height}
      width={size.width}
    >
      <LayerKonva>
        <Grid createGridBoxes={createGridBoxes} {...size} />

        <Layers />
      </LayerKonva>
    </StageKonva>
  )
}

export default Stage
