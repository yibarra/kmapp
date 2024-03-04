import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { scale, subtract } from '../../helpers/graphs'
import { UIContext } from '../UIProvider/UIProvider'
import type { ViewportContextProps, ViewportProviderProps } from './interfaces'

// Viewport Context
const ViewportContext = createContext({} as ViewportContextProps)

// Viewport Provider
const ViewportProvider = ({ children, drag, height, width }: ViewportProviderProps) => {
  const { isDragging, setIsDragging } = useContext(UIContext)
    
  // properties
  const [properties, setProperties] = useState({
    center: [width / 2, height / 2],
    drag,
    offset: scale([width / 2, height / 2], -1),
    zoom: 1,
  })

  // get mouse
  const getMouse = useCallback((offsetX: number, offsetY: number, subtractDragOffset = false) => {
    const p = [
      offsetX - properties.offset[0],
      offsetY - properties.offset[1]
    ]

   return subtractDragOffset ? subtract(p, properties.drag.offset) : p
  }, [properties])

  // on drag
  const onDrag = useCallback(() =>  setIsDragging(true), [setIsDragging])

  // on move
  const onMove = useCallback((offset: number[], event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent) => {
    if (isDragging && event.shiftKey) {
      console.info('auer', offset)
      setProperties((props) => ({
        ...props,
        drag: {
          ...props.drag,
        },
        offset
      }))
    }
  }, [isDragging, setProperties])

  // on move end
  const onMoveEnd = useCallback((offset: number[]) => {
    if (isDragging) {
      setIsDragging(false)

      setProperties((props) => ({
        ...props,
        drag: {
          ...props.drag,
        },
        offset
      }))
    }
  }, [isDragging, setIsDragging, setProperties])

  // render
  return (
    <ViewportContext.Provider
      value={useMemo(() => ({
        getMouse,
        properties,
        onDrag,
        onMove,
        onMoveEnd,
      }), [
        getMouse,
        properties,
        onDrag,
        onMove,
        onMoveEnd,
      ])}
    > 
      {children}
    </ViewportContext.Provider>
  )
}

export { ViewportContext, ViewportProvider }
export default ViewportProvider
