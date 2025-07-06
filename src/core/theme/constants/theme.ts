import { createTheme } from '@mui/material/styles'
import { STYLES } from './styles'

/**
 * Theme for the application using the styles constants
 * docs: https://mui.com/material-ui/customization/theming/
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: STYLES.colors.primary,
    },
    background: {
      default: STYLES.colors.background.default,
      paper: STYLES.colors.background.paper,
    },
    sidebar: {
      main: STYLES.colors.sidebar.background,
      logout: STYLES.colors.sidebar.logout,
    },
    text: {
      primary: STYLES.colors.text.primary,
      secondary: STYLES.colors.text.secondary,
      sidebar: STYLES.colors.sidebar.text,
    },
  },
  typography: {
    fontFamily: STYLES.typography.fontFamily,
    sidebar: {
      fontSize: STYLES.typography.sizes.sidebar,
      fontWeightNormal: STYLES.typography.weights.normal,
      fontWeightSelected: STYLES.typography.weights.bold,
    },
  },
  layout: {
    sidebar: STYLES.layout.sidebar,
  },
})
