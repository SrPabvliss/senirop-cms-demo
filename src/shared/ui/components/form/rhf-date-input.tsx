import { useTheme } from '@mui/material/styles'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, Typography, TextField } from '@mui/material'
import { rhfDateInputStyles } from '@/shared/constants/rhf-components-styles'

interface RHFDateInputProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
}

/**
 * RHFDateInput is a component that renders a form date input field ready to be used with react-hook-form
 * @param name - The name of the date input field
 * @param label - The label of the date input field
 * @param disabled - Whether the date input field is disabled
 * @param required - Whether the date input field is required
 */
const RHFDateInput: React.FC<RHFDateInputProps> = ({
  name,
  label,
  disabled = false,
  required = false,
}) => {
  const theme = useTheme()

  /**
   * useFormContext is a hook that provides the form context to the component
   * @returns control, errors
   */
  const {
    control,
    formState: { errors },
  } = useFormContext()

  /**
   * getErrorMessage is a function that returns the error message of the date input field
   * @param name - The name of the date input field
   * @returns The error message of the date input field
   */
  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name]
    return error && typeof error.message === 'string'
      ? error.message
      : undefined
  }

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      {label && (
        <Typography
          variant="body2"
          component="label"
          htmlFor={name}
          sx={{
            display: 'block',
            mb: 1,
            fontSize: '14px',
            fontWeight: 400,
            color: '#6b7280',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {label} {required && '*'}
        </Typography>
      )}
      {/* Controller is a component that wraps the date input field and provides the form context to the component */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id={name}
            type="date"
            disabled={disabled}
            fullWidth
            error={!!getErrorMessage(name)}
            sx={rhfDateInputStyles}
            variant="outlined"
            size="medium"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      {/* Show the error message if there is an error */}
      {getErrorMessage(name) && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: '12px',
            color: theme.palette.error.main,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {getErrorMessage(name)}
        </Typography>
      )}
    </Box>
  )
}

export default RHFDateInput
