import { useState } from 'react'
import { FormMode } from '../../../../shared/constants/form-modes'
import type { IArticle } from '../../data/types/article.interface'

interface ArticleDrawerState {
  isOpen: boolean
  mode: FormMode
  article?: IArticle
}

/**
 * Hook to manage the article drawer
 * Handles the 3 modes: CREATE, EDIT, VIEW
 */
export const useArticleDrawer = () => {
  const [drawerState, setDrawerState] = useState<ArticleDrawerState>({
    isOpen: false,
    mode: FormMode.CREATE,
    article: undefined,
  })

  /**
   * Open the drawer in the specified mode
   * @param mode - Form mode (CREATE, EDIT, VIEW)
   * @param article - Article to edit/view (optional for CREATE)
   */
  const openDrawer = (mode: FormMode, article?: IArticle) => {
    setDrawerState({
      isOpen: true,
      mode,
      article,
    })
  }

  /**
   * Close the drawer and reset the state
   */
  const closeDrawer = () => {
    setDrawerState({
      isOpen: false,
      mode: FormMode.CREATE,
      article: undefined,
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
    article: drawerState.article,
    openDrawer,
    closeDrawer,
    changeMode,
  }
}
