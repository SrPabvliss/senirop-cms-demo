import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router'

export const ArticleDetailLayout = () => {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.sidebar.main,
            display: 'flex',
            width: '100%',
            padding: theme.spacing(2),
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            Daily News
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            width: '100%',
            padding: theme.spacing(2),
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
