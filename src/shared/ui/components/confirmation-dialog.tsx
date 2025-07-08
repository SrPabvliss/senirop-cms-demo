import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  severity?: 'warning' | 'error' | 'info'
}

/**
 * Reusable confirmation dialog
 * Follows the MUI system design
 */
export const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'DELETE',
  cancelText = 'CANCEL',
  severity = 'warning',
}: ConfirmationDialogProps) => {
  const theme = useTheme()

  /**
   * Get the color of the confirm button
   * @returns The color of the confirm button
   */
  const getConfirmColor = () => {
    const colors = {
      error: theme.palette.error.main,
      warning: theme.palette.warning.main,
      info: theme.palette.info.main,
    }

    return colors[severity] || theme.palette.primary.main
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: severity === 'error' ? 'error.main' : 'text.primary',
          }}
        >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            textTransform: 'none',
            minWidth: 80,
            color: 'text.secondary',
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: 'none',
            minWidth: 80,
            backgroundColor: getConfirmColor(),
            '&:hover': {
              backgroundColor: getConfirmColor(),
              opacity: 0.9,
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
