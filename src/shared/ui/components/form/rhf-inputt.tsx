import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { rhfInputStyles } from '@/shared/constants/rhf-components-styles'

interface RHFInputProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  multiline?: boolean
  rows?: number
  required?: boolean
}

/**
 * RHFInput is a component that renders a form input field ready to be used with react-hook-form
 * @param name - The name of the input field
 * @param label - The label of the input field
 * @param type - The type of the input field
 * @param placeholder - The placeholder of the input field
 * @param disabled - Whether the input field is disabled
 * @param multiline - Whether the input field is a multiline input
 * @param rows - The number of rows of the input field
 */

const RHFInput: React.FC<RHFInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  multiline = false,
  rows = 1,
  required = false,
}) => {
  // use configured theme
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
   * getErrorMessage is a function that returns the error message of the input field
   * @param name - The name of the input field
   * @returns The error message of the input field
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
      {/* Controller is a component that wraps the input field and provides the form context to the component */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            fullWidth
            error={!!getErrorMessage(name)}
            sx={rhfInputStyles}
            variant="outlined"
            size="medium"
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

export default RHFInput
