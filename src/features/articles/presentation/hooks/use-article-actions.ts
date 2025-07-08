import { useArticleStore } from '@/features/articles/store/article.store'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import { FormMode } from '@/shared/constants/form-modes'
import type { UseArticleActionsProps } from '../../data/types/article-list-props.interface'
import { ARTICLE_SNACKBAR_MESSAGES } from '../../data/constants/article-snackbar-messages'

/**
 * Hook that provides all article-related actions
 */
export const useArticleActions = ({
  openDrawer,
  closeDrawer,
  success,
  openConfirmationDialog,
}: UseArticleActionsProps) => {
  const { updateArticle, addArticle, deleteArticle } = useArticleStore()

  const handleTogglePublished = (article: IArticle) => {
    if (article) {
      const newStatus = !article.published
      updateArticle(article.id, { published: newStatus })
      success(
        newStatus
          ? ARTICLE_SNACKBAR_MESSAGES.PUBLISH
          : ARTICLE_SNACKBAR_MESSAGES.UNPUBLISH
      )
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
    openConfirmationDialog(
      'Delete Article',
      'Are you sure you want to delete this article?',
      () => {
        deleteArticle(article.id)
        success(ARTICLE_SNACKBAR_MESSAGES.DELETE)
      }
    )
  }

  const handleCreateArticle = (articleData: Omit<IArticle, 'id'>) => {
    addArticle(articleData)
    success(ARTICLE_SNACKBAR_MESSAGES.CREATE)
    closeDrawer()
  }

  const handleUpdateArticle = (id: string, articleData: Partial<IArticle>) => {
    updateArticle(id, articleData)
    success(ARTICLE_SNACKBAR_MESSAGES.UPDATE)
    closeDrawer()
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
