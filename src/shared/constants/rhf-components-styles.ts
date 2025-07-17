import { theme } from '@/core/theme/constants/theme'

export const rhfInputStyles = {
  '& .MuiOutlinedInput-root': {
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily,
    '& fieldset': {
      borderColor: '#E5E5E5',
      borderRadius: '4px',
    },
    '&:hover fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: '#6b7280',
    '&.Mui-focused': {
      color: '#6366f1',
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
}

export const rhfDateInputStyles = {
  '& .MuiOutlinedInput-root': {
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily,
    '& fieldset': {
      borderColor: '#E5E5E5',
      borderRadius: '4px',
    },
    '&:hover fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    },
  },
}

export const rhfSelectStyles = {
  '& .MuiOutlinedInput-root': {
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily,
    '& fieldset': {
      borderColor: '#E5E5E5',
      borderRadius: '4px',
    },
    '&:hover fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: '#6b7280',
    '&.Mui-focused': {
      color: '#6366f1',
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
}
