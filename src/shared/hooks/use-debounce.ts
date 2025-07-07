import { useState, useEffect } from 'react'

/**
 * Generic debounce hook
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */

interface UseDebounceProps<T> {
  value: T
  delay: number
}

export const useDebounce = <T>({
  value,
  delay = 300,
}: UseDebounceProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
