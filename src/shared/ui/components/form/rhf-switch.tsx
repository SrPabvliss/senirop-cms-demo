import { Switch, Box, Typography } from '@mui/material'
import { useTheme, type SxProps, type Theme } from '@mui/material/styles'
import { useFormContext, Controller } from 'react-hook-form'

interface RHFSwitchProps {
  name: string
  label?: string
  disabled?: boolean
  sx?: SxProps<Theme>
}

/**
 * RHFSwitch is a component that renders a form switch field ready to be used with react-hook-form
 * @param name - The name of the switch field
 * @param label - The label of the switch field
 * @param disabled - Whether the switch field is disabled
 */
const RHFSwitch: React.FC<RHFSwitchProps> = ({
  name,
  label,
  disabled = false,
  sx,
}) => {
  const theme = useTheme()
  const { control } = useFormContext()

  return (
    <Box sx={{ mb: 3, width: '100%', ...sx }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            display: 'block',
            mb: 2,
            fontSize: '14px',
            fontWeight: 400,
            color: '#6b7280',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onChange={field.onChange}
            disabled={disabled}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: field.value ? '#6DF491' : '#FFFFFF',
                border: field.value ? 'none' : '1px solid #8E8E8E',
              },
              '& .MuiSwitch-track': {
                backgroundColor: `${field.value ? '#6DF491' : '#8E8E8E'} !important`,
              },
            }}
          />
        )}
      />
    </Box>
  )
}

export default RHFSwitch
