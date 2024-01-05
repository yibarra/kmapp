import { useEffect } from 'react'
import type { RefObject } from 'react'

interface CallBackType {
  (): void
}

// click out side
const UseClickOutSide = (
  ref: RefObject<HTMLElement>,
  callback: CallBackType,
  type = 'hover'
) => {
  useEffect(() => {
    function handleOutside(event: MouseEvent | KeyboardEvent) {
      if (
        'current' in ref &&
        'target' in event &&
        !ref?.current?.contains(event.target as Node)
      ) {
        callback()
      }
    }

    if (type === 'hover') {
      document.addEventListener('keyup', handleOutside)
      document.addEventListener('mouseover', handleOutside)

      return () => {
        document.removeEventListener('keyup', handleOutside)
        document.removeEventListener('mouseover', handleOutside)
      }
    }

    document.addEventListener('keyup', handleOutside)
    document.addEventListener('mousedown', handleOutside)

    return () => {
      document.removeEventListener('keyup', handleOutside)
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [ref, callback, type])
}

export default UseClickOutSide
