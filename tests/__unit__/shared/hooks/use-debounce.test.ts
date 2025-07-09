import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/shared/hooks/use-debounce'

/**
 * Mock timers to modify the time of the tests
 */
vi.useFakeTimers()

describe('useDebounce', () => {
  /**
   * Clear all timers before each test
   */
  beforeEach(() => {
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.clearAllTimers()
  })

  test('should return initial value immediately', () => {
    const { result } = renderHook(() =>
      useDebounce({ value: 'initial', delay: 300 })
    )

    expect(result.current).toBe('initial')
  })

  test('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce({ value, delay: 300 }),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('updated')
  })

  test('should reset timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce({ value, delay: 300 }),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'first' })

    act(() => {
      vi.advanceTimersByTime(150)
    })

    rerender({ value: 'second' })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('second')
  })
})
