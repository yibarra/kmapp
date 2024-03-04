import { useCallback } from 'react'
import SelectorDashItem from './SelectorDashItem'

import * as S from './styles'

// selector dash
const SelectorDash = ({ properties, updateDashProperty }: any) => {
  // on change dash
  const onChangeDash = useCallback((value: number, type: string) => {
    const dash = (type === 'gap')
      ? [properties.dash[0], value]
      : [value, properties.dash[1]]

      updateDashProperty(properties, dash)
  }, [ properties, updateDashProperty ])

  // render
  return (
    <>
      {Array.isArray(properties.dash) &&
        <S.SelectorDashDiv>
          <SelectorDashItem
            max={10}
            min={0}
            onChangeDash={onChangeDash}
            value={properties.dash[0]}
          />

          <SelectorDashItem
            max={10}
            min={0}
            onChangeDash={onChangeDash}
            type="gap"
            value={properties.dash[1]}
          />
        </S.SelectorDashDiv>
      }
    </>
  )
}

export default SelectorDash
/*
<input
        name="dash0"
        type="number"
        defaultValue="0"
        onChange={(e) => updateLayer(index, { pointsProperties: {
          ...layer.pointsProperties,
          dash: [e.target.value, layer.pointsProperties.dash[1]]
        }})}
      />

      <input
        name="dash1"
        type="number"
        defaultValue="0"
        onChange={(e) => updateLayer(index, { pointsProperties: {
          ...layer.pointsProperties,
          dash: [layer.pointsProperties.dash[0], e.target.value]
        }})}
      />
      */


