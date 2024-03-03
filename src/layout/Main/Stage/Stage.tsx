import { useContext } from 'react'
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import Grid from '../../../components/Grid'
import Layers from '../../../components/Layers/Layers'
import { GridContext } from '../../../providers/GridProvider/GridProvider'
import type { StageProps } from './interfaces'
import * as S from './styles'

// stage
const Stage = (props: StageProps) => {
  const { createGridBoxes } = useContext(GridContext)

  // render
  return (
    <S.StageWrapper>
      <StageKonva
        {...props}
        className="stage"
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
