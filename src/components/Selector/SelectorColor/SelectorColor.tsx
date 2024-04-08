import { useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import UseClickOutSide from '../../../hooks/useClickOutSide'
import type { SelectorColorProps } from './interfaces'
import * as S from './styles'

// selector color
const SelectorColor= ({
  color,
  radius = false,
  setColor,
  text = 'Color',
  variation = 'default',
}: SelectorColorProps) => {
  const element = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  UseClickOutSide(element, () => setIsOpen(false), '')

  // get type
  const getType = (variation: string) => {
    switch (variation) {
      case 'line':
        return { backgroundColor: color, borderColor: 'transparent' }
      
      case 'border':
        return { borderColor: color }
        
      case 'default':
      default:
        return { backgroundColor: 'transparent', borderColor: color }
    }
  }

  // render
  return (
    <S.SelectorColorDiv type={variation}>
      <S.SelectorColorText>{text}</S.SelectorColorText>

      <S.SelectorColorButton
        radius={radius.toString()}
        onClick={() => setIsOpen(!isOpen)}
        style={getType(variation)}
      />
      
      {isOpen && (
        <S.SelectorColorPopOver ref={element} radius={radius.toString()}>
          <HexColorPicker color={color} onChange={setColor} />
        </S.SelectorColorPopOver>
      )}
    </S.SelectorColorDiv>
  );
}

export default SelectorColor