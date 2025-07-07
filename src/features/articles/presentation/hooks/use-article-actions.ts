import { useArticleStore } from '@/features/articles/store/article.store'
import type { IArticle } from '@/features/articles/data/types/article.interface'

/**
 * Hook that provides all article-related actions
 */
export const useArticleActions = () => {
  const { updateArticle, addArticle, deleteArticle } = useArticleStore()

  const handleTogglePublished = (article: IArticle) => {
    if (article) updateArticle(article.id, { published: !article.published })
  }

  const handleRowClick = (article: IArticle) => {
    console.log('Row clicked:', article)
    // TODO: Abrir aside para ver artículo
  }

  const handleOpenActions = (article: IArticle) => {
    console.log('Actions clicked:', article)
    // TODO: Abrir menú de acciones (edit, delete, etc.)
  }

  const handleAddArticle = () => {
    console.log('Add article clicked')
    // TODO: Abrir aside para crear artículo
  }

  const handleEditArticle = (article: IArticle) => {
    console.log('Edit article:', article)
    // TODO: Abrir aside en modo edición
  }

  const handleDeleteArticle = (id: string) => {
    // TODO: Mostrar confirmación antes de eliminar
    deleteArticle(id)
  }

  const handleCreateArticle = (articleData: Omit<IArticle, 'id'>) => {
    addArticle(articleData)
    // TODO: Cerrar aside, mostrar mensaje de éxito
  }

  const handleUpdateArticle = (id: string, articleData: Partial<IArticle>) => {
    updateArticle(id, articleData)
    // TODO: Cerrar aside, mostrar mensaje de éxito
  }

  // Return object that matches interface exactly
  return {
    handleTogglePublished,
    handleAddArticle,
    handleRowClick,
    handleOpenActions,
    handleEditArticle,
    handleDeleteArticle,
    handleCreateArticle,
    handleUpdateArticle,
  }
}
