import type { SxProps, Theme } from '@mui/material'

export interface UseSearchInputOptions {
  value?: string
  debounceDelay?: number
  onChange?: (value: string) => void
  onDebouncedChange?: (value: string) => void
}

export interface SearchInputProps extends UseSearchInputOptions {
  placeholder?: string
  fullWidth?: boolean
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
  sx?: SxProps<Theme>
}
