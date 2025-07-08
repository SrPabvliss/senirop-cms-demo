import { ArticlesProvider } from '../components/article-provider'
import { useArticleActions } from '../hooks/use-article-actions'
import { useArticleDrawer } from '../hooks/use-article-drawer'
import { ArticlesListView } from '../views/article-list-view'
import { FormDrawer } from '@/shared/ui/components/form/form-drawer'
import { ArticleForm } from '../components/article-form'
import { SnackbarComponent } from '@/shared/ui/components/snackbar'
import { useSnackbar } from '@/shared/hooks/use-snackbar'

/**
 * Provides the articles list to the ArticlesListView component
 * Container component should be used in the routes
 */
export const ArticleListContainer = () => {
  const drawer = useArticleDrawer()
  const { snackbarProps, success, close } = useSnackbar()
  const actions = useArticleActions({
    openDrawer: drawer.openDrawer,
    closeDrawer: drawer.closeDrawer,
    success,
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
          {...drawer}
          onClose={drawer.closeDrawer}
          onCreateArticle={actions.handleCreateArticle}
          onUpdateArticle={actions.handleUpdateArticle}
        />
      </FormDrawer>

      <SnackbarComponent {...snackbarProps} onClose={close} />
    </>
  )
}
