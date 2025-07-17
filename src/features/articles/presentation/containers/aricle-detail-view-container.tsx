import { SingleArticleProvider } from '../components/single-article-provider'
import { useParams } from 'react-router'
import { ArticleDetailView } from '../views/article-detail-view'

export const ArticleDetailViewContainer = () => {
  const { id } = useParams()
  return (
    <SingleArticleProvider id={id || ''}>
      {(article) => <ArticleDetailView article={article} />}
    </SingleArticleProvider>
  )
}
