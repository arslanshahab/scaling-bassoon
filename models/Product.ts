export type Product = {
  id: number
  products_title: string
  products_short_description: string
  products_description: string
  products_category_id: number
  products_featured_image: string
  products_additional_info: string
  visibility: number
  slug: string
  categories: Category[]
  attachments: Attachment[]
  images: ProductImage[]
  brand: ProductBrand
  attributes: Attribute[]
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
  product_id: number
  attachment_url: string
  attachment_name: string
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
