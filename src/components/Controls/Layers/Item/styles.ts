import styled from 'styled-components'

export const ControlsLayerPropertiesTitle = styled.p`
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  margin: 8px 0;
  width: 100%;
`

export const ControlsLayerProperties = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  width: 100%;
`

export const ControlsLayersItemDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  vertical-align: top;
`

export const ControlsLayersItemContainer = styled.div<{ toggle: string }>`
  display: flex;
  flex-flow: column nowrap;
  max-height: 0;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.15s ease-out;
  width: 100%;

  ${({ toggle }) => {
    switch (toggle) {
      case 'true':
        return 'max-height: 600px; padding: 10px; transition: max-height 0.25s ease-in; overflow: initial;'
    }
  }}
`

export const ControlsLayersItemHeaderDiv = styled.div`
  display: flex;
  width: 100%;
`

