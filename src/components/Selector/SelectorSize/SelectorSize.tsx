import { useState } from 'react'

import * as S from './styles'

const HEIGHT_MAX = 7

// selector size
const SelectorSize = ({
  fill,
  onChangeValue,
  value,
  variant = 'line'
}: any) => {
  const [current, setCurrent] = useState(value)

  console.info(value, '-0---')

  // render
  return (
    <S.SelectorSizeDiv>
      <S.SelectorSizeContainer
        style={
          {height: variant === 'line' ? HEIGHT_MAX : 30}
        }
      >
        <div>{current}</div>

        <S.SelectorSizeIconBlockDiv
          style={{
            backgroundColor: variant !== 'border' ? fill: 'transparent',
            borderColor: variant === 'border' ? fill : 'transparent',
            borderWidth: variant === 'border' ? (value / 100) * 40 : 0,
            transform: variant !== 'border' ? `scale(${(value / 100) * 20})` : ''
          }}
          variant={variant}
        />
      </S.SelectorSizeContainer>
    </S.SelectorSizeDiv>
  )
}

export default SelectorSize
