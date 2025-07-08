import { useArticleStore } from '@/features/articles/store/article.store'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import { FormMode } from '@/shared/constants/form-modes'
import type { UseArticleActionsProps } from '../../data/types/article-list-props.interface'

/**
 * Hook that provides all article-related actions
 */
export const useArticleActions = ({
  openDrawer,
  closeDrawer,
}: UseArticleActionsProps) => {
  const { updateArticle, addArticle, deleteArticle } = useArticleStore()

  const handleTogglePublished = (article: IArticle) => {
    if (article) {
      updateArticle(article.id, { published: !article.published })
    }
  }

  const handleRowClick = (article: IArticle) => {
    openDrawer(FormMode.VIEW, article)
  }

  const handleAddArticle = () => {
    openDrawer(FormMode.CREATE)
  }

  const handleEditArticle = (article: IArticle) => {
    openDrawer(FormMode.EDIT, article)
  }

  const handleViewArticle = (article: IArticle) => {
    openDrawer(FormMode.VIEW, article)
  }

  const handleDeleteArticle = (article: IArticle) => {
    deleteArticle(article.id)
  }

  const handleCreateArticle = (articleData: Omit<IArticle, 'id'>) => {
    addArticle(articleData)
    closeDrawer()
    // TODO: show success message
  }

  const handleUpdateArticle = (id: string, articleData: Partial<IArticle>) => {
    updateArticle(id, articleData)
    closeDrawer()
    // TODO: show success message
  }

  return {
    handleTogglePublished,
    handleAddArticle,
    handleRowClick,
    handleEditArticle,
    handleViewArticle,
    handleDeleteArticle,
    handleCreateArticle,
    handleUpdateArticle,
  }
}
