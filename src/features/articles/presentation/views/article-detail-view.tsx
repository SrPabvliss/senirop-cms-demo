import { Box, Typography } from '@mui/material'
import type { IArticle } from '../../data/types/article.interface'
import { ArticleCorrousel } from '../components/article-corrousel'

export const ArticleDetailView = ({ article }: { article: IArticle }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100vh',
          margin: 'auto',
          padding: 2,
          maxWidth: '840px',
        }}
      >
        <Typography
          sx={{ fontWeight: 400, fontSize: '16px', fontStyle: 'italic' }}
        >
          {article.publicationDate}
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: '32px',
            }}
          >
            {article.headline}
          </Typography>
          <Typography
            sx={{
              fontWeight: '500',
              color: '#8E8E8E',
              fontSize: '24px',
            }}
          >
            By {article.author}
          </Typography>
        </Box>
        <ArticleCorrousel photos={article.photos} />
        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">{article.body}</Typography>
        </Box>
      </Box>
    </>
  )
}
