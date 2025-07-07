import { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DataTable } from '@/shared/ui/components/data-table'
import { useArticleStore } from '@/features/articles/store/article.store'
import { createArticleColumns } from '../components/article-table-columns'
import type { IArticle } from '@/features/articles/data/types/article.interface'

export const ArticlesListView = () => {
  const { articles, isLoading, init, updateArticle } = useArticleStore()

  useEffect(() => {
    init()
  }, [init])

  const handleTogglePublished = (id: string) => {
    const article = articles.find((a) => a.id === id)
    if (article) {
      updateArticle(id, { published: !article.published })
    }
  }

  const handleRowClick = (article: IArticle) => {
    console.log('Row clicked:', article)
    // TODO: Abrir aside para ver/editar artículo
  }

  const handleOpenActions = (article: IArticle) => {
    console.log('Actions clicked:', article)
    // TODO: Abrir menú de acciones
  }

  const handleAddArticle = () => {
    console.log('Add article clicked')
    // TODO: Abrir aside para crear artículo
  }

  const columns = createArticleColumns({
    onTogglePublished: handleTogglePublished,
    onOpenActions: handleOpenActions,
  })

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Articles
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddArticle}
          sx={{ textTransform: 'none' }}
        >
          ADD ARTICLE
        </Button>
      </Box>

      {/* Table */}
      <DataTable
        data={articles}
        columns={columns}
        loading={isLoading}
        onRowClick={handleRowClick}
        emptyMessage="No articles found"
        pagination={true}
      />
    </Box>
  )
}
