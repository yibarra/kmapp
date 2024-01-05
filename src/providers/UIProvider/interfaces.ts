import type { Dispatch, SetStateAction } from 'react'

export interface UIContextProps {
  animate: boolean
  curve: boolean
  enable: boolean
  isDragging: boolean
  isAnchor: boolean
  remove: boolean
  setAnimate: Dispatch<SetStateAction<boolean>>
  setIsAnchor: Dispatch<SetStateAction<boolean>>
  setCurve: Dispatch<SetStateAction<boolean>>
  setIsDragging: Dispatch<SetStateAction<boolean>>
  setEnable: Dispatch<SetStateAction<boolean>>
  setRemove: Dispatch<SetStateAction<boolean>>
}
