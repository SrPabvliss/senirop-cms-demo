import { useLocation } from 'react-router'
import { MENU_ITEMS } from '../constants/menu-items'

/**
 * Hook to handle the menu navigation
 * Uses React Router to determine the active item
 */
export const useMenuNavigation = () => {
  const location = useLocation()

  const menuItems = MENU_ITEMS.map((item) => ({
    ...item,
    active: location.pathname === item.path,
  }))

  const activeItem = menuItems.find((item) => item.active)

  return {
    menuItems,
    activeItem,
  }
}
