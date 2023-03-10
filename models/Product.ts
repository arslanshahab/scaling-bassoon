export type Product = {
  id: number
  productsTitle: string
  productsShortDescription: string
  productsDescription: string
  productsAdditionalInfo: string
  productsCategoryId: number
  productsFeaturedImage: string
  visibility: number
  slug: string
  ordinal: number
  categories: Category[]
  attachments: Attachment[]
  images: ProductImage[]
  brand: ProductBrand
  attributes: Attribute[]
  recommendedProducts: Product[]
}

export type Category = {
  id: number
  category_name: string
  category_slug: string
  category_description: string
  parent_id: number
  seo_title: string
  seo_url: string
  seo_description: string
  image_url: string
}

export type Attachment = {
  id: number
  productId: number
  attachmentUrl: string
  attachmentName: string
}

export type Attribute = {
  name: string
  value: string
}

export type ProductImage = {
  id: number
  model_id: number
  model: string
  image_path: string
}

export type ProductBrand = {
  id: number
  title: string
  slug: string
  short_description: string
  image: string
}
