import { useContext } from 'react'
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { DataProvider } from '../../../providers/DataProvider'
import Grid from '../../../components/Grid'
import Layers from '../../../components/Layers/Layers'

import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { StageProps } from './interfaces'
import { dataLayers } from '../../../components/Layers/data'

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

        <DataProvider name="kmapp.layers" data={dataLayers.layers}>
          <Layers />
        </DataProvider>
      </LayerKonva>
    </StageKonva>
  )
}

export default Stage
