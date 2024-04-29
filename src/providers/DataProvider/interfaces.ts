import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export interface DataProviderProps extends PropsWithChildren {
  name: string
}

export interface DataContextProps<T> {
  data: T
  setData: Dispatch<SetStateAction<T | null>>
  loading: boolean
  error: Error | null
  saveData: (value: T) => void
  removeData: (key: string) => void
}
