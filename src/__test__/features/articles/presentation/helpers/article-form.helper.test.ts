import { describe, expect, it } from 'vitest'
import {
  getFormButtonText,
  getFormTitle,
  getDefaultFormValues,
} from '@/features/articles/presentation/helpers/article-form.helper'
import { FormMode } from '@/shared/constants/form-modes'

/**
 * Article form helper should be tested mainly because of default form getter
 * as it allows to load the data of the article in the form
 */
describe('Article Form Helper', () => {
  /**
   * Helpers for texts are nos as critical but already included in the helper
   * so we can test them to be sure that the texts are correct
   */
  it('should return the correct button text', () => {
    expect(getFormButtonText(FormMode.CREATE)).toBe('SAVE')
    expect(getFormButtonText(FormMode.EDIT)).toBe('UPDATE')
    expect(getFormButtonText(FormMode.VIEW)).toBe('EDIT')
    expect(getFormButtonText('invalid' as FormMode)).toBe('SAVE')
  })

  it('should return the correct form title', () => {
    expect(getFormTitle(FormMode.CREATE)).toBe('New article')
    expect(getFormTitle(FormMode.EDIT)).toBe('Edit article')
    expect(getFormTitle(FormMode.VIEW)).toBe('Article details')
    expect(getFormTitle('invalid' as FormMode)).toBe('Article')
  })

  it('should return the correct default form values', () => {
    const article = {
      headline: 'Test Article',
      author: 'Test Author',
      body: 'Test Body',
      publicationDate: '2021-01-01',
      published: true,
      id: '1',
    }
    const defaultValues = getDefaultFormValues(article)
    expect(defaultValues).toBeDefined()
    expect(defaultValues.headline).toBe(article.headline)
    expect(defaultValues.author).toBe(article.author)
    expect(defaultValues.body).toBe(article.body)
    expect(defaultValues.publicationDate).toBe(article.publicationDate)
    expect(defaultValues.published).toBe(article.published)
  })
})
