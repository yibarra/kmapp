import { useState } from 'react'

import * as S from './styles'
import ComboBox from '../../ComboBox'

const HEIGHT_MAX = 7

// selector size
const SelectorSize = ({
  fill,
  strokeColor,
  onChangeValue,
  value,
  variant = 'line'
}: any) => {
  const [current, setCurrent] = useState<number>(0)

  // render
  return (
    <S.SelectorSizeDiv>
      <ComboBox
        callback={(value: number) => {
          setCurrent(value)
          onChangeValue(value)
        }}
        max={10}
        min={3}
        value={current}
      >
        <S.SelectorSizeContainer
          style={
            {height: variant === 'line' ? HEIGHT_MAX : 30}
          }
        >
          {variant === 'line'
            ? <S.SelectorSizeIconDiv
                style={{
                  backgroundColor: strokeColor,
                  height: value > HEIGHT_MAX ? HEIGHT_MAX : value
                }}
              />
            : <S.SelectorSizeIconBlockDiv
                style={{
                  backgroundColor: variant !== 'border' ? fill: 'transparent',
                  borderColor: variant === 'border' ? fill : 'transparent',
                  borderWidth: variant === 'border' ? (value / 100) * 40 : 0,
                  transform: variant !== 'border' ? `scale(${(value / 100) * 20})` : ''
                }}
                variant={variant}
              />
          }
        </S.SelectorSizeContainer>
      </ComboBox>
    </S.SelectorSizeDiv>
  )
}

export default SelectorSize
