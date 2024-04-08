import styled from 'styled-components'

export const SelectorColorDiv = styled.div<{ type?: string }>`
  display: flex;
  gap: 8px;
  flex-flow: row wrap;
  position: relative;
  vertical-align: top;
`
  
export const SelectorColorButton = styled.button<{ radius?: string, variation?: string }>`
  height: 24px;
  outline: none;
  width: 24px;

  ${({ radius }) => (radius === 'true' ? 'border-radius: 100%;' : '')}

  ${({ variation }) => {
    switch (variation) {
      case 'border':
        return 'background-color: transparent; border: 4px solid;'
      
      case 'line':
        return 'border: none;'
      
      default:
        return 'background-color: transparent; border: none; border: 3px solid;'
    }
  }}
`

export const SelectorColorPopOver = styled.div<{ radius?: string }>`
  bottom: calc(100% + 10px);
  border: 3px solid #333;
  border-radius: 6px;

  .react-colorful {
    height: 140px;
    width: 140px;

    &__hue {
      border-radius: 0;
      height: 10px;

      &-pointer {
        border-radius: 0;
        height: 12px;
        width: 12px;
      }
    }

    &__saturation {
      border-radius: 0;

      &-pointer {
        border-radius: 0;
        height: 18px;
        width: 18px;
      }
    }

    ${({ radius }) => 
      radius === 'true' ? '.react-colorful { &__hue { &-pointer { border-radius: 100%; }} &__saturation { &-pointer { border-radius: 100%; } } }' : ''}
  }
`

export const SelectorColorText = styled.p`
  display: flex;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  margin: 0;
  position: relative;
  width: 100%;
`
