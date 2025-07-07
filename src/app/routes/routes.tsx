import { Route, Routes } from 'react-router'
import { ROUTE_PATHS } from './route-paths'
import { Dashboard, AcUnit } from '@mui/icons-material'
import { MainLayout } from '../layout/views/main-layout'
import { ArticlesListView } from '@/features/articles/presentation/views/article-list-view'

/**
 * Register all the routes here, use the constants from route-paths.ts
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ArticlesListView />} />
        <Route path={ROUTE_PATHS.USER_MANAGEMENT} element={<AcUnit />} />
        <Route path={ROUTE_PATHS.DOCUMENTS} element={<Dashboard />} />
        <Route path={ROUTE_PATHS.STATISTICS} element={<Dashboard />} />
        <Route path={ROUTE_PATHS.SETTINGS} element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
