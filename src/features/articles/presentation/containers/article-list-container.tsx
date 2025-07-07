import { ArticlesProvider } from '../components/article-provider'
import { useArticleActions } from '../hooks/use-article-actions'
import { ArticlesListView } from '../views/article-list-view'

/**
 * Provides the articles list to the ArticlesListView component
 * Container component should be used in the routes
 */
export const ArticleListContainer = () => {
  const actions = useArticleActions()
  return (
    <ArticlesProvider>
      {(articles) => <ArticlesListView articles={articles} actions={actions} />}
    </ArticlesProvider>
  )
}
