import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Select, MenuItem, Box, Typography } from '@mui/material'
import { useTheme, type SxProps, type Theme } from '@mui/material/styles'
import { rhfSelectStyles } from '@/shared/constants/rhf-components-styles'

interface SelectOption {
  value: string | number
  label: string
}

interface RHFSelectProps {
  name: string
  label?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  sx?: SxProps<Theme>
}

/**
 * RHFSelect is a component that renders a form select field ready to be used with react-hook-form
 * @param name - The name of the select field
 * @param label - The label of the select field
 * @param options - Array of options with value and label
 * @param placeholder - The placeholder of the select field
 * @param disabled - Whether the select field is disabled
 * @param required - Whether the select field is required
 */
const RHFSelect: React.FC<RHFSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  disabled = false,
  required = false,
  sx,
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
   * getErrorMessage is a function that returns the error message of the select field
   * @param name - The name of the select field
   * @returns The error message of the select field
   */
  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name]
    return error && typeof error.message === 'string'
      ? error.message
      : undefined
  }

  return (
    <Box sx={{ mb: 3, width: '100%', ...sx }}>
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
      {/* Controller is a component that wraps the select field and provides the form context to the component */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            id={name}
            displayEmpty
            disabled={disabled}
            fullWidth
            error={!!getErrorMessage(name)}
            sx={rhfSelectStyles}
            variant="outlined"
            size="medium"
            renderValue={(value) => {
              if (!value && placeholder) {
                return (
                  <Typography
                    sx={{
                      color: '#9ca3af',
                      fontSize: '16px',
                      fontFamily: theme.typography.fontFamily,
                    }}
                  >
                    {placeholder}
                  </Typography>
                )
              }
              const selectedOption = options.find(
                (option) => option.value === value
              )
              return selectedOption?.label || value
            }}
          >
            {placeholder && (
              <MenuItem value="" disabled>
                <Typography
                  sx={{
                    color: '#9ca3af',
                    fontSize: '16px',
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  {placeholder}
                </Typography>
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
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

export default RHFSelect
