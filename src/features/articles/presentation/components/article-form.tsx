import { FormProvider } from 'react-hook-form'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FormMode } from '@/shared/constants/form-modes'
import { useArticleForm } from '../hooks/use-article-form'
import type { ArticleFormProps } from '../../data/types/article-form.interface'
import RHFInput from '@/shared/ui/components/form/rhf-inputt'
import RHFDateInput from '@/shared/ui/components/form/rhf-date-input'
import RHFSwitch from '@/shared/ui/components/form/rhf-switch'

export const ArticleForm = ({ mode, article }: ArticleFormProps) => {
  const theme = useTheme()
  const isReadOnly = mode === FormMode.VIEW

  const {
    methods,
    onSubmit,
    isSubmitting,
    isValid,
    getButtonText,
    handleCancel,
    getTitle,
  } = useArticleForm({ mode, article })

  return (
    <FormProvider {...methods}>
      <Box>
        <Button
          variant="outlined"
          onClick={handleCancel}
          disabled={isSubmitting}
          sx={{
            display: 'flex',
            justifySelf: 'flex-end',
            textTransform: 'none',
            borderColor: '#E5E5E5',
            color: theme.palette.text.secondary,
            marginBottom: '16px',
          }}
        >
          Close
        </Button>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {getTitle()}
          </Typography>
          <Divider sx={{ mb: 3, borderColor: '#E5E5E5' }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <RHFInput
              name="headline"
              label="Headline"
              placeholder="Enter article headline"
              disabled={isReadOnly}
              required
            />

            <RHFInput
              name="author"
              label="Author"
              placeholder="Enter author name"
              disabled={isReadOnly}
              required
            />

            <RHFInput
              name="body"
              label="Body"
              placeholder="Enter article content"
              disabled={isReadOnly}
              multiline
              rows={6}
              required
            />

            <RHFDateInput
              name="publicationDate"
              label="Publish Date"
              disabled={isReadOnly}
              required
            />

            <RHFSwitch name="published" label="Publish" />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={onSubmit}
                disabled={!isValid || isSubmitting}
                sx={{
                  textTransform: 'none',
                  backgroundColor:
                    !isValid || isSubmitting ? '#9ca3af' : '#6366f1',
                  '&:hover': {
                    backgroundColor:
                      !isValid || isSubmitting ? '#9ca3af' : '#5856eb',
                  },
                }}
              >
                {isSubmitting ? 'Loading...' : getButtonText()}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </FormProvider>
  )
}
