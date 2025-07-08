import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import { MoreVert, Edit, Visibility, Delete } from '@mui/icons-material'
import type { IArticle } from '@/features/articles/data/types/article.interface'
import { useActionsMenu } from '../hooks/use-actions-menu'

interface ArticleActionsMenuProps {
  article: IArticle
  onEdit: (article: IArticle) => void
  onView: (article: IArticle) => void
  onDelete: (article: IArticle) => void
}

/**
 * Component that renders the actions menu for each article row
 * Shows Edit, View, and Delete options
 */
export const ArticleActionsMenu = ({
  article,
  onEdit,
  onView,
  onDelete,
}: ArticleActionsMenuProps) => {
  const {
    handleClick,
    handleClose,
    handleEdit,
    handleView,
    handleDelete,
    open,
    trigger,
  } = useActionsMenu(onEdit, onView, onDelete)

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-controls={open ? 'article-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          opacity: 0.7,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <MoreVert />
      </IconButton>

      {/* 
        trigger + anchorEL allow me to open the menu in the same position of the trigger
        docs: https://mui.com/material-ui/api/menu/#props
      */}
      <Menu
        id="article-actions-menu"
        anchorEl={trigger}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 120,
            '& .MuiMenuItem-root': {
              fontSize: '14px',
              py: 1,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleEdit(article)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleView(article)}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => handleDelete(article)}
          sx={{
            color: 'error.main',
            '& .MuiListItemIcon-root': {
              color: 'error.main',
            },
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
