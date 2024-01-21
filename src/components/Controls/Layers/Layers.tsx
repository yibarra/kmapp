import { useContext } from 'react'

import { LayersContext } from '../../../providers/LayersProvider'
import { ViewportContext } from '../../../providers/ViewportProvider/ViewportProvider'
import * as S from './styles'

// layers
const Layers = () => {
  const { layers, setCurrent } = useContext(LayersContext)
  const { properties } = useContext(ViewportContext)

  console.info(properties, '*******')

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
