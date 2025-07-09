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
    formDrawer: {
      background: '#FFFFFF',
      border: '#E5E5E5',
      shadow: 'rgba(0, 0, 0, 0.25)',
    },
    switch: {
      active: '#6DF491',
      inactive: '#8E8E8E',
      thumb: {
        active: '#6DF491',
        inactive: '#FFFFFF',
        border: '#8E8E8E',
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    sizes: {
      sidebar: 16,
    },
    weights: {
      normal: 400,
      medium: 500,
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
        logoTop: 38,
      },
    },
    formDrawer: {
      width: 548,
      borderRadius: 4,
      padding: {
        main: 32,
      },
      shadow: {
        x: 0,
        y: 4,
        blur: 4,
        spread: 0,
      },
    },
  },
} as const
