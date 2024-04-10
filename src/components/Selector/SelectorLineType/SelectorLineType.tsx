import { useState } from 'react'

import type { SelectorLineTypeProps } from './interfaces'
import * as S from './styles'
import ComboBox from '../../ComboBox'

// selector line type
const SelectorLineType = ({
  defaultValue = 0,
  items,
  onChangeValue,
  title,
  variant = 'join'
}: SelectorLineTypeProps) => {
  const [current, setCurrent] = useState(defaultValue)

  // render
  return (
    <S.SelectorLineTypeDiv>
      <S.SelectorLineText>{title}</S.SelectorLineText>

      <ComboBox
        callback={(value: any) => {
          onChangeValue(items[current].name)
          setCurrent(value)
        }}
        max={items.length - 1}
        min={0}
        value={current}
      >
        {items.map(({ name }: any, index: number) =>
          <S.SelectorLineTypeItemDiv active={String(current === index)} key={index}>
            {(variant === 'join')
              ? <S.SelectorLineTypeIconJoin typeLine={name}>
                  <span></span>
                </S.SelectorLineTypeIconJoin>
              : <S.SelectorLineTypeIconCap typeLine={name} />
            }
          </S.SelectorLineTypeItemDiv>
        )}
      </ComboBox>
    </S.SelectorLineTypeDiv>
  )
}

export default SelectorLineType