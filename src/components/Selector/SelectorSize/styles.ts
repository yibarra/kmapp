import styled from 'styled-components'

export const SelectorSizeDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-flow: row wrap;
  position: relative;
`

export const SelectorSizeContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

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

export const SelectorSizeText = styled.p`
  display: flex;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  margin: 0;
  position: relative;
  width: 100%;
`

export const SelectorSizeInput = styled.input`
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
