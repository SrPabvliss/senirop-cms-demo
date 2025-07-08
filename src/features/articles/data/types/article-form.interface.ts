import { FormMode } from '@/shared/constants/form-modes'
import type { IArticle } from './article.interface'

export interface ArticleFormProps {
  mode: FormMode
  article?: IArticle
}

export interface UseArticleFormProps {
  mode: FormMode
  article?: IArticle
}
