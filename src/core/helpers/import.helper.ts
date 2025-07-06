/**
 * Type for the import function
 */
export type ImportFunction<T = any> = () => Promise<{ default: T }>

/**
 * Enum for the import entities
 */
export enum ImportEntity {
  ARTICLES = 'articles',
}

/**
 * Helper class to import data from JSON files
 */
export class ImportHelper {
  private static environment: string = import.meta.env.MODE || 'development'

  private static importers: Record<
    ImportEntity,
    Record<string, ImportFunction>
  > = {
    [ImportEntity.ARTICLES]: {
      development: () => import('@mock/articles/articles.development.json'),
      test: () => import('@mock/articles/articles.test.json'),
      production: () => import('@mock/articles/articles.production.json'),
    },
  }

  /**
   * Get the importer for the given entity
   * @param entity - The entity to get the importer for
   * @returns The importer function
   */
  static getImporter<T>(entity: ImportEntity): ImportFunction<T> {
    const entityImporters = this.importers[entity]

    if (!entityImporters) {
      throw new Error(`No importers found for entity: ${entity}`)
    }

    const importer = entityImporters[this.environment]
    if (!importer) {
      return entityImporters.development as ImportFunction<T>
    }

    return importer as ImportFunction<T>
  }
}
