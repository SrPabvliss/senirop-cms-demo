import { describe, it, expect } from 'vitest'

function sum(a: number, b: number): number {
  return a + b
}

describe('Basic Math Tests', () => {
  it('should add two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5)
  })

  it('should handle negative numbers', () => {
    expect(sum(-1, 1)).toBe(0)
  })

  it('should handle zero', () => {
    expect(sum(0, 5)).toBe(5)
  })
})
