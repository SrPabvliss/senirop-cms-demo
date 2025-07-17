import { articleSchema } from '@/features/articles/data/schemas/article.schema'
import { describe, expect, it } from 'vitest'

/**
 * Article schema should be tested as the ui control does not let the errors to be thrown/shown
 */
describe('Article Schema', () => {
  it('should return a valid article', () => {
    const article = articleSchema.parse({
      headline: 'Test Article',
      author: 'Test Author',
      body: 'Test Body',
      publicationDate: '2021-01-01',
      published: true,
      photos: [],
    })

    expect(article).toBeDefined()
  })

  it('should return an error if the article is invalid', () => {
    const article = articleSchema.safeParse({
      headline: 'Test Article',
    })

    expect(article.error).toBeDefined()
  })
})
