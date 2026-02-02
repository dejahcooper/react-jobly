import { useState } from 'react'

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void

type UseLocalStorageResult<T> = [T, SetValue<T>]

const useLocalStorage = <T,>(key: string, initialValue: T): UseLocalStorageResult<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (err) {
      return initialValue
    }
  })

  const setValue: SetValue<T> = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    try {
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      // ignore write errors (private mode or storage disabled)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
