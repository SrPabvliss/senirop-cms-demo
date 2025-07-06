import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useArticleStore } from './features/articles/store/article.store'

function App() {
  const { articles, isLoading, init } = useArticleStore()

  useEffect(() => {
    init()
  }, [])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <>
      {articles.map((article) => (
        <div key={article.id}>
          <Typography>{article.headline}</Typography>
          <Typography>{article.body}</Typography>
        </div>
      ))}
    </>
  )
}

export default App
