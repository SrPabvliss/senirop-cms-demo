import type { IArticle } from '@/features/articles/data/types/article.interface'
import type { ArticleStatus } from '../constants/article-statuses'
import type { FormMode } from '@/shared/constants/form-modes'

export interface UseArticleActionsProps {
  openDrawer: (mode: FormMode, article?: IArticle) => void
  closeDrawer: () => void
}

export interface ArticleActions {
  handleTogglePublished: (article: IArticle) => void
  handleAddArticle: () => void
  handleRowClick: (article: IArticle) => void
  handleEditArticle: (article: IArticle) => void
  handleViewArticle: (article: IArticle) => void
  handleDeleteArticle: (article: IArticle) => void
}

export interface ArticleFilters {
  search: string
  publishedStatus: ArticleStatus
  hasActiveFilters: boolean
  totalCount: number
  filteredCount: number
  setSearch: (search: string) => void
  setPublishedStatus: (status: ArticleStatus) => void
  clearFilters: () => void
  filteredArticles: IArticle[]
}

export interface ArticlesListViewProps {
  articles: IArticle[]
  actions: ArticleActions
}
