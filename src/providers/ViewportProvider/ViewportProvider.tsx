import { createContext, useCallback, useMemo, useState } from 'react'

import { scale, subtract } from '../../helpers/graphs'
import type { ViewportContextProps, ViewportProviderProps } from './interfaces'

// Viewport Context
const ViewportContext = createContext({} as ViewportContextProps)

// Viewport Provider
const ViewportProvider = ({ children, height, width }: ViewportProviderProps) => {
  // properties
  const [properties, setProperties] = useState({
    center: [width / 2, height / 2],
    drag: {
      offset: [0, 0],
      active: false
    },
    offset: scale([width / 2, height / 2], -1),
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
  const onDrag = useCallback(() =>  {
    setProperties((props) => ({
      ...props,
      drag: {
        ...props.drag,
        active: true
      }
    }))
  }, [setProperties])

  // on move
  const onMove = useCallback((offset: number[], event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent) => {
    if (properties.drag.active && event.shiftKey) {
      setProperties((props) => ({
        ...props,
        drag: {
          ...props.drag,
          offset
        }
      }))
    }
  }, [properties.drag, setProperties])

  // on move end
  const onMoveEnd = useCallback((offset: number[]) => {
    if (properties.drag.active) {
      setProperties((props) => ({
        ...props,
        drag: {
          ...props.drag,
          active: false,
        },
        offset: getMouse(offset[0], offset[1])
      }))
    }
  }, [getMouse, properties, setProperties])

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
