import { BrowserRouter as Router } from 'react-router'
import { ThemeProvider } from '@/core/providers/theme-provider'
import { AppRoutes } from './routes/routes'

const basename =
  import.meta.env.MODE === 'production' ? '/senirop-cms-demo' : '/'

function App() {
  return (
    <ThemeProvider>
      <Router basename={basename}>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App
