import { Button, Typography, Box } from '@mui/material'
import { useEffect } from 'react'
import { useArticleStore } from './features/articles/store/article.store'
import { useSnackbar } from './shared/hooks/use-snackbar'
import { SnackbarComponent } from './shared/ui/components/snackbar'

function App() {
  const { articles, isLoading, init } = useArticleStore()

  const { snackbarProps, success, close } = useSnackbar()

  useEffect(() => {
    init()
  }, [])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ p: 3 }}>
      {articles.map((article) => (
        <div key={article.id}>
          <Typography>{article.headline}</Typography>
          <Typography>{article.body}</Typography>
        </div>
      ))}

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Simple Snackbar Test
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => success('¡Éxito!')}
        >
          Success
        </Button>
      </Box>

      <SnackbarComponent {...snackbarProps} onClose={close} />
    </Box>
  )
}

export default App
