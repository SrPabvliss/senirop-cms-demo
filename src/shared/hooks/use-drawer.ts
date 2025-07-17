import { useState } from 'react'
import { FormMode } from '../constants/form-modes'

interface DrawerState<T> {
  isOpen: boolean
  mode: FormMode
  item?: T
}

/**
 * Hook to manage the article drawer
 * Handles the 3 modes: CREATE, EDIT, VIEW
 */
export const useDrawer = <T>() => {
  const [drawerState, setDrawerState] = useState<DrawerState<T>>({
    isOpen: false,
    mode: FormMode.CREATE,
    item: undefined,
  })

  /**
   * Open the drawer in the specified mode
   * @param mode - Form mode (CREATE, EDIT, VIEW)
   * @param item - Item to edit/view (optional for CREATE)
   */
  const openDrawer = (mode: FormMode, item?: T) => {
    setDrawerState({
      isOpen: true,
      mode,
      item,
    })
  }

  /**
   * Close the drawer and reset the state
   */
  const closeDrawer = () => {
    setDrawerState({
      isOpen: false,
      mode: FormMode.CREATE,
      item: undefined,
    })
  }

  /**
   * Change the mode of the drawer (useful to pass from VIEW to EDIT)
   * @param newMode - New form mode
   */
  const changeMode = (newMode: FormMode) => {
    setDrawerState((prev) => ({
      ...prev,
      mode: newMode,
    }))
  }

  return {
    isOpen: drawerState.isOpen,
    mode: drawerState.mode,
    item: drawerState.item,
    openDrawer,
    closeDrawer,
    changeMode,
  }
}
