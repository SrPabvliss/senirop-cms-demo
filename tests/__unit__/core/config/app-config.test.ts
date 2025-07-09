import { describe, expect, it, vi, beforeEach } from 'vitest'

describe('App Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic functionality', () => {
    it('should return valid environment from getDataEnvironment', async () => {
      const { getDataEnvironment, AppEnvironment } = await import(
        '@/core/config/app-config'
      )
      const environment = getDataEnvironment()
      expect(Object.values(AppEnvironment)).toContain(environment)
    })

    it('should generate store names with environment suffix', async () => {
      const { getStoreName } = await import('@/core/config/app-config')
      const storeName = getStoreName('test-store')

      expect(storeName).toMatch(/^test-store-(development|test|production)$/)
      expect(typeof storeName).toBe('string')
      expect(storeName.length).toBeGreaterThan('test-store-'.length)
    })
  })

  describe('App configuration object', () => {
    it('should have all required properties', async () => {
      const { appConfig } = await import('@/core/config/app-config')

      expect(appConfig).toHaveProperty('environment')
      expect(appConfig).toHaveProperty('deploymentTarget')
      expect(appConfig).toHaveProperty('basePath')
      expect(appConfig).toHaveProperty('isDevelopment')
      expect(appConfig).toHaveProperty('isTest')
      expect(appConfig).toHaveProperty('isProduction')
      expect(appConfig).toHaveProperty('isGitHubPages')
    })

    it('should have consistent boolean flags', async () => {
      const { appConfig } = await import('@/core/config/app-config')

      const envFlags = [
        appConfig.isDevelopment,
        appConfig.isTest,
        appConfig.isProduction,
      ]
      const trueFlags = envFlags.filter((flag) => flag === true)
      expect(trueFlags).toHaveLength(1)
    })

    it('should have valid basePath', async () => {
      const { appConfig } = await import('@/core/config/app-config')

      expect(typeof appConfig.basePath).toBe('string')
      if (appConfig.basePath !== '') {
        expect(appConfig.basePath).toMatch(/^\//)
      }
    })

    it('should have consistent deployment flags', async () => {
      const { appConfig, DeploymentTarget } = await import(
        '@/core/config/app-config'
      )

      if (appConfig.isGitHubPages) {
        expect(appConfig.deploymentTarget).toBe(DeploymentTarget.GITHUB_PAGES)
        expect(appConfig.basePath).toBe('/senirop-cms-demo')
      } else {
        expect(appConfig.deploymentTarget).toBe(DeploymentTarget.LOCAL)
        expect(appConfig.basePath).toBe('')
      }
    })
  })
})
