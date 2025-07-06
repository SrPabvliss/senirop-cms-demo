import {
  ImportHelper,
  type ImportFunction,
  ImportEntity,
} from '../../../../core/helpers/import.helper'
import type { IArticle } from '../types/article.interface'

/**
 * Service to get articles from the JSON file
 */
export class ArticlesService {
  private static instance: ArticlesService
  private static importer: ImportFunction<IArticle[]>

  private constructor() {
    ArticlesService.importer = ImportHelper.getImporter<IArticle[]>(
      ImportEntity.ARTICLES
    )
  }

  public static getInstance(): ArticlesService {
    if (!this.instance) {
      this.instance = new ArticlesService()
    }
    return this.instance
  }

  /**
   * Get all articles from the JSON file
   * @returns Promise<IArticle[]>
   */
  async getArticles(): Promise<IArticle[]> {
    const articles = await ArticlesService.importer()
    return articles.default
  }
}
