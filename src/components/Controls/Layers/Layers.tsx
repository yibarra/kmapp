import { useContext } from 'react'

import { LayersContext } from '../../../providers/LayersProvider'
import * as S from './styles'
import Item from './Item'

// layers
const Layers = () => {
  const { current, layers, setCurrent, updateLayer } = useContext(LayersContext)

  // render
  return (
    <S.LayersWrapper>
      {Array.isArray(layers) && layers.map((layer, index) => (
        <Item
          layer={layer}
          current={current === index}
          index={index}
          setCurrent={setCurrent}
          updateLayer={updateLayer}
          key={index}
        />
      ))}
    </S.LayersWrapper>
  )
}

export default Layers
