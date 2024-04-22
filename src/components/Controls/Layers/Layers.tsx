import { useContext } from 'react'
import nextId from 'react-id-generator'

import { LayersContext } from '../../../providers/LayersProvider'
import * as S from './styles'
import Item from './Item'

// layers
const Layers = () => {
  const { current, createLayer, layers, setCurrent, updateLayer } = useContext(LayersContext)

  // render
  return (
    <>
      <S.LayersWrapper>
        {Array.isArray(layers) && layers.map((layer, index) => (
          <Item
            active={current === index}
            layer={layer}
            current={current}
            index={index}
            setCurrent={setCurrent}
            updateLayer={updateLayer}
            key={index}
          />
        ))}
        <button onClick={() => {
          createLayer({
            id: nextId('layer-'),
            name: `New Layer ${layers.length}`,
            currentPoint: 0,
            curves: [],
            lineProperties: {
              border: '#222333',
              dash: [0, 0],
              lineCap: 'butt',
              lineJoin: 'miter',
              stroke: '#FF844F',
              strokeWidth: 2,
              tension: 0,
            },
            pointsProperties: {
              active: '#341341',
              dash: [5, 5],
              fill: '#987443',
              lineCap: 'butt',
              lineJoin: 'miter',
              radius: 5,
              stroke: '#209479',
              strokeWidth: 2,
            },
            points: []
          })
        }}>create layer</button>
      </S.LayersWrapper>
    </>
  )
}

export default Layers
