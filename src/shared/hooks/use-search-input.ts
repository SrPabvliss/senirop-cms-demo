/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useDebounce } from '@/shared/hooks/use-debounce'
import type { UseSearchInputOptions } from '../types/search-input.types'

/**
 * Hook to manage search input with debounce functionality
 * @param options - Options for the search input
 * @returns The value and onChange function for the search input
 */
export function useSearchInput({
  value: controlledValue,
  debounceDelay = 300,
  onDebouncedChange,
}: UseSearchInputOptions = {}) {
  // Internal value to manage the input value
  const [internalValue, setInternalValue] = useState(controlledValue || '')
  // Debounced value to manage the debounce functionality
  const debouncedValue = useDebounce({
    value: internalValue,
    delay: debounceDelay,
  })

  // This effect is used to sync the internal value with the controlled value
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== internalValue) {
      setInternalValue(controlledValue)
    }
  }, [controlledValue])

  // This effect is used to call the debounced change
  useEffect(() => {
    if (onDebouncedChange && debouncedValue !== controlledValue) {
      onDebouncedChange(debouncedValue)
    }
  }, [debouncedValue, onDebouncedChange, controlledValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInternalValue(newValue)
  }

  return {
    value: internalValue,
    onChange: handleChange,
  }
}
