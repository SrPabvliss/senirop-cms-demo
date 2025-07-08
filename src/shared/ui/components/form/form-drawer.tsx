import React from 'react'
import { Drawer, Box, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Close } from '@mui/icons-material'

interface FormDrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

/**
 * Draawer that consumes the theme
 * Expected to be used for all forms
 */
export const FormDrawer: React.FC<FormDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const theme = useTheme()

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: theme.layout.formDrawer.width,
            backgroundColor: theme.palette.formDrawer.background,
            border: `1px solid ${theme.palette.formDrawer.border}`,
            borderRadius: `${theme.layout.formDrawer.borderRadius}px 0 0 ${theme.layout.formDrawer.borderRadius}px`,
            boxShadow: `${theme.layout.formDrawer.shadow.x}px ${theme.layout.formDrawer.shadow.y}px ${theme.layout.formDrawer.shadow.blur}px ${theme.layout.formDrawer.shadow.spread}px ${theme.palette.formDrawer.shadow}`,
          },
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: `${theme.layout.formDrawer.padding.main}px`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
      </Box>
    </Drawer>
  )
}
