import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export interface DataProviderProps<T> extends PropsWithChildren {
  name: string
  data: T
}

export type DataContextProps<T> = {
  data: T
  setData: Dispatch<SetStateAction<T | null>>
  loading: boolean
  error: Error | null
  saveData: (key: string, value: T) => void
  removeData: (key: string) => void
}
