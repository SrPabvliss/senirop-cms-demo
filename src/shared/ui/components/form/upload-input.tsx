import { styled } from '@mui/material/styles'
import {
  Button,
  Box,
  Typography,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import { useController, useFormContext } from 'react-hook-form'
import { useState, useCallback } from 'react'
import {
  uploadFilesToPublic,
  validateFiles,
} from '@/core/helpers/file-upload.helper'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

interface RHFUploadInputProps {
  name: string
  label?: string
  disabled?: boolean
  multiple?: boolean
  accept?: string
}

export default function RHFUploadInput({
  name = 'photos',
  label = 'Upload Images',
  disabled = false,
  multiple = true,
  accept = 'image/*',
}: RHFUploadInputProps) {
  const { control } = useFormContext()
  const [isUploading, setIsUploading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  })

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      // Validate files
      const validation = validateFiles(files)
      if (!validation.isValid) {
        setErrors(validation.errors)
        return
      }

      setErrors([])
      setIsUploading(true)

      try {
        const uploadedPaths = await uploadFilesToPublic(files)
        const currentPhotos = Array.isArray(value) ? value : []
        onChange([...currentPhotos, ...uploadedPaths])
      } catch (error) {
        console.error('Upload error:', error)
        setErrors(['Error uploading files. Please try again.'])
      } finally {
        setIsUploading(false)
        // Reset the input
        event.target.value = ''
      }
    },
    [value, onChange]
  )

  const handleRemovePhoto = useCallback(
    (indexToRemove: number) => {
      const currentPhotos = Array.isArray(value) ? value : []
      const newPhotos = currentPhotos.filter(
        (_, index) => index !== indexToRemove
      )
      onChange(newPhotos)
    },
    [value, onChange]
  )

  const currentPhotos = Array.isArray(value) ? value : []

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      <Button
        component="label"
        variant="outlined"
        startIcon={
          isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
        }
        disabled={disabled || isUploading}
        sx={{
          mb: 2,
          textTransform: 'none',
          borderStyle: 'dashed',
          borderWidth: 2,
          py: 1.5,
          px: 3,
        }}
      >
        {isUploading
          ? 'Uploading...'
          : `${label} (${multiple ? 'Multiple files' : 'Single file'})`}
        <VisuallyHiddenInput
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled || isUploading}
        />
      </Button>

      {/* Error messages */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.map((error, index) => (
            <Typography key={index} variant="body2">
              {error}
            </Typography>
          ))}
        </Alert>
      )}

      {/* Form validation error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2">{error.message}</Typography>
        </Alert>
      )}

      {/* Display uploaded photos */}
      {currentPhotos.length > 0 && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Uploaded images ({currentPhotos.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {currentPhotos.map((photo: string, index: number) => (
              <Chip
                key={index}
                icon={<ImageIcon />}
                label={photo.split('/').pop()}
                onDelete={disabled ? undefined : () => handleRemovePhoto(index)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                sx={{
                  maxWidth: 200,
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block', mt: 1 }}
      >
        Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB per file.
      </Typography>
    </Box>
  )
}
