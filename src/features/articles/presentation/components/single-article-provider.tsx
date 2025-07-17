import { type ReactNode } from 'react'
import { LoadingListSkeleton } from '@/shared/ui/components/list-skeleton'
import type { IArticle } from '../../data/types/article.interface'
import { useArticleDetailView } from '../hooks/use-article-detail-view'

interface SingleArticleProviderProps {
  id: string
  children: (article: IArticle) => ReactNode
}

/**
 * Provider component that handles single article initialization and loading state
 * Wraps children and provides article data once loaded
 */
export const SingleArticleProvider = ({
  children,
  id,
}: SingleArticleProviderProps) => {
  const { article, isLoading } = useArticleDetailView(id)

  if (isLoading || !article) {
    return <LoadingListSkeleton />
  }

  return <>{children(article)}</>
}
