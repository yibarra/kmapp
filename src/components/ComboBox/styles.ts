import styled from 'styled-components'

export const ComboBoxDiv = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  vertical-align: top;
`

export const ComboBoxButton = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: none;
  height: 10px;
  outline: none;
  position: relative;
  width: 100%;

  i {
    font-size: 14px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
