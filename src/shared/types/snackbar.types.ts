export type SnackbarType = 'success' | 'error' | 'warning' | 'info'

export interface SnackbarState {
  open: boolean
  message: string
  type: SnackbarType
  key?: number
}

export interface SnackBarComponentProps {
  open: boolean
  message: string
  type: SnackbarType
  onClose: () => void
}
