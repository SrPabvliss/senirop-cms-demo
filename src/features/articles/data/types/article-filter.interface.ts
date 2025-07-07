import type { ArticleStatus } from '../constants/article-statuses'

export interface ArticleFilters {
  search: string
  publishedStatus: ArticleStatus
}

export interface ArticleFilterActions {
  setSearch: (search: string) => void
  setPublishedStatus: (status: ArticleStatus) => void
  clearFilters: () => void
}

export interface UseArticleFiltersReturn
  extends ArticleFilters,
    ArticleFilterActions {
  hasActiveFilters: boolean
}
