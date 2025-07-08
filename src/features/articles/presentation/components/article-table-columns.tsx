import { Switch } from '@mui/material'
import type { Column } from '@/shared/types/data-table.types'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import { ArticleActionsMenu } from './article-actions-menu'

/**
 * This is the type for the handlers of the article table
 * Include specific action handlers
 */
interface ArticleTableHandlers {
  handleTogglePublished: (article: IArticle) => void
  handleEditArticle: (article: IArticle) => void
  handleViewArticle: (article: IArticle) => void
  handleDeleteArticle: (article: IArticle) => void
}

/**
 * This is the function that will create the columns for the article table
 */
export const createArticleColumns = ({
  handleTogglePublished,
  handleEditArticle,
  handleViewArticle,
  handleDeleteArticle,
}: ArticleTableHandlers): Column<IArticle>[] => [
  {
    key: 'headline',
    label: 'Article Headline',
    width: '40%',
  },
  {
    key: 'author',
    label: 'Author',
    width: '20%',
  },
  {
    key: 'publicationDate',
    label: 'Publish Date',
    width: '15%',
    render: (value) => {
      const date = new Date(value)
      return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
      })
    },
  },
  {
    key: 'published',
    label: 'Published',
    width: '15%',
    align: 'center' as const,
    render: (value, row) => (
      <Switch
        checked={value}
        onChange={(event) => {
          event.stopPropagation()
          handleTogglePublished(row)
        }}
        onClick={(event) => {
          event.stopPropagation()
        }}
        size="small"
        sx={{
          '& .MuiSwitch-thumb': {
            backgroundColor: `${value ? '#6DF491' : '#FFFFFF'}`,
            border: `${value ? 'none' : '1px solid #8E8E8E'}`,
          },
          '& .MuiSwitch-track': {
            backgroundColor: `${value ? '#6DF491' : '#8E8E8E'} !important`,
          },
        }}
      />
    ),
  },
  {
    key: 'actions',
    label: '',
    width: '10%',
    align: 'right' as const,
    render: (_, row) => (
      <ArticleActionsMenu
        article={row}
        onEdit={handleEditArticle}
        onView={handleViewArticle}
        onDelete={handleDeleteArticle}
      />
    ),
  },
]
