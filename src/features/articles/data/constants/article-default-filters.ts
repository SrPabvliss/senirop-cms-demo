import type { ArticleFilters } from '../types/article-filter.interface'
import { ArticleStatus } from './article-statuses'

export const ARTICLE_DEFAULT_FILTERS: ArticleFilters = {
  search: '',
  publishedStatus: ArticleStatus.ALL,
}
