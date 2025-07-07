import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router'
import { Sidebar } from '../components/sidebar'

export const MainLayout = () => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          marginLeft: `${theme.layout.sidebar.width}px`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
