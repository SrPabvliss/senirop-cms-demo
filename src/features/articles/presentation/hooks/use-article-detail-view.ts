import { useEffect, useState } from 'react'
import { useArticleStore } from '../../store/article.store'
import type { IArticle } from '../../data/types/article.interface'

export function useArticleDetailView(id: string) {
  const { findArticleById, isLoading } = useArticleStore()

  const [article, setArticle] = useState<IArticle | null>(null)

  useEffect(() => {
    const article = findArticleById(id)
    if (article) {
      setArticle(article)
    }
  }, [id, findArticleById])

  return { article, isLoading }
}
