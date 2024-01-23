import { createContext, useCallback, useMemo, useState } from 'react'
import { useGesture } from '@use-gesture/react'
import type { Context } from 'konva/lib/Context'

import { add, scale, subtract } from '../../helpers/graphs'
import type { ViewportContextProps, ViewportProviderProps } from './interfaces'

// Viewport Context
const ViewportContext = createContext({} as ViewportContextProps)

// Viewport Provider
const ViewportProvider = ({ children, height, width }: ViewportProviderProps) => {
  // properties
  const [properties, setProperties] = useState({
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
  const getMouse = useCallback((offsetX: number, offsetY: number, subtractDragOffset = false) => {
    const p = [
      (offsetX * properties.zoom) - properties.offset[0],
      (offsetY * properties.zoom) - properties.offset[1]
    ]

   return subtractDragOffset ? subtract(p, properties.drag.offset) : p
  }, [properties])

  // get off set
  const getOffset = useCallback(() => add(properties.offset, properties.drag.offset), [properties])

  // reset
  const reset = useCallback((context: Context) => {
    context.restore()
    context.clearRect(0, 0, width, height)
    context.save()
    context.translate(properties.center[0], properties.center[1])
    context.scale(1 / properties.zoom, 1 / properties.zoom)

    const offset = getOffset()

    if (Array.isArray(offset)) {
      context.translate(offset[0], offset[1])
    }
  }, [getOffset, height, properties, width])

  // on drag
  const onDrag = useCallback((offsetX: number, offsetY: number) =>  {
    setProperties((props) => ({
      ...props,
      drag: {
        ...props.drag,
        start: getMouse(offsetX, offsetY),
        active: true
      }
    }))
  }, [getMouse, setProperties])

  // on move
  const onMove = useCallback((offsetX: number, offsetY: number, event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent) => {
    if (properties.drag.active && event.shiftKey) {
      setProperties((props) => ({
        ...props,
        drag: {
          ...props.drag,
          end: getMouse(offsetX, offsetY),
          offset: subtract(props.drag.end, props.drag.start)
        }
      }))
    }
  }, [getMouse, properties.drag, setProperties])

  // on move end
  const onMoveEnd = useCallback(() => {
    if (properties.drag.active) {
      setProperties((props) => ({
        ...props,
        drag: {
          start: [0, 0],
          end: [0, 0],
          offset: [0, 0],
          active: false,
        },
        offset: add(properties.offset, properties.drag.offset)
      }))
    }
  }, [properties, setProperties])

  // on zoom
  const onZoom = useCallback((direction: number) => {
    const dir = Math.sign(direction)
    const value = properties.zoom + dir * 0.1

    setProperties((props) => ({ ...props, zoom: Math.max(1, Math.min(5, value)) }))
  }, [properties, setProperties])

  // bind events
  const bindEvents = useGesture(
    {
      onWheel: ({ direction: [, y] }) => onZoom(y),
      onDrag: ({ event, offset: [x, y] }) => onMove(x, y, event),
      onDragEnd: () => onMoveEnd(),
      onDragStart: ({ offset: [x, y] }) => onDrag(x, y),
    }
  )

  // render
  return (
    <ViewportContext.Provider
      value={useMemo(() => ({
        bindEvents,
        getMouse,
        properties,
        onDrag,
        onMove,
        onMoveEnd,
        onZoom,
        reset,
      }), [
        bindEvents,
        getMouse,
        properties,
        onDrag,
        onMove,
        onMoveEnd,
        onZoom,
        reset
      ])}
    > 
      {children}
    </ViewportContext.Provider>
  )
}

export { ViewportContext, ViewportProvider }
export default ViewportProvider
