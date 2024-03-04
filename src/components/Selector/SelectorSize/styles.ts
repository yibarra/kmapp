import styled from 'styled-components'

export const SelectorSizeDiv = styled.div`
  display: flex;
  position: relative;
  width: 30px;

  > div {
    width: 100%;
  }
`

export const SelectorSizeContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`

export const SelectorSizeIconDiv = styled.div`
  display: flex;
  margin: 0;
  transition: all 400ms ease-in;
  width: 100%;
`

export const SelectorSizeIconBlockDiv = styled.div<{ variant?: string }>`
  height: 15px;
  width: 15px;

  ${( { variant }) => {
    switch(variant) {
      case 'border':
      default:
        return 'border-style: solid; height: 12px; width: 12px;'
    }
  }}
`
