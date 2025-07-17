import { useState } from 'react'

export const useActionsMenu = <T>(
  onEdit: (item: T) => void,
  onView: (item: T) => void,
  onDelete: (item: T) => void
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

  const handleEdit = (item: T, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onEdit(item)
    handleClose()
  }

  const handleView = (item: T, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onView(item)
    handleClose()
  }

  const handleDelete = (item: T, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onDelete(item)
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
