import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export type SizeType = {
  height: number
  width: number
}

export type ViewportType = {
  height: number
  width: number
}

export interface MainContextProps {
  loaded: boolean
  setLoaded: Dispatch<SetStateAction<boolean>>
  viewport: ViewportType
}

export interface MainProviderProps extends PropsWithChildren {
}
