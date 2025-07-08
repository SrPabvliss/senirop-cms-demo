import { useEffect, type ReactNode } from 'react'
import { useArticleStore } from '@/features/articles/store/article.store'
import { LoadingListSkeleton } from '@/shared/ui/components/list-skeleton'
import type { IArticle } from '../../data/types/article.interface'

interface ArticlesProviderProps {
  children: (articles: IArticle[]) => ReactNode
}

/**
 * Provider component that handles articles initialization and loading state
 * Wraps children and provides articles data once loaded
 */
export const ArticlesProvider = ({ children }: ArticlesProviderProps) => {
  const { articles, isLoading, init } = useArticleStore()

  useEffect(() => {
    init()
  }, [init])

  if (isLoading) {
    return <LoadingListSkeleton />
  }

  return <>{children(articles || [])}</>
}
