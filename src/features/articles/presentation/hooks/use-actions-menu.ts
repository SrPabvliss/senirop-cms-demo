import { useState } from 'react'
import type { IArticle } from '../../data/types/article.interface'

export const useActionsMenu = (
  onEdit: (article: IArticle) => void,
  onView: (article: IArticle) => void,
  onDelete: (article: IArticle) => void
) => {
  const [trigger, setTrigger] = useState<null | HTMLElement>(null)
  const open = Boolean(trigger)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // Prevent row click event from triggering
    event.stopPropagation()
    setTrigger(event.currentTarget)
  }

  const handleClose = () => {
    setTrigger(null)
  }

  const handleEdit = (article: IArticle, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onEdit(article)
    handleClose()
  }

  const handleView = (article: IArticle, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onView(article)
    handleClose()
  }

  const handleDelete = (article: IArticle, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onDelete(article)
    handleClose()
  }

  return {
    handleClick,
    handleClose,
    handleEdit,
    handleView,
    handleDelete,
    open,
    trigger,
  }
}
