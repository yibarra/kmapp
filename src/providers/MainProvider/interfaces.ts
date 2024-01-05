import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export type SizeType = {
  height: number
  width: number
}

export interface MainContextProps {
  loaded: boolean
  setLoaded: Dispatch<SetStateAction<boolean>>
}

export interface MainProviderProps extends PropsWithChildren {
}
