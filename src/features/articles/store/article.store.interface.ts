import type {
  IArticle,
  ICreateArticle,
  IUpdateArticle,
} from '@/features/articles/data/types/article.interface'

export interface IArticleStore {
  articles: IArticle[] | undefined
  init: () => Promise<void>
  setArticles: (articles: IArticle[]) => void
  addArticle: (article: ICreateArticle) => void
  findArticleById: (id: string) => IArticle | undefined
  updateArticle: (id: string, article: IUpdateArticle) => void
  deleteArticle: (id: string) => void
  isLoading: boolean
}
