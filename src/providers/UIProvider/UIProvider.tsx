import { createContext, useState } from 'react'
import type { PropsWithChildren } from 'react'

import type { UIContextProps } from './interfaces'

// UI Context
const UIContext = createContext({} as UIContextProps)

// UI Provider
const UIProvider = ({ children }: PropsWithChildren) => {
  const [animate, setAnimate] = useState(true)
  const [curve, setCurve] = useState(false)
  const [isAnchor, setIsAnchor] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [enable, setEnable] = useState(false)
  const [remove, setRemove] = useState(false)

  // render
  return (
    <UIContext.Provider
      value={{
        animate,
        curve,
        isAnchor,
        isDragging,
        enable,
        remove,
        setAnimate,
        setCurve,
        setIsAnchor,
        setIsDragging,
        setEnable,
        setRemove,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export { UIContext, UIProvider }
export default UIProvider
