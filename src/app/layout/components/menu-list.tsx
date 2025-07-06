import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router'
import { useMenuNavigation } from '../hooks/use-menu-navigation'

const MenuListComponent = () => {
  const theme = useTheme()
  const { menuItems } = useMenuNavigation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: `${theme.layout.sidebar.gap}px`,
      }}
    >
      <Box
        sx={{
          px: `${theme.layout.sidebar.padding.horizontal}px`,
          pt: `${theme.layout.sidebar.padding.logoTop}px`,
        }}
      >
        <img src="/images/senirop-logo.png" alt="Senirop Logo" />
      </Box>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          // made this dynamic to fit the screen, 67px seemed too big
          gap: (theme) => `clamp(20px, 5vh, ${theme.layout.sidebar.gap}px)`,
          px: `${theme.layout.sidebar.padding.horizontal}px`,
          py: 0,
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path || '/'}
              sx={{
                p: 0,
                minHeight: 'auto',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <ListItemText
                primary={item.text}
                sx={{
                  fontSize: `${theme.typography.sidebar.fontSize}px`,
                  fontFamily: theme.typography.fontFamily,
                  color: theme.palette.text.sidebar,
                  py: 0.5,
                  '& .MuiTypography-root': {
                    fontWeight: item.active
                      ? `${theme.typography.sidebar.fontWeightSelected}`
                      : `${theme.typography.sidebar.fontWeightNormal}`,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default MenuListComponent
