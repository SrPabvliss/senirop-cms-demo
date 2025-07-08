import { describe, expect, it } from 'vitest'
import {
  ImportEntity,
  ImportHelper,
  type ImportFunction,
} from '@/core/helpers/import.helper'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import testArticles from '@mock/articles/articles.test.json'
import developmentArticles from '@mock/articles/articles.development.json'
import productionArticles from '@mock/articles/articles.production.json'

describe('Import Helper', () => {
  it('should return a function that imports data', () => {
    const importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
    expect(typeof importer).toBe('function')
  })

  describe('Environment-based imports', () => {
    let importer: ImportFunction<IArticle[]>

    describe('Test environment', () => {
      it('should return the correct data on importer execution', async () => {
        ImportHelper.setEnvironment('test')
        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(testArticles)
      })
    })

    describe('Development environment', () => {
      it('should return the correct data on importer execution', async () => {
        ImportHelper.setEnvironment('development')
        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(developmentArticles)
      })
    })

    describe('Production environment', () => {
      it('should return the correct data on importer execution', async () => {
        ImportHelper.setEnvironment('production')
        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(productionArticles)
      })
    })

    describe('Invalid environment', () => {
      it('should fallback to development environment', async () => {
        ImportHelper.setEnvironment('invalid')
        importer = ImportHelper.getImporter<IArticle[]>(ImportEntity.ARTICLES)
        const data = await importer()
        expect(data.default).toEqual(developmentArticles)
      })
    })
  })
})
