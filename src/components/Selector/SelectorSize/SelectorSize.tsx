import type { SelectorSizeProps } from './interfaces'
import * as S from './styles'

// selector size
const SelectorSize = ({
  onChangeValue,
  text = 'Size',
  value,
}: SelectorSizeProps) => (
  <S.SelectorSizeDiv>
    <S.SelectorSizeText>{text}</S.SelectorSizeText>

    <S.SelectorSizeContainer>
      <S.SelectorSizeInput
        type="number"
        onChange={(event) => {
          const { value = 0 } = event.currentTarget

          onChangeValue(Number(value))
        }}
        value={value}
      />
    </S.SelectorSizeContainer>
  </S.SelectorSizeDiv>
)

export default SelectorSize
