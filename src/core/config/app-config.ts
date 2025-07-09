/**
 * Application configuration based on environment variables and build context
 */

export enum AppEnvironment {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

export enum DeploymentTarget {
  LOCAL = 'local',
  GITHUB_PAGES = 'github-pages',
}

interface AppConfig {
  environment: AppEnvironment
  deploymentTarget: DeploymentTarget
  basePath: string
  isDevelopment: boolean
  isTest: boolean
  isProduction: boolean
  isGitHubPages: boolean
}

/**
 * Detect deployment target based on environment variables and context
 */
function getDeploymentTarget(): DeploymentTarget {
  if (import.meta.env.VITE_DEPLOY_TARGET === 'github-pages') {
    return DeploymentTarget.GITHUB_PAGES
  }

  if (import.meta.env.VITE_GITHUB_PAGES === 'true') {
    return DeploymentTarget.GITHUB_PAGES
  }

  return DeploymentTarget.LOCAL
}

/**
 * Get the appropriate base path based on deployment target
 */
function getBasePath(deploymentTarget: DeploymentTarget): string {
  switch (deploymentTarget) {
    case DeploymentTarget.GITHUB_PAGES:
      return '/senirop-cms-demo'
    case DeploymentTarget.LOCAL:
    default:
      return ''
  }
}

/**
 * Create the application configuration
 */
function createAppConfig(): AppConfig {
  const mode = import.meta.env.MODE as AppEnvironment
  const deploymentTarget = getDeploymentTarget()
  const basePath = getBasePath(deploymentTarget)

  return {
    environment: mode,
    deploymentTarget,
    basePath,
    isDevelopment: mode === AppEnvironment.DEVELOPMENT,
    isTest: mode === AppEnvironment.TEST,
    isProduction: mode === AppEnvironment.PRODUCTION,
    isGitHubPages: deploymentTarget === DeploymentTarget.GITHUB_PAGES,
  }
}

/**
 * Application configuration instance
 */
export const appConfig = createAppConfig()

/**
 * Helper to get data source environment for imports
 * This allows for more granular control over data sources
 */
export function getDataEnvironment(): AppEnvironment {
  return appConfig.environment
}

/**
 * Helper to get store name with proper environment suffix
 */
export function getStoreName(baseName: string): string {
  return `${baseName}-${appConfig.environment}`
}
