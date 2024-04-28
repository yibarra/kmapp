import styled from 'styled-components'

export const RootButton = styled.button`
  align-items: center;
  background-color: #222;
  border: none;
  box-shadow: none;
  color: #fff;
  display: flex;
  justify-content: center;
  height: 40px;
  left: calc(100% - 320px);
  outline: none;
  padding: 0;
  position: absolute;
  top: 0;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 40px;
  user-select: none;
`

export const RootWrapper = styled.div`
  align-items: flex-start;
  background-color: #FFF;
  border: 1px solid #222;
  border-radius: 0 0 0 8px;
  display: flex;
  flex-flow: column wrap;
  min-height: 100svh;
  justify-content: flex-start;
  left: calc(100% - 280px);
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 280px;
  z-index: 10;

  &[data-open='true'] {
    left: 100%;

    & + button {
      left: calc(100% - 40px);
    }
  }
`
