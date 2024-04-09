import React, { useState } from 'react'

import type { SelectorLineTypeProps } from './interfaces'
import * as S from './styles'

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

      <S.SelectorLineContainer>
        {items.map(({ name = '' }, index: number) =>
          <S.SelectorLineTypeItemDiv
            active={String(current === index)}
            onClick={() => {
              onChangeValue(name)
              setCurrent(index)
            }}
            key={index}
          >
            {(variant === 'join')
              ? <S.SelectorLineTypeIconJoin type={name}>
                  <span></span>
                </S.SelectorLineTypeIconJoin>
              : <S.SelectorLineTypeIconCap type={name} />
            }
          </S.SelectorLineTypeItemDiv>
        )}
      </S.SelectorLineContainer>
    </S.SelectorLineTypeDiv>
  )
}

export default SelectorLineType