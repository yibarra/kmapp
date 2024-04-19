import styled from 'styled-components'

export const LayersWrapper = styled.div`
  align-items: flex-start;
  background-color: #FFF;
  border: 3px solid #222;
  border-radius: 8px;
  display: flex;
  flex-flow: column wrap;
  min-height: calc(100svh - 6px);
  justify-content: flex-start;
  left: initial;
  right: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 320px;
  z-index: 10;
`
