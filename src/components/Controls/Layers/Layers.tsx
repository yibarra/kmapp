import { useContext } from 'react'

import { LayersContext } from '../../../providers/LayersProvider'
import * as S from './styles'

// layers
const Layers = () => {
  const { layers, setCurrent } = useContext(LayersContext)

  // render
  return (
    <S.LayersWrapper>
      {Array.isArray(layers) && layers.map((layer, index) => (
        <button key={index} onClick={() => setCurrent(index)}>Layer {index}</button>
      ))}
    </S.LayersWrapper>
  )
}

export default Layers
