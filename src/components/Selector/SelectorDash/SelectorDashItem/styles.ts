import styled from 'styled-components'

export const SelectorDashItemP = styled.p`
  font-size: 12px;
  margin: 0;
  position: relative;

  &:before {
    border: 1px solid #222;
    border-radius: 2px;
    content: '';
    height: 0;
    left: 0;
    position: absolute;
    top: 100%;
    width: 24px;
  }
`

export const SelectorDashInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  outline: none;
  padding: 6px 0;
  position: relative;
  text-align: center;
  width: 24px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
