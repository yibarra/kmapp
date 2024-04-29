import { createContext, useCallback, useMemo, useState } from 'react'

import useLocalStorage from '../../hooks/useLocalStorage'
import { dataLayers } from '../../components/Layers/data'
import type { DataProviderProps, DataContextProps } from './interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = any

const DataContext = createContext({} as DataContextProps<unknown>)

// data provider
const DataProvider = ({ children, name }: DataProviderProps) => {
  const [data, setData] = useLocalStorage<T | null>(name, dataLayers.layers)
  const [error, setError] = useState<Error | null>(null)

  // save storage
  const saveData = useCallback((value: T | null) => {
    try {
      setData(value)
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
      setError(error as Error)
    }
  }, [setData, setError])

  // remove storage
  const removeData = useCallback((key: string) => {
    try {
      window.localStorage.removeItem(key)

      setData(null)
    } catch (error) {
      console.error('Error removing data from localStorage:', error)
      setError(error as Error)
    }
  }, [setData, setError])

  // render
  return (
    <DataContext.Provider
      value={
        useMemo(() => ({
          data,
          setData,
          loading: false,
          error,
          saveData,
          removeData
        }), [
          data,
          setData,
          error,
          saveData,
          removeData
        ]
      )}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
export default DataProvider