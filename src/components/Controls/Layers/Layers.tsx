import { useContext } from 'react'

import { LayersContext } from '../../../providers/LayersProvider'
import { UIContext } from '../../../providers/UIProvider/UIProvider'
import Item from './Item'
import * as S from './styles'

// layers
const Layers = () => {
  const {
    current,
    layers,
    setCurrent,
    updateLayer
  } = useContext(LayersContext)

  const { enable, setEnable } = useContext(UIContext)

  // render
  return (
    <>
      <S.LayersWrapper>
        {Array.isArray(layers) && layers.map((layer, index) => (
          <Item
            active={current === index}
            layer={layer}
            current={current}
            enable={enable}
            index={index}
            setCurrent={setCurrent}
            updateLayer={updateLayer}
            setEnable={setEnable}
            key={index}
          />
        ))}
        
      </S.LayersWrapper>
    </>
  )
}

export default Layers
