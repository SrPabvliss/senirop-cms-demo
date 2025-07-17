import { AppEnvironment, getDataEnvironment } from '@/core/config/app-config'

/**
 * Type for the import function
 */
export type ImportFunction<T = any> = () => Promise<{ default: T }>

/**
 * Enum for the import entities
 */
export enum ImportEntity {
  ARTICLES = 'articles',
  USERS = 'users',
}

/**
 * Helper class to import data from JSON files
 */
export class ImportHelper {
  private static importers: Record<
    ImportEntity,
    Record<string, ImportFunction>
  > = {
    [ImportEntity.ARTICLES]: {
      development: () => import('@mock/articles/articles.development.json'),
      test: () => import('@mock/articles/articles.test.json'),
      production: () => import('@mock/articles/articles.production.json'),
    },
    [ImportEntity.USERS]: {
      development: () => import('@mock/users/users.development.json'),
      test: () => import('@mock/users/users.test.json'),
      production: () => import('@mock/users/users.production.json'),
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

    const environment = getDataEnvironment()
    const importer = entityImporters[environment]

    if (!importer) {
      return entityImporters.development as ImportFunction<T>
    }

    return importer as ImportFunction<T>
  }

  /**
   * Get the current data environment
   * @returns The current data environment
   */
  static getCurrentEnvironment(): AppEnvironment {
    return getDataEnvironment()
  }
}
