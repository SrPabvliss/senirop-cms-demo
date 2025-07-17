import { Box, Avatar, Tooltip, Typography } from '@mui/material'
import { getFileUrl } from '@/core/helpers/file-upload.helper'
import ImageIcon from '@mui/icons-material/Image'

interface ImagePreviewProps {
  photos: string[]
  maxDisplay?: number
}

export const ImagePreview = ({ photos, maxDisplay = 3 }: ImagePreviewProps) => {
  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No images
      </Typography>
    )
  }

  const displayPhotos = photos.slice(0, maxDisplay)
  const remainingCount = photos.length - maxDisplay

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {displayPhotos.map((photo, index) => (
        <Tooltip key={index} title={photo.split('/').pop()}>
          <Avatar
            src={getFileUrl(photo)}
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'grey.200',
            }}
          >
            <ImageIcon fontSize="small" />
          </Avatar>
        </Tooltip>
      ))}
      {remainingCount > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
          +{remainingCount}
        </Typography>
      )}
    </Box>
  )
}
