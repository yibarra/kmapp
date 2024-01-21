import { useContext } from 'react'
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import { GridContext } from '../../../providers/GridProvider/GridProvider'
import { ViewportContext } from '../../../providers/ViewportProvider/ViewportProvider'
import Grid from '../../../components/Grid'
import Layers from '../../../components/Layers/Layers'
import type { StageProps } from './interfaces'
import * as S from './styles'

// stage
const Stage = ({ size }: StageProps) => {
  const { createGridBoxes } = useContext(GridContext)
  const { bindEvents } = useContext(ViewportContext)

  // render
  return (
    <S.StageWrapper {...bindEvents()}>
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
    </S.StageWrapper>
  )
}

export default Stage
