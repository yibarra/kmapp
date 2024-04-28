import { useContext } from 'react'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'

import * as S from './styles'

const MenuPoint = () => {
  const { layers, current } = useContext(LayersContext)

  const layer = Number.isInteger(current) ? layers[current ?? 0] : null

  if (!layer) {
    return null
  }

  const offset = layers[current ?? 0].drag?.offset ?? [0, 0]
  const point = layer.points[layer.currentPoint]

  // render
  return (
    <>
      {point && (<S.MenuPointDiv
        style={{
          left: point.x + offset[0] ?? 0,
          top: point.y + offset[1] ?? 0
        }}
      >
        <button>cc</button>
        <button>at</button>
        <button>ai</button>
        <button>h - v</button>
      </S.MenuPointDiv>)}
    </>
  )
}

export default MenuPoint
