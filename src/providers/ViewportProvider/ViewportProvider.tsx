import { createContext, useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import type { Context } from 'konva/lib/Context'

import { add, scale, subtract } from '../../helpers/graphs'
import type { ViewportContextProps, ViewportProviderProps } from './interfaces'

// Viewport Context
const ViewportContext = createContext({} as ViewportContextProps)

// Viewport Provider
const ViewportProvider = ({ children, height, width }: ViewportProviderProps) => {
  // properties
  const properties = useRef({
    center: [width / 2, height / 2],
    drag: {
      start: [0, 0],
      end: [0, 0],
      offset: [0, 0],
      active: false
    },
    offset: scale([width / 2, height / 2], -1),
    zoom: 1,
  })

  // get mouse
  const getMouse = (offsetX: number, offsetY: number) => ([
    (offsetX * properties.current.zoom) - properties.current.offset[0],
    (offsetY * properties.current.zoom) - properties.current.offset[1]
  ])

  // get off set
  const getOffset = () => (add(properties.current.offset, properties.current.drag.offset))

  // reset
  const reset = (context: Context) => {
    context.restore()
    context.clearRect(0, 0, width, height)
    context.save()
    context.translate(properties.current.center[0], properties.current.center[1])
    context.scale(1 / properties.current.zoom, 1 / properties.current.zoom)

    const offset = getOffset()

    if (Array.isArray(offset)) {
      context.translate(offset[0], offset[1])
    }
  }

  // on drag
  const onDrag = (offsetX: number, offsetY: number) =>  {
    properties.current.drag.start = getMouse(offsetX, offsetY)
    properties.current.drag.active = true
  }

  // on move
  const onMove = (offsetX: number, offsetY: number) => {
      if (properties.current.drag.active) {
        properties.current.drag.end = getMouse(offsetX, offsetY)
        properties.current.drag.offset = subtract(properties.current.drag.end, properties.current.drag.start)
      }
  }

  // on move end
  const onMoveEnd = () => {
    if (properties.current.drag.active) {
      properties.current.offset = add(properties.current.offset, properties.current.drag.offset)

      properties.current.drag = {
        start: [0, 0],
        end: [0, 0],
        offset: [0, 0],
        active: false,
      }
    }
  }

  // on zoom
  const onZoom = (direction: number) => {
    const dir = Math.sign(direction)
    const value = properties.current.zoom + dir * 0.1

    properties.current.zoom =  Math.max(1, Math.min(5, value))
  }

  // bind events
  const bindEvents = useGesture(
    {
      onWheel: ({ direction: [, y] }) => onZoom(y),
      onDragStart: ({ offset: [x, y] }) => onDrag(x, y),
      onDrag: ({ offset: [x, y] }) => onMove(x, y),
      onDragEnd: () => onMoveEnd(),
    }
  )

  // render
  return (
    <ViewportContext.Provider
      value={{
        bindEvents,
        getMouse,
        properties,
        onDrag,
        onMove,
        onMoveEnd,
        onZoom,
        reset,
      }}
    > 
      {children}
    </ViewportContext.Provider>
  )
}

export { ViewportContext, ViewportProvider }
export default ViewportProvider
