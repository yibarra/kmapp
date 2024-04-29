import { useContext } from 'react'
import nextId from 'react-id-generator'

import { LayersContext } from '../../../providers/LayersProvider'
import { DataContext } from '../../../providers/DataProvider'

// main controls
const Main = () => {
  const { saveData } = useContext(DataContext)
  const { createLayer, layers } = useContext(LayersContext)

  return (
    <div>
      <button onClick={() => saveData(layers)}>
        save to local
      </button>
      <button
        onClick={() => {
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
        }}
      >create layer</button>
    </div>
  )
}

export default Main
