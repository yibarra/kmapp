import { createContext, useCallback, useMemo } from 'react'

import { scale, subtract } from '../../helpers/graphs'
import type { ViewportContextProps, ViewportProviderProps } from './interfaces'

// Viewport Context
const ViewportContext = createContext({} as ViewportContextProps)

// Viewport Provider
const ViewportProvider = ({ children, height, offset = [0, 0], width }: ViewportProviderProps) => {    
  // properties
  const properties = useMemo(() => ({
    center: [width / 2, height / 2],
    drag: {
      offset: scale(offset, -1),
    },
    zoom: 1,
  }), [offset, height, width])

  // get mouse
  const getMouse = useCallback((offsetX: number, offsetY: number, subtractDragOffset = false) => {
    const p = [
      offsetX - properties.drag.offset[0],
      offsetY - properties.drag.offset[1]
    ]

   return subtractDragOffset ? subtract(p, properties.drag.offset) : p
  }, [properties])

  // render
  return (
    <ViewportContext.Provider
      value={useMemo(() => ({
        getMouse,
        properties,
      }), [
        getMouse,
        properties,
      ])}
    > 
      {children}
    </ViewportContext.Provider>
  )
}

export { ViewportContext, ViewportProvider }
export default ViewportProvider
