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
  const { createGridBoxes, setPos } = useContext(GridContext)
  const { onDrag, onMove, onMoveEnd } = useContext(ViewportContext)

  // bind events
  const bind = useGesture(
    {
      onClick: ({ event }) => setPos([event.clientX, event.clientY], [event.view?.innerWidth ?? 0, event.view?.innerHeight ?? 0]),
      onDrag: ({ event, offset }) => onMove(offset, event),
      onDragEnd: ({ delta }) => onMoveEnd(delta),
      onDragStart: () => onDrag(),
    }
  )

  // render
  return (
    <S.StageWrapper {...bind()}>
      <StageKonva
        className="stage"
        height={size.height}
        tabIndex={0}
        width={size.width}
      >
        <LayerKonva>
          <Grid {...size} createGridBoxes={createGridBoxes} />

          <Layers />
        </LayerKonva>
      </StageKonva>
    </S.StageWrapper>
  )
}

export default Stage
