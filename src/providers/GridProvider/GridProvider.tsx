import { createContext, useCallback, useMemo, useState } from 'react'

import type { AxisType } from '../../components/Grid/interfaces'
import type { GridContextProps, GridProviderProps } from './interfaces'
import type { Context } from 'konva/lib/Context'

// sizeBox context
const GridContext = createContext({} as GridContextProps)

// sizeBox provider
const GridProvider = ({ children, size = 15 }: GridProviderProps) => {
  const [pos, setPos] = useState([0, 0])
  const [sizeBox, setSizeBox] = useState(size)

  // fix position center
  const fixPositionCenter = useCallback(
    (value: number, sizeAxis: number, axis: number, sizeBox: number): number => 
    (Math.floor(value + (sizeAxis - Math.floor(axis * sizeBox)) / 2))
  , [])

  // create grid boxes
  const createGridBoxes = useCallback((ctx: Context, width: number, height: number): void => {
    const size = width > height ? width : height
    
    for (let i = 0; i < size / sizeBox; i++) {
      const x = (i * sizeBox)
      const y = (i * sizeBox)

      ctx.moveTo(x, 0)
      ctx.lineTo(x, size)

      ctx.moveTo(0, y)
      ctx.lineTo(size, y)
    }
  }, [sizeBox])

  // get cell
  const getCell = useCallback((x: number, y: number): AxisType | void => {
    const posX = Math.floor(x / sizeBox) * sizeBox
    const posY = Math.floor(y / sizeBox) * sizeBox

    return [posX, posY, sizeBox, posX, posY]
  }, [sizeBox])

  // set position click
  const setPosition = useCallback((value: number[]) => {
    const [x, y] = value

    const xPos = (Math.floor(x / size) * size)
    const yPos = (Math.floor(y / size) * size)

    setPos([xPos, yPos])
  }, [setPos, size])

  // render
  return (
    <GridContext.Provider
      value={useMemo(() => ({
        createGridBoxes,
        getCell,
        pos,
        sizeBox,
        setPos: setPosition,
        setSizeBox,
        fixPositionCenter,
      }), [
        createGridBoxes,
        getCell,
        pos,
        sizeBox,
        setPosition,
        setSizeBox,
        fixPositionCenter]
      )}
    >
      {children}
    </GridContext.Provider>
  )
}

export { GridContext, GridProvider }
export default GridProvider
