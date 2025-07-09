/**
 * Types for the theme, used module augmentation to extend the MUI theme
 * docs: https://mui.com/material-ui/customization/theming/
 */
declare module '@mui/material/styles' {
  interface Palette {
    sidebar: {
      main: string
      logout: string
    }
    formDrawer: {
      background: string
      border: string
      shadow: string
    }
    switch: {
      active: string
      inactive: string
      thumb: {
        active: string
        inactive: string
        border: string
      }
    }
  }

  interface PaletteOptions {
    sidebar?: {
      main?: string
      logout?: string
    }
    formDrawer?: {
      background?: string
      border?: string
      shadow?: string
    }
    switch?: {
      active?: string
      inactive?: string
      thumb?: {
        active?: string
        inactive?: string
        border?: string
      }
    }
  }

  interface TypeText {
    sidebar: string
  }

  interface TypographyVariants {
    sidebar: {
      fontSize: number
      fontWeightNormal: number
      fontWeightSelected: number
    }
  }

  interface TypographyVariantsOptions {
    sidebar?: {
      fontSize?: number
      fontWeightNormal?: number
      fontWeightSelected?: number
    }
  }

  interface Theme {
    layout: {
      sidebar: {
        width: number
        height: number
        gap: number
        padding: {
          horizontal: number
          vertical: number
          logoTop: number
        }
      }
      formDrawer: {
        width: number
        borderRadius: number
        padding: {
          main: number
        }
        shadow: {
          x: number
          y: number
          blur: number
          spread: number
        }
      }
    }
  }

  interface ThemeOptions {
    layout?: {
      sidebar?: {
        width?: number
        height?: number
        gap?: number
        padding?: {
          horizontal?: number
          vertical?: number
          logoTop?: number
        }
      }
      formDrawer?: {
        width?: number
        borderRadius?: number
        padding?: {
          main?: number
        }
        shadow?: {
          x?: number
          y?: number
          blur?: number
          spread?: number
        }
      }
    }
  }
}
