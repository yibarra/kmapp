import styled from 'styled-components'

export const ControlsLayersItemDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  vertical-align: top;
`

export const ControlsLayersItemContainer = styled.div<{ toggle: string }>`
  display: flex;
  flex-flow: row wrap;
  max-height: 0;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.15s ease-out;
  width: 100%;

  ${({ toggle }) => {
    switch (toggle) {
      case 'true':
        return 'max-height: 500px; padding: 10px; transition: max-height 0.25s ease-in; overflow: initial;'
    }
  }}
`

export const ControlsLayersItemHeaderDiv = styled.div`
  display: flex;
  width: 100%;
`

