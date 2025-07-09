import { BrowserRouter as Router } from 'react-router'
import { ThemeProvider } from '@/core/providers/theme-provider'
import { AppRoutes } from './routes/routes'
import { appConfig } from '@/core/config/app-config'

function App() {
  return (
    <ThemeProvider>
      <Router basename={appConfig.basePath}>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App
