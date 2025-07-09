import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  ImportEntity,
  ImportHelper,
  type ImportFunction,
} from '@/core/helpers/import.helper'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import testArticles from '@mock/articles/articles.test.json'
import developmentArticles from '@mock/articles/articles.development.json'
import productionArticles from '@mock/articles/articles.production.json'
import { AppEnvironment } from '@/core/config/app-config'

vi.mock('@/core/config/app-config', () => ({
  AppEnvironment: {
    DEVELOPMENT: 'development',
    TEST: 'test',
    PRODUCTION: 'production',
  },
  getDataEnvironment: vi.fn(() => 'development'),
}))

/**
 * Import helper should be tested as it is the base for the data import in the app
 */

describe('Import Helper', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return a function that imports data', () => {
    const importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
    expect(typeof importer).toBe('function')
  })

  it('should return the current environment', () => {
    const environment = ImportHelper.getCurrentEnvironment()
    expect(typeof environment).toBe('string')
  })

  describe('Environment-based imports', () => {
    let importer: ImportFunction<IArticle[]>

    describe('Test environment', () => {
      it('should return the correct data on importer execution', async () => {
        const { getDataEnvironment } = await import('@/core/config/app-config')
        vi.mocked(getDataEnvironment).mockReturnValue(AppEnvironment.TEST)

        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(testArticles)
      })
    })

    describe('Development environment', () => {
      it('should return the correct data on importer execution', async () => {
        const { getDataEnvironment } = await import('@/core/config/app-config')
        vi.mocked(getDataEnvironment).mockReturnValue(
          AppEnvironment.DEVELOPMENT
        )

        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(developmentArticles)
      })
    })

    describe('Production environment', () => {
      it('should return the correct data on importer execution', async () => {
        const { getDataEnvironment } = await import('@/core/config/app-config')
        vi.mocked(getDataEnvironment).mockReturnValue(AppEnvironment.PRODUCTION)

        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(productionArticles)
      })
    })

    describe('Invalid environment', () => {
      it('should fallback to development environment', async () => {
        const { getDataEnvironment } = await import('@/core/config/app-config')
        vi.mocked(getDataEnvironment).mockReturnValue('invalid' as any)

        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(developmentArticles)
      })
    })
  })
})
