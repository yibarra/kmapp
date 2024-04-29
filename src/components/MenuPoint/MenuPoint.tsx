import { useContext } from 'react'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'

import * as S from './styles'

// menu point
const MenuPoint = () => {
  const { layers, current = 0, createLayerCurve } = useContext(LayersContext)

  const layer = Number.isInteger(current) ? layers[current ?? 0] : null

  if (!layer) {
    return null
  }

  const offset = layers[current ?? 0].drag?.offset ?? [0, 0]
  const point = layer.points[layer.currentPoint]

  // create curve
  const createCurve = () => {
    const layer = layers[current ?? 0]

    if (layer.points && layer.points.length > 2) {
      const currentPoint = layer.points[layer.currentPoint]

      if (currentPoint.position > 0 && currentPoint.position < layer.points.length - 1) {
        const init = layer.points[currentPoint.position - 1]
        const end = layer.points[currentPoint.position + 1]

        createLayerCurve(init, end, currentPoint)
      }
    } else {
      console.info('NO SE PUDO CREAR LA CURVA PORQUE NO HAY SUFICINENTES PUNTOS')
    }
  }

  // render
  return (
    <>
      {point && (
        <S.MenuPointDiv
          style={{
            left: point.x + offset[0],
            top: point.y + offset[1]
          }}
        >
          <button
            onClick={() => createCurve()}
          >cc</button>
          <button>at</button>
          <button>ai</button>
          <button>h - v</button>
        </S.MenuPointDiv>
      )}
    </>
  )
}

export default MenuPoint
