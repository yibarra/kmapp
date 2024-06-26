import { useCallback, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)
      return initialValue
    }
  })

  const getItem = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)
      return null;
    }
  }, [key])

  const setValue = useCallback(
    (value: T | ((val: T | null) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error setting data to localStorage:', error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue, getItem]
}

export default useLocalStorage