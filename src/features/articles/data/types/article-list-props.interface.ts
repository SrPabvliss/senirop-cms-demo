import type { IArticle } from '@/features/articles/data/types/article.interface'
import type { FormMode } from '@/shared/constants/form-modes'

export interface UseArticleActionsProps {
  openDrawer: (mode: FormMode, article?: IArticle) => void
  closeDrawer: () => void
  success: (message: string) => void
  openConfirmationDialog: (
    title: string,
    message: string,
    onConfirm: () => void
  ) => void
}

export interface ArticleActions {
  handleTogglePublished: (article: IArticle) => void
  handleAddArticle: () => void
  handleRowClick: (article: IArticle) => void
  handleEditArticle: (article: IArticle) => void
  handleViewArticle: (article: IArticle) => void
  handleDeleteArticle: (article: IArticle) => void
}

export interface ArticlesListViewProps {
  articles: IArticle[]
  actions: ArticleActions
}
