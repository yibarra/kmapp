import { useContext } from 'react'
import { Group } from 'react-konva'

import { LayersContext } from '../../providers/LayersProvider'
import Layer from '../Layer'

const Layers = () => {
  const { current, layers } = useContext(LayersContext)

  return (
    <Group>
      {Array.isArray(layers) && layers.map((layer, index) => (
        <Layer
          {...layer}
          active={current === index}
          index={index}
          key={index}
        />
      ))}
    </Group>
  )
}

export default Layers
