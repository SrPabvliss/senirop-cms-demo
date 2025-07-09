import { describe, expect, test, beforeEach, vi } from 'vitest'
import { useArticleStore } from '@/features/articles/store/article.store'
import testArticles from '@mock/articles/articles.test.json'

/**
 * Mock localStorage to avoid the store to be persisted in the local storage
 */
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

/**
 * Article store should be tested as it is the base for the article data in the app
 * It is one of the most critical parts of the app
 */
describe('Article Store', () => {
  /**
   * Reset the store state before each test to avoid data sharing between tests
   */
  beforeEach(() => {
    useArticleStore.setState({
      articles: undefined,
      isLoading: false,
    })
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  /**
   * Test the store initialization,
   * undefined articles let me know if i have to read the articles from the service
   */
  test('should initialize with undefined articles and loading false', () => {
    const store = useArticleStore.getState()

    expect(store.articles).toBeUndefined()
    expect(store.isLoading).toBe(false)
  })

  /**
   * On init, when data is read from the service, the articles should be defined
   */
  test('should load articles on init', async () => {
    const store = useArticleStore.getState()

    await store.init()

    const updatedStore = useArticleStore.getState()
    expect(updatedStore.articles).toBeDefined()
    expect(updatedStore.articles?.length).toBeGreaterThan(0)
    expect(updatedStore.isLoading).toBe(false)
  })

  /**
   * Test the add article functionality
   * It should add a new article with a generated id
   */
  test('should add new article with generated ID', () => {
    const store = useArticleStore.getState()

    store.setArticles(testArticles)

    const newArticle = {
      headline: 'New Test Article',
      body: 'Test content',
      author: 'Test Author',
      publicationDate: '2025-01-05',
      published: false,
    }

    store.addArticle(newArticle)

    const updatedStore = useArticleStore.getState()
    const articles = updatedStore.articles || []

    expect(articles).toHaveLength(testArticles.length + 1)

    const addedArticle = articles[0]
    expect(addedArticle.headline).toBe(newArticle.headline)
    expect(addedArticle.id).toBeDefined()
    expect(typeof addedArticle.id).toBe('string')
  })

  /**
   * Test the update article functionality
   * It should update the article with the given id
   */
  test('should update existing article', () => {
    const store = useArticleStore.getState()

    store.setArticles(testArticles)

    const firstArticle = testArticles[0]
    const updates = {
      headline: 'Updated Headline',
      published: !firstArticle.published,
    }

    store.updateArticle(firstArticle.id, updates)

    const updatedStore = useArticleStore.getState()
    const articles = updatedStore.articles || []
    const updatedArticle = articles.find((a) => a.id === firstArticle.id)

    expect(updatedArticle?.headline).toBe(updates.headline)
    expect(updatedArticle?.published).toBe(updates.published)
    expect(updatedArticle?.author).toBe(firstArticle.author)
  })

  /**
   * Test the delete article functionality
   * It should delete the article with the given id
   */
  test('should delete article by ID', () => {
    const store = useArticleStore.getState()

    store.setArticles(testArticles)

    const articleToDelete = testArticles[0]

    store.deleteArticle(articleToDelete.id)

    const updatedStore = useArticleStore.getState()
    const articles = updatedStore.articles || []

    expect(articles).toHaveLength(testArticles.length - 1)
    expect(articles.find((a) => a.id === articleToDelete.id)).toBeUndefined()
  })

  /**
   * As the store is initialized with undefined articles,
   * it should handle empty articles array operations
   */
  test('should handle empty articles array operations', () => {
    const store = useArticleStore.getState()

    store.setArticles([])

    store.deleteArticle('nonexistent-id')

    const updatedStore = useArticleStore.getState()
    expect(updatedStore.articles).toEqual([])
  })

  test('should handle update on nonexistent article', () => {
    const store = useArticleStore.getState()

    store.setArticles(testArticles)
    const originalLength = testArticles.length

    store.updateArticle('nonexistent-id', { headline: 'Updated' })

    const updatedStore = useArticleStore.getState()
    const articles = updatedStore.articles || []

    expect(articles).toHaveLength(originalLength)
    expect(articles.every((a) => a.headline !== 'Updated')).toBe(true)
  })
})
