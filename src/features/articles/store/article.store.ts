import { create } from 'zustand'
import type { IArticleStore } from './article.store.interface'
import { v4 as uuidv4 } from 'uuid'
import { ArticlesService } from '@/features/articles/data/services/article.service'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getStoreName } from '@/core/config/app-config'

/**
 * Store name for the article store based on the environment
 */
const STORE_NAME = getStoreName('article-store')

/**
 * Store for the articles, persist the articles in the local storage
 */
export const useArticleStore = create<IArticleStore>()(
  persist(
    (set, get) => ({
      articles: undefined,
      isLoading: false,
      /**
       * Initialize the store, if the articles are not in the store, get them from the service
       */
      init: async () => {
        set({ isLoading: true })
        if (get().articles === undefined) {
          const articles = await ArticlesService.getInstance().getArticles()
          set({ articles })
        }
        set({ isLoading: false })
      },
      setArticles: (articles) => set({ articles }),
      /**
       * Add an article, id will be generated by uuid
       */
      addArticle: (article) => {
        set((state) => ({
          articles: [{ ...article, id: uuidv4() }, ...(state.articles || [])],
        }))
      },
      updateArticle: (id, article) =>
        set((state) => ({
          articles:
            state.articles?.map((a) =>
              a.id === id ? { ...a, ...article } : a
            ) || [],
        })),
      deleteArticle: (id) =>
        set((state) => ({
          articles: state.articles?.filter((a) => a.id !== id) || [],
        })),
      findArticleById: (id) =>
        get().articles?.find((a) => a.id === id) || undefined,
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
