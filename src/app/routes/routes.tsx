import { Route, Routes } from 'react-router'
import { ROUTE_PATHS } from './route-paths'
import { Dashboard } from '@mui/icons-material'
import { MainLayout } from '../layout/views/main-layout'
import { ArticleListContainer } from '@/features/articles/presentation/containers/article-list-container'
// import { UserListContainer } from '@/features/users/presentation/containers/users-list-container'
import { ArticleDetailViewContainer } from '@/features/articles/presentation/containers/aricle-detail-view-container'
import { ArticleDetailLayout } from '@/features/articles/presentation/components/article-detail-layout'

/**
 * Register all the routes here, use the constants from route-paths.ts
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ArticleListContainer />} />
        {/* <Route
          path={ROUTE_PATHS.USER_MANAGEMENT}
          element={<UserListContainer />}
        /> */}
        <Route path={ROUTE_PATHS.DOCUMENTS} element={<Dashboard />} />
        <Route path={ROUTE_PATHS.STATISTICS} element={<Dashboard />} />
        <Route path={ROUTE_PATHS.SETTINGS} element={<Dashboard />} />
      </Route>
      <Route
        path={ROUTE_PATHS.ARTICLE_DETAILS}
        element={<ArticleDetailLayout />}
      >
        <Route index element={<ArticleDetailViewContainer />} />
      </Route>
    </Routes>
  )
}
