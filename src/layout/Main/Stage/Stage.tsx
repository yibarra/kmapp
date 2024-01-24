import { useContext } from 'react'
import { useGesture } from '@use-gesture/react'
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
  const { onDrag, onMove, onMoveEnd, onZoom } = useContext(ViewportContext)

  // bind events
  const bind = useGesture(
    {
      onWheel: ({ direction: [, dirY] }) => onZoom(dirY),
      onDrag: ({ event, offset: [x, y] }) => onMove(x, y, event),
      onDragEnd: () => onMoveEnd(),
      onDragStart: ({ offset: [x, y] }) => onDrag(x, y),
    }
  )

  // render
  return (
    <S.StageWrapper {...bind()}>
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
