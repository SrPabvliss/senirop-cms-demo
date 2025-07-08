import { FormMode } from '@/shared/constants/form-modes'
import type { IArticle } from './article.interface'

export interface ArticleFormProps {
  mode: FormMode
  article?: IArticle
  onClose: () => void
  onCreateArticle?: (articleData: Omit<IArticle, 'id'>) => void
  onUpdateArticle?: (id: string, articleData: Partial<IArticle>) => void
}

export interface UseArticleFormProps {
  mode: FormMode
  article?: IArticle
  onClose: () => void
  onCreateArticle?: (articleData: Omit<IArticle, 'id'>) => void
  onUpdateArticle?: (id: string, articleData: Partial<IArticle>) => void
}
