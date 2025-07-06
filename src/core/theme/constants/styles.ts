/**
 * Styles for the application, based on the figma design
 */
export const STYLES = {
  colors: {
    sidebar: {
      background: '#424242',
      logout: '#15012E',
      text: '#ffffff',
    },
    primary: '#6366f1',
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    sizes: {
      sidebar: 16,
    },
    weights: {
      normal: 400,
      bold: 700,
    },
  },
  layout: {
    sidebar: {
      width: 250,
      height: 1024,
      gap: 67,
      padding: {
        horizontal: 45,
        vertical: 38,
        logoTop: 67,
      },
    },
  },
} as const
