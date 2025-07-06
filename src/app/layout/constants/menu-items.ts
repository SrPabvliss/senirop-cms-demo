import { ROUTE_PATHS } from '@/app/routes/route-paths'
import type { IMenuItem } from '../types/menu-item.interface'

export const MENU_ITEMS: IMenuItem[] = [
  { text: 'Dashboard', path: ROUTE_PATHS.DASHBOARD },
  { text: 'User management', path: ROUTE_PATHS.USER_MANAGEMENT },
  { text: 'Documents', path: ROUTE_PATHS.DOCUMENTS },
  { text: 'Statistics', path: ROUTE_PATHS.STATISTICS },
  { text: 'Settings', path: ROUTE_PATHS.SETTINGS },
]
