import { useState } from 'react'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import type {
  ArticleFilters,
  UseArticleFiltersReturn,
} from '@/features/articles/data/types/article-filter.interface'
import { ArticleStatus } from '../../data/constants/article-statuses'
import { ARTICLE_DEFAULT_FILTERS } from '../../data/constants/article-default-filters'

/**
 * Hook to manage article filters and apply them to article data
 */
export const useArticleFilters = (
  articles: IArticle[]
): UseArticleFiltersReturn & { filteredArticles: IArticle[] } => {
  const [filters, setFilters] = useState<ArticleFilters>(
    ARTICLE_DEFAULT_FILTERS
  )

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const setPublishedStatus = (publishedStatus: ArticleStatus) => {
    setFilters((prev) => ({ ...prev, publishedStatus }))
  }

  const clearFilters = () => {
    setFilters(ARTICLE_DEFAULT_FILTERS)
  }

  const hasActiveFilters =
    filters.search !== '' || filters.publishedStatus !== ArticleStatus.ALL

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      filters.search === '' ||
      article.headline.toLowerCase().includes(filters.search.toLowerCase())

    const matchesPublishedStatus =
      filters.publishedStatus === ArticleStatus.ALL ||
      (filters.publishedStatus === ArticleStatus.PUBLISHED &&
        article.published) ||
      (filters.publishedStatus === ArticleStatus.UNPUBLISHED &&
        !article.published)

    return matchesSearch && matchesPublishedStatus
  })

  return {
    search: filters.search,
    publishedStatus: filters.publishedStatus,
    hasActiveFilters,
    setSearch,
    setPublishedStatus,
    clearFilters,
    filteredArticles,
  }
}
