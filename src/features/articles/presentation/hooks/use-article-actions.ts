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
  success,
}: UseArticleActionsProps) => {
  const { updateArticle, addArticle, deleteArticle } = useArticleStore()

  const handleTogglePublished = (article: IArticle) => {
    if (article) {
      const newStatus = !article.published
      updateArticle(article.id, { published: newStatus })
      success(`Article ${newStatus ? 'published' : 'unpublished'} successfully`)
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
    success('Article deleted successfully')
  }

  const handleCreateArticle = (articleData: Omit<IArticle, 'id'>) => {
    addArticle(articleData)
    success('Article created successfully')
    closeDrawer()
  }

  const handleUpdateArticle = (id: string, articleData: Partial<IArticle>) => {
    updateArticle(id, articleData)
    success('Article updated successfully')
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
