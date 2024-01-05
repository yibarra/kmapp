import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import useLocalStorage from '../../hooks/useLocalStorage'
import type { DataProviderProps, DataContextProps } from './interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = any

const DataContext = createContext<DataContextProps<unknown>>({
  data: null,
  setData: () => {},
  loading: true,
  error: null,
  saveData: () => {},
  removeData: () => {},
})

const DataProvider = ({ children, name, data: asData }: DataProviderProps<T>) => {
  const [data, setData] = useLocalStorage<T | null>(name, asData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const saveData = useCallback((value: T | null) => {
    try {
      setData(value)
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
      setError(error as Error)
    }
  }, [setData, setError])

  const removeData = useCallback((key: string) => {
    try {
      window.localStorage.removeItem(key)

      setData(null)
    } catch (error) {
      console.error('Error removing data from localStorage:', error)
      setError(error as Error)
    }
  }, [setData, setError])

  useEffect(() => {
    if (data !== null) {
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    const storedData = window.localStorage.getItem(name)

    if (storedData) {
      setData(JSON.parse(storedData))
    } else {
      setLoading(false)
    }
  }, [name, setData])

  return (
    <DataContext.Provider
      value={
        useMemo(() => ({
          data,
          setData,
          loading,
          error,
          saveData,
          removeData
        }), [
          data,
          setData,
          loading,
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