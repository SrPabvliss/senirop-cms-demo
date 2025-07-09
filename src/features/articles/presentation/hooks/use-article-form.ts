import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  articleSchema,
  type ArticleSchema,
} from '../../data/schemas/article.schema'
import {
  getFormButtonText,
  getDefaultFormValues,
  getFormTitle,
} from '../helpers/article-form.helper'
import { FormMode } from '@/shared/constants/form-modes'
import type { UseArticleFormProps } from '../../data/types/article-form.interface'

/**
 * Hook to manage the article form
 * @param mode - The mode of the form (create, edit, view)
 * @param article - The article to edit
 * @param onClose - Function to close the drawer
 * @param onCreateArticle - Function to create article
 * @param onUpdateArticle - Function to update article
 * @returns The form methods, onSubmit, isSubmitting, isValid, getButtonText, getTitle, handleButtonClick, handleCancel
 */
export function useArticleForm({
  mode,
  article,
  onClose,
  onCreateArticle,
  onUpdateArticle,
}: UseArticleFormProps) {
  /**
   * Form methods to handle the form state
   * Uses ArticleSchema to validate the form data
   * Uses getDefaultFormValues to set the default values
   */
  const methods = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
    defaultValues: getDefaultFormValues(article),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = methods

  /**
   * On submit handler to handle the form submission
   * If the mode is create, it will add the article
   * If the mode is edit, it will update the article
   * @param data - The form data
   */
  const onSubmit: SubmitHandler<ArticleSchema> = async (data) => {
    if (mode === FormMode.CREATE && onCreateArticle) {
      onCreateArticle(data)
      return
    }
    if (
      (mode === FormMode.EDIT || mode === FormMode.VIEW) &&
      article &&
      onUpdateArticle
    ) {
      onUpdateArticle(article.id, data)
    }
  }

  /**
   * Handle the toggle of the published status
   * If the mode is view, it will not allow the toggle
   * @param published - The published status
   */
  const handleTogglePublished = (published: boolean) => {
    if (!(mode === FormMode.VIEW && article && onUpdateArticle)) return
    onUpdateArticle(article.id, { published })
  }

  const getButtonText = () => getFormButtonText(mode)

  const getTitle = () => getFormTitle(mode, article)

  const handleButtonClick = () => {
    handleSubmit(onSubmit)()
  }

  const handleCancel = () => {
    if (!(mode === FormMode.EDIT && article)) return
    reset(getDefaultFormValues(article))
  }

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    handleTogglePublished,
    isSubmitting,
    isValid,
    getButtonText,
    getTitle,
    handleButtonClick,
    handleCancel,
    onClose,
    hasChanges: isDirty,
  }
}
