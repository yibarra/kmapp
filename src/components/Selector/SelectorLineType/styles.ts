import styled, { keyframes } from 'styled-components'

const inOption = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

export const SelectorLineTypeDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-flow: column nowrap;
  justify-content: center;

  > div {
    width: 40px;
  }
`

export const SelectorLineTypeItemDiv = styled.div<{ active: string }>`
  animation: ${inOption} 0.3s cubic-bezier(0.4, 0, 1, 1) 1 forwards;
  align-items: center;
  display: none;
  justify-content: center;
  width: 40px;

  ${({ active }) => active === 'true' ? `display: flex;` : ''}
`

export const SelectorLineTypeIconJoin = styled.div<{ type: string }>`
  background-color: transparent;
  display: flex;
  height: 30px;
  position: relative;
  top: 5px;
  width: 40px;

  span,
  &:before,
  &:after {
    background-color: #333;
    border: 1px solid #333;
    content: '';
    height: 20px;
    position: absolute;
    top: 0;
    width: 6px;
  }

  span {
    border: none;
    background-color: #333;
    left: 50%;
    height: 8px;
    top: 0;
    transform: translate(-50%, 0px);
    top: -2px;
    width: 8px;
    z-index: 1;

    &:before {
      background-color: #FFF;
      border: none;
      border-radius: 100%;
      content: '';
      height: 4px;
      left: 50%;
      position: absolute;
      top: calc(50% + 1px);
      transform: translate(-50%, -50%);
      width: 4px;
    }
  }

  &:before {
    left: 50%;
    transform: translate(-12px, 0) rotate(44deg);
  }

  &:after {
    left: 50%;
    transform: translate(4px, 0) rotate(-44deg);
  }

  ${({ type }) => {
    switch (type) {
      case 'miter':
        return `
          span {
            height: 7px;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            top: 2px;
            width: 7px;

            &:before {
              left: calc(50% + 1px);
              top: calc(50% + 1px);
              transform: translate(-50%, -50%);
              transform-origin: center;
            }
          }
        `
      case 'round':
        return `
          span {
            border-radius: 100%;
            left: 50%;
            height: 6px;
            top: -1px;
            transform: translate(-50%, 0px);
            width: 7px;
            z-index: 1;

            &:before {
              top: calc(50% + 2px);
            }
          }
        `
      case 'bevel':
      default:
        return `
          span {
            border: none;
            height: 5px;
            left: 50%;
            top: 0;
            width: 6px;

            &:before {
              top: calc(50% + 2px);
            }
          }
        `
    }
  }}
`

export const SelectorLineTypeIconCap = styled.div<{ type: string }>`
  background-color: #FFF;
  border: 5px solid #333;
  height: 0;
  margin: 10px 0;
  padding: 0;
  position: relative;
  width: 100%;

  &:before,
  &:after {
    background-color: #FFF;
    border: 1px solid #333;
    border-radius: 100%;
    content: '';
    height: 4px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 4px;
  }

  &:before {
    left: -2px;
  }

  &:after {
    right: -2px;
  }

  ${({ type }) => {
    switch (type) {
      case 'round':
        return `border-radius: 20px;`
      case 'butt':
        return `
          border-left-width: 0;
          border-right-width: 0;
          margin: 10px;
        `
      case 'square':
        default:
        return `
          border-left-width: 7px;
          border-right-width: 7px;
          margin: 10px 5px;
          `
    }
  }}
`

export const SelectorLineContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  justify-content: flex-start;
`

export const SelectorLineText = styled.p`
  display: flex;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  margin: 0;
  position: relative;
  width: 100%;
`

