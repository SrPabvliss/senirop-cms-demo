import {
  Box,
  Typography,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useArticleColumns } from '../components/article-table-columns'
import { DataTable } from '@/shared/ui/components/data-table'
import type { ArticlesListViewProps } from '../../data/types/article-list-props.interface'
import { useArticleFilters } from '../hooks/use-article-filters'
import { SearchInput } from '@/shared/ui/components/search-input'
import { ArticleStatus } from '../../data/constants/article-statuses'

export const ArticlesListView = ({
  articles,
  actions,
}: ArticlesListViewProps) => {
  const {
    filteredArticles,
    search,
    setSearch,
    publishedStatus,
    setPublishedStatus,
  } = useArticleFilters(articles)

  const columns = useArticleColumns(actions)

  return (
    <>
      <Paper>
        <Box
          sx={{
            py: 2,
            px: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <Typography
            noWrap
            sx={{
              color: '#A0AEC0',
              overflow: 'visible',
            }}
          >
            Dashboard Overview
          </Typography>

          <SearchInput
            placeholder="Search by headline..."
            value={search}
            onDebouncedChange={setSearch}
          />
        </Box>
      </Paper>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom sx={{ fontSize: '20px', fontWeight: 500 }}>
            Articles
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={publishedStatus}
              onChange={(e) =>
                setPublishedStatus(e.target.value as typeof publishedStatus)
              }
              displayEmpty
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              {Object.values(ArticleStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={actions.handleAddArticle}
            sx={{ textTransform: 'none' }}
          >
            ADD ARTICLE
          </Button>
        </Box>

        <DataTable
          data={filteredArticles}
          columns={columns}
          onRowClick={actions.handleRowClick}
          emptyMessage="No articles found"
          pagination={true}
        />
      </Box>
    </>
  )
}
