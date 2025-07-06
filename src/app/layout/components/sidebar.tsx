import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import MenuListComponent from './menu-list'

export const Sidebar = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        width: theme.layout.sidebar.width,
        // height: theme.layout.sidebar.height, -> changed to fit the screen
        height: '100vh',
        backgroundColor: theme.palette.sidebar.main,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      <MenuListComponent />

      <Box
        onClick={handleLogout}
        sx={{
          backgroundColor: theme.palette.sidebar.logout,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.sidebar.logout,
            opacity: 0.9,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: `${theme.typography.sidebar.fontSize}px`,
            fontWeight: theme.typography.sidebar.fontWeightNormal,
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.sidebar,
          }}
        >
          Logout
        </Typography>
      </Box>
    </Box>
  )
}
