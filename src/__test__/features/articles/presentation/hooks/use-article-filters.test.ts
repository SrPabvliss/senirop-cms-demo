import { describe, expect, test } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useArticleFilters } from '@/features/articles/presentation/hooks/use-article-filters'
import { ArticleStatus } from '@/features/articles/data/constants/article-statuses'
import testArticles from '@mock/articles/articles.test.json'

/**
 * Article filters hook should be tested as it is the base for the article filters in the app
 * which impacts directly in the displayed articles
 */
describe('useArticleFilters', () => {
  test('should initialize with default filters', () => {
    const { result } = renderHook(() => useArticleFilters(testArticles))

    expect(result.current.search).toBe('')
    expect(result.current.publishedStatus).toBe(ArticleStatus.ALL)
    expect(result.current.hasActiveFilters).toBe(false)
    expect(result.current.filteredArticles).toEqual(testArticles)
  })

  test('should filter articles by search term', () => {
    const { result } = renderHook(() => useArticleFilters(testArticles))

    act(() => {
      result.current.setSearch('Test Article 1')
    })

    expect(result.current.search).toBe('Test Article 1')
    expect(result.current.filteredArticles).toHaveLength(1)
    expect(result.current.hasActiveFilters).toBe(true)
  })

  test('should filter by published status', () => {
    const { result } = renderHook(() => useArticleFilters(testArticles))

    act(() => {
      result.current.setPublishedStatus(ArticleStatus.PUBLISHED)
    })

    expect(result.current.publishedStatus).toBe(ArticleStatus.PUBLISHED)
    expect(
      result.current.filteredArticles.every((article) => article.published)
    ).toBe(true)
    expect(result.current.hasActiveFilters).toBe(true)
  })

  test('should combine search and status filters', () => {
    const { result } = renderHook(() => useArticleFilters(testArticles))

    act(() => {
      result.current.setSearch('Test')
      result.current.setPublishedStatus(ArticleStatus.PUBLISHED)
    })

    expect(result.current.filteredArticles.length).toBeGreaterThan(0)
    expect(result.current.hasActiveFilters).toBe(true)
  })

  test('should clear all filters', () => {
    const { result } = renderHook(() => useArticleFilters(testArticles))

    act(() => {
      result.current.setSearch('test')
      result.current.setPublishedStatus(ArticleStatus.PUBLISHED)
    })

    act(() => {
      result.current.clearFilters()
    })

    expect(result.current.search).toBe('')
    expect(result.current.publishedStatus).toBe(ArticleStatus.ALL)
    expect(result.current.hasActiveFilters).toBe(false)
    expect(result.current.filteredArticles).toEqual(testArticles)
  })
})
