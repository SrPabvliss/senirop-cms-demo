import { ArticlesProvider } from '../components/article-provider'
import { useArticleActions } from '../hooks/use-article-actions'
import { useDrawer } from '../../../../shared/hooks/use-drawer'
import { ArticlesListView } from '../views/article-list-view'
import { FormDrawer } from '@/shared/ui/components/form/form-drawer'
import { ArticleForm } from '../components/article-form'
import { SnackbarComponent } from '@/shared/ui/components/snackbar'
import { useSnackbar } from '@/shared/hooks/use-snackbar'
import { useConfirmationDialog } from '@/shared/hooks/use-confirmation-dialog'
import { ConfirmationDialog } from '@/shared/ui/components/confirmation-dialog'
import type { IArticle } from '../../data/types/article.interface'

/**
 * Provides the articles list to the ArticlesListView component
 * Container component should be used in the routes
 */
export const ArticleListContainer = () => {
  const drawer = useDrawer<IArticle>()
  const confirmationDialog = useConfirmationDialog()
  const { snackbarProps, success, close } = useSnackbar()
  const actions = useArticleActions({
    openDrawer: drawer.openDrawer,
    closeDrawer: drawer.closeDrawer,
    success,
    openConfirmationDialog: confirmationDialog.openDialog,
  })

  return (
    <>
      <ArticlesProvider>
        {(articles) => (
          <ArticlesListView articles={articles} actions={actions} />
        )}
      </ArticlesProvider>

      <FormDrawer isOpen={drawer.isOpen} onClose={drawer.closeDrawer}>
        <ArticleForm
          mode={drawer.mode}
          article={drawer.item}
          onClose={drawer.closeDrawer}
          onCreateArticle={actions.handleCreateArticle}
          onUpdateArticle={actions.handleUpdateArticle}
        />
      </FormDrawer>

      <SnackbarComponent
        {...snackbarProps}
        key={snackbarProps.open ? 'open' : 'closed'}
        onClose={close}
      />

      <ConfirmationDialog
        {...confirmationDialog}
        onConfirm={confirmationDialog.handleConfirm}
        onCancel={confirmationDialog.closeDialog}
      />
    </>
  )
}
