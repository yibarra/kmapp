import { useRef } from 'react'
import * as S from './styles'

// combo box
const ComboBox = ({
  callback,
  children,
  max,
  min,
  value,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // on change value
  const onChangeValue = (typeOp?: string) => {
    if (inputRef.current) {
      if (typeOp === 'minus') {
        inputRef.current.stepDown()
      } else {
        inputRef.current.stepUp()
      }

      const inputEvent = new Event('input', { bubbles: true })
      inputRef.current.dispatchEvent(inputEvent)
    }
  }

  // render
  return (
    <S.ComboBoxDiv>
      <S.ComboBoxButton onClick={() => onChangeValue('minus')}>
        <i className="material-symbols-rounded">expand_less</i>
      </S.ComboBoxButton>

      <S.ComboBoxContainer>
        {children}
      </S.ComboBoxContainer>

      <S.ComboBoxButton onClick={() => onChangeValue('')}>
        <i className="material-symbols-rounded">expand_more</i>
      </S.ComboBoxButton>

      <S.ComboInput
        type="number"
        ref={inputRef}
        onInput={(event) => {
          if (typeof callback === 'function') {
            callback(Number(event.currentTarget.value))
          }
        }}
        step={1}
        min={min}
        max={max}
        value={value}
      />
    </S.ComboBoxDiv>
  )
}

export default ComboBox