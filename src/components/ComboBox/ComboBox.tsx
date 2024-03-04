import React, { useCallback } from 'react'

import * as S from './styles'

// combo box
const ComboBox: React.FC<any> = ({
  callback,
  children,
  max,
  min,
  value,
}) => {
  // on change value
  const onChangeValue = useCallback((typeOp?: string) => {
    let val
    
    if (typeOp === 'minus') {
      val = min > value - 1 ? min : value - 1
    } else {
      val = max < value + 1 ? max : value + 1
    }

    callback(val)
  }, [callback, max, min, value])

  // render
  return (
    <S.ComboBoxDiv>
      <S.ComboBoxButton onClick={() => onChangeValue()}>
        <i className="material-symbols-rounded">expand_less</i>
      </S.ComboBoxButton>

      {children}

      <S.ComboBoxButton onClick={() => onChangeValue('minus')}>
        <i className="material-symbols-rounded">expand_more</i>
      </S.ComboBoxButton>
    </S.ComboBoxDiv>
  )
}

export default ComboBox