import React from 'react'
import { Drawer, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface FormDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

/**
 * Draawer that consumes the theme
 * Expected to be used for all forms
 */
export const FormDrawer: React.FC<FormDrawerProps> = ({
  isOpen,
  onClose,
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
            height: '100vh',
          },
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: `${theme.layout.formDrawer.padding.main}px`,
        }}
      >
        {children}
      </Box>
    </Drawer>
  )
}
