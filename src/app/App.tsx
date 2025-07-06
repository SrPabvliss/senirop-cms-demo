import { BrowserRouter as Router } from 'react-router'
import { ThemeProvider } from '@/core/providers/theme-provider'
import { AppRoutes } from './routes/routes'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App
