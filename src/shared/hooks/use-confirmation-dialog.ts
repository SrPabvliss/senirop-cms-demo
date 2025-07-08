import { useState } from 'react'

export interface ConfirmationDialogState {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
}

/**
 * Hook to manage confirmation dialogs
 * Reusable for any action that requires confirmation
 */
export const useConfirmationDialog = () => {
  const [dialogState, setDialogState] = useState<ConfirmationDialogState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  })

  /**
   * Open the dialog
   * @param title - The title of the dialog
   * @param message - The message of the dialog
   * @param onConfirm - The function to call when the user confirms
   */
  const openDialog = (
    title: string,
    message: string,
    onConfirm: () => void
  ) => {
    setDialogState({
      isOpen: true,
      title,
      message,
      onConfirm,
    })
  }

  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: () => {},
    })
  }

  const handleConfirm = () => {
    dialogState.onConfirm()
    closeDialog()
  }

  return {
    isOpen: dialogState.isOpen,
    title: dialogState.title,
    message: dialogState.message,
    openDialog,
    closeDialog,
    handleConfirm,
  }
}
