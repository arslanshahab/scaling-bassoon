import { BlogCategory } from './BlogCategory'

export type Blog = {
  id: number
  title: string
  metaTitle: string
  metaDescription: string
  body: string
  slug: string
  language: string
  featuredType: string
  featuredMedia: string
  featuredImage: string
  featuredImageSet: {
    [key: string]: string
  }
  featuredVideo: null
  featuredVideoThumb: null
  visibility: string
  date: string
  author: Author
  categories: BlogCategory[]
  tags: Tag[]
  relatedArticles?: RelatedArticle
  images?: BlogImage[]
}

export type Author = {
  id: number
  name: string
}

export type Tag = {
  id: number
  name: string
  color: string
  model: string
}

export type RelatedArticle = {
  items: Blog[]
}

export type BlogImage = {
  id: number
  modelId: number
  model: string
  imagePath: string
}
