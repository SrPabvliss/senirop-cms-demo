import { FormMode } from '@/shared/constants/form-modes'
import type { IArticle } from '../../data/types/article.interface'
import type { ArticleSchema } from '../../data/schemas/article.schema'

export const getFormButtonText = (mode: FormMode): string => {
  const buttonTexts = {
    [FormMode.CREATE]: 'SAVE',
    [FormMode.EDIT]: 'UPDATE',
    [FormMode.VIEW]: 'EDIT',
  }

  return buttonTexts[mode] || 'SAVE'
}

export const getFormTitle = (
  mode: FormMode,
  article?: { headline?: string }
): string => {
  const titles = {
    [FormMode.CREATE]: 'New article',
    [FormMode.EDIT]: 'Edit article',
    [FormMode.VIEW]: article?.headline || 'Article details',
  }

  return titles[mode] || 'Article'
}

export const getDefaultFormValues = (article?: IArticle): ArticleSchema => ({
  headline: article?.headline || '',
  author: article?.author || '',
  body: article?.body || '',
  publicationDate:
    article?.publicationDate || new Date().toISOString().split('T')[0],
  published: article?.published || false,
  photos: article?.photos || [],
})
