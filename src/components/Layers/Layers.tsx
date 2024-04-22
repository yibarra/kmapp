import { useContext } from 'react'
import { Group } from 'react-konva'

import Layer from '../Layer'
import { LayersContext } from '../../providers/LayersProvider'
import ViewportProvider from '../../providers/ViewportProvider/ViewportProvider'
import UseWindowSize from '../../hooks/useWindowSize'

// layers
const Layers = () => {
  const size = UseWindowSize()
  const { current, layers } = useContext(LayersContext)

  return (
    <Group>
      {Array.isArray(layers) && layers.map((layer, index) => (
        <ViewportProvider
          {...layer.drag}
          active={current === index}
          height={size.height}
          key={index}
          width={size.width}
        >
          <Layer
            {...layer}
            active={current === index}
            index={index}
            key={layer.id}
          />
        </ViewportProvider>
      ))}
    </Group>
  )
}

export default Layers
