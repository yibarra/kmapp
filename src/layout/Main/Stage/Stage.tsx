import { useContext } from 'react'
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import Grid from '../../../components/Grid'
import Layers from '../../../components/Layers/Layers'
import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { LayersContext } from '../../../providers/LayersProvider'
import type { StageProps } from './interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'
import * as S from './styles'

// stage
const Stage = (props: StageProps) => {
  const { createGridBoxes } = useContext(GridContext)
  const {
    createLayerPoint,
    current,
    layers,
  } = useContext(LayersContext)

  // create point layer active
  const createPoint = (event: KonvaEventObject<MouseEvent>) => {
    event.cancelBubble = true

    const count = Number(layers[current ?? 0].points.length)
    const offset = layers[current ?? 0].drag?.offset ?? [0, 0]
    const position = (count + 1) - 1
    const values = {
      x: event.evt.clientX - offset[0],
      y: event.evt.clientY - offset[1]
    }
    
    if (values) {
      createLayerPoint(
        position,
        {
          ...values,
          position,
        }
      )
    }
  }

  // render
  return (
    <S.StageWrapper>
      <StageKonva
        {...props}
        className="stage"
        onClick={createPoint}
        tabIndex={0}
      >
        <LayerKonva>
          <Grid {...props} createGridBoxes={createGridBoxes} />

          <Layers />
        </LayerKonva>
      </StageKonva>
    </S.StageWrapper>
  )
}

export default Stage
