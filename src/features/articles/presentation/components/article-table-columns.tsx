import { Switch, IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import type { Column } from '@/shared/types/data-table.types'
import type { IArticle } from '@/features/articles/data/types/article.interface'

/**
 * This is the type for the handlers of the article table
 * it will allow me to send specific functions for article actions
 */
interface ArticleTableHandlers {
  onTogglePublished: (article: IArticle) => void
  onOpenActions: (article: IArticle) => void
}

/**
 * This is the function that will create the columns for the article table
 * it will return an array of columns
 */
export const createArticleColumns = ({
  onTogglePublished,
  onOpenActions,
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
        onChange={(e) => {
          // stop the event of the row click
          e.stopPropagation()
          onTogglePublished(row)
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
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          onOpenActions(row)
        }}
      >
        <MoreVert />
      </IconButton>
    ),
  },
]
