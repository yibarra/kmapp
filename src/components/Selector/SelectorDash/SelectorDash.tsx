import { useCallback } from 'react'
import SelectorDashItem from './SelectorDashItem'

import * as S from './styles'
import type { SelectorDashProps } from './interfaces'

// selector dash
const SelectorDash = ({ properties, updateDashProperty }: SelectorDashProps) => {
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
          <S.SelectorDashText>Dash</S.SelectorDashText>

          <S.SelectorDashContainer>
            <SelectorDashItem
              max={10}
              min={0}
              type="default"
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
          </S.SelectorDashContainer>
        </S.SelectorDashDiv>
      }
    </>
  )
}

export default SelectorDash
