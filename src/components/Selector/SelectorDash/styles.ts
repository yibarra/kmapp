import styled from 'styled-components'

export const SelectorDashDiv = styled.div`
  align-items: center;
  border-radius: 15px;
  display: inline-flex;
  justify-content: center;
  outline: dashed #333 4px;
  outline-offset: -15px;
  padding: 0;
  margin: 0 -10px;
  position: relative;
  width: auto;

  > div {
    width: 20px;

    &:first-child {
      margin-left: 10px;
      padding-left: 5px;
    }

    &:last-child {
      margin-right: 10px;
      padding-right: 5px;
    }
  }
`
