import { useContext } from 'react'
import { Group } from 'react-konva'

import Layer from '../Layer'
import { LayersContext } from '../../providers/LayersProvider'
import ViewportProvider from '../../providers/ViewportProvider/ViewportProvider'
import UseWindowSize from '../../hooks/useWindowSize'

const Layers = () => {
  const size = UseWindowSize()
  const { current, layers } = useContext(LayersContext)

  return (
    <Group>
      {Array.isArray(layers) && layers.map((layer, index) => (
        <ViewportProvider
          drag={layer.drag}
          height={size.height}
          width={size.width}
          key={index}
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
