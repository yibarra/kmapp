import React, { useState } from 'react'

import type { SelectorLineTypeProps } from './interfaces'
import * as S from './styles'

// selector line type
const SelectorLineType: React.FC<SelectorLineTypeProps> = ({
  defaultValue = 0,
  items,
  onChangeValue,
  variant = 'join'
}) => {
  const [current, setCurrent] = useState(defaultValue)

  // render
  return (
    <S.SelectorLineTypeDiv>
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
    </S.SelectorLineTypeDiv>
  )
}

export default SelectorLineType