import type { SnackBarComponentProps } from '@/shared/types/snackbar.types'
import { Alert, Snackbar } from '@mui/material'
import type { SyntheticEvent } from 'react'

/**
 * Simple Snackbar component
 * @param {SnackBarComponentProps} props - The props for the component
 * @returns {JSX.Element} - The Snackbar component
 */
export const SnackbarComponent = ({
  open,
  message,
  type,
  onClose,
  sx,
}: SnackBarComponentProps) => {
  /**
   * Handle the close event, prevent the close by click away
   * @param {SyntheticEvent | Event} _ - The event
   * @param {string} reason - The reason for the close
   * docs: https://mui.com/material-ui/react-snackbar/#automatic-dismiss
   */
  const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    onClose()
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={1400}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={sx}
    >
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}
