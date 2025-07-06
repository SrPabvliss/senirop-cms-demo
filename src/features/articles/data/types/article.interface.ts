export interface IArticle {
  id: string
  headline: string
  body: string
  author: string
  publicationDate: string
  published: boolean
}

export interface ICreateArticle extends Omit<IArticle, 'id'> {}

export interface IUpdateArticle extends Partial<ICreateArticle> {}
