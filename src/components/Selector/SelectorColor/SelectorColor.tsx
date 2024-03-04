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
  variation = 'default',
}: SelectorColorProps) => {
  const element = useRef<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  UseClickOutSide(element, () => setIsOpen(false), '')

  // get type
  const getType = (variation: string) => {
    switch (variation) {
      case 'line':
        return { backgroundColor: color, height: 3 }
      
      case 'border':
        return { borderColor: color }
        
      case 'default':
      default:
        return { backgroundColor: color }
    }
  }

  // render
  return (
    <S.SelectorColorDiv type={variation}>
      <S.SelectorColorButton
        radius={radius.toString()}
        onClick={() => setIsOpen(!isOpen)}
        style={getType(variation)}
        variation={variation}
      />
      
      {isOpen && (
        <S.SelectorColorPopOver ref={element} radius={radius.toString()}>
          <HexColorPicker color={color} onChange={setColor} />

          <S.SelectorColorArrow></S.SelectorColorArrow>
        </S.SelectorColorPopOver>
      )}
    </S.SelectorColorDiv>
  );
}

export default SelectorColor