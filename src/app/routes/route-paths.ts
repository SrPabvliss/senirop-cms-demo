/**
 * Register all the routes here
 */
export const ROUTE_PATHS = {
  DASHBOARD: '/',
  USER_MANAGEMENT: '/users',
  DOCUMENTS: '/documents',
  STATISTICS: '/statistics',
  SETTINGS: '/settings',
  ARTICLE_DETAILS: '/articles/:id',
} as const

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS]
