import { useArticleStore } from '@/features/articles/store/article.store'
import type { IArticle } from '@/features/articles/data/types/article.interface'

/**
 * Hook that provides all article-related actions
 */
export const useArticleActions = () => {
  const { updateArticle, addArticle, deleteArticle } = useArticleStore()

  const handleTogglePublished = (article: IArticle) => {
    if (article) {
      updateArticle(article.id, { published: !article.published })
    }
  }

  const handleRowClick = (article: IArticle) => {
    console.log('Row clicked - View article:', article)
    // TODO: Abrir aside para ver artículo (ver artículo)
  }

  const handleAddArticle = () => {
    console.log('Add article clicked')
    // TODO: Abrir aside para crear artículo (crear artículo)
  }

  const handleEditArticle = (article: IArticle) => {
    console.log('Edit article from menu:', article)
    // TODO: Abrir aside en modo edición (editar artículo)
  }

  const handleViewArticle = (article: IArticle) => {
    console.log('View article from menu:', article)
    // TODO: Abrir aside en modo vista (ver artículo)
  }

  const handleDeleteArticle = (article: IArticle) => {
    deleteArticle(article.id)
  }

  const handleCreateArticle = (articleData: Omit<IArticle, 'id'>) => {
    addArticle(articleData)
    // TODO: Cerrar aside, mostrar mensaje de éxito
  }

  const handleUpdateArticle = (id: string, articleData: Partial<IArticle>) => {
    updateArticle(id, articleData)
    // TODO: Cerrar aside, mostrar mensaje de éxito
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
