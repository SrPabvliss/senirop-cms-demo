import { useState } from 'react'
import { type SnackbarState, type SnackbarType } from '../types/snackbar.types'

/**
 * Hook to manage the snackbar state
 * @returns {Object} - Object with the snackbar state and methods to manage it
 */
export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    type: 'info',
    key: 0,
  })

  /**
   * Show a snackbar, close the previous one if it is open
   * @param {string} message - The message to show
   * @param {SnackbarType} type - The type of snackbar
   */
  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar((prev) => ({ ...prev, open: false }))
    setTimeout(() => {
      setSnackbar({
        open: true,
        message,
        type,
        key: Date.now(), // key let me re-render the snackbar
      })
    }, 100)
  }

  const success = (message: string) => {
    showSnackbar(message, 'success')
  }

  const error = (message: string) => {
    showSnackbar(message, 'error')
  }

  const warning = (message: string) => {
    showSnackbar(message, 'warning')
  }

  const info = (message: string) => {
    showSnackbar(message, 'info')
  }

  const close = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return {
    snackbarProps: snackbar,
    success,
    error,
    warning,
    info,
    close,
  }
}
