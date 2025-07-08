import { z } from 'zod'

export const articleSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  author: z.string().min(1, 'Author is required'),
  body: z.string().min(1, 'Body is required'),
  publicationDate: z.string().min(1, 'Publication date is required'),
  published: z.boolean(),
})

export type ArticleSchema = z.infer<typeof articleSchema>
