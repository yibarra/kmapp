import { useContext } from 'react'

import { DataContext } from '../../providers/DataProvider'
import { LayersContext, LayersProvider } from '../../providers/LayersProvider'
import { UIContext } from '../../providers/UIProvider/UIProvider'
import Layer from '../Layer'
import type { LayersProvidersProps } from '../../providers/LayersProvider/interfaces'
import { Group } from 'react-konva'

const LayersContainer = () => {
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

const Layers = () => {
  const { data } = useContext(DataContext)
  const { enable, remove } = useContext(UIContext)

  const values = data as LayersProvidersProps['data']['layers']

  return (
    <LayersProvider data={{ layers: values }} enable={enable} remove={remove}>
      <LayersContainer />
    </LayersProvider>
  )
}

export default Layers
