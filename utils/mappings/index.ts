import { AboutUsItem } from '../../models/AboutPage'
import { Attachment } from '../../models/Attachment'
import { Category } from '../../models/Category'
import { Product } from '../../models/Product'
import { Brand } from '../../models/Brand'
import { SolutionItem } from '../../models/SolutionPage'
import { Label } from '../../models/Label'
import { Blog } from '../../models/Blog'

export const mapProductPropertiesToCamelCase = (items: any[]): Product[] => {
  const products = items.map((item: any) => {
    return mapSingleProductPropertiesToCamelCase(item)
  })
  return products
}

export const mapSingleProductPropertiesToCamelCase = (
  product: any
): Product => {
  return {
    ...product,
    productsTitle: product.products_title,
    productsShortDescription: product.products_short_description,
    productsDescription: product.products_description,
    productsAdditionalInfo: product.products_additional_info,
    productsCategoryId: product.products_category_id,
    productsFeaturedImage: product.products_featured_image,
  }
}

export const mapSolutionPropertiesToCamelCase = (
  solution: any
): SolutionItem => {
  return {
    title: solution.title,
    shortDescription: solution['short-description'],
    longDescription: solution['long-description'],
    image01: solution['image-01'],
    image02: solution['image-02'],
  }
}

export const mapAboutUsPropertiesToCamelCase = (aboutUs: any): AboutUsItem => {
  return {
    text: aboutUs.text,
    image: aboutUs.image,
  }
}

export const mapAttachmentPropertiesToCamelCase = (
  items: any[]
): Attachment[] => {
  const attachments: Attachment[] = items.map((item: any) => {
    return {
      id: item.id,
      productId: item.product_id,
      attachmentUrl: item.attachment_url,
      attachmentName: item.attachment_name,
      fileSize: '35 KB', // temporary, needs to be replaced by api response
      key: item.attachment_name,
    }
  })
  return attachments
}

export const mapCategoryPropertiesToCamelCase = (items: any[]): Category[] => {
  const categories = items.map((item: any) => {
    return {
      id: item.id,
      categoryName: item.category_name,
      categorySlug: item.category_slug,
      categoryDescription: item.category_description,
      parentId: item.parent_id,
      seoTitle: item.seo_title,
      seoUrl: item.seo_url,
      seoDescription: item.seo_description,
      imageUrl: item.image_url,
      parentCategory: item.parent_category,
      childrenCategories: item.children_categories,
    }
  })
  return categories
}

export const mapBrandPropertiesToCamelCase = (items: any[]): Brand[] => {
  const brands = items.map(brand => {
    return {
      id: brand.id,
      title: brand.title,
      shortDescription: brand.short_description,
      image: brand.image,
      slug: brand.slug,
      isChecked: false,
    }
  })
  return brands
}

export const mapLabelPropertiesToCamelCase = (items: any[]): Label[] => {
  const labels = items.map(label => {
    return {
      id: label.id,
      name: label.name,
      color: label.color,
      model: label.model,
      isChecked: false,
    }
  })
  return labels
}

export const mapBlogPropertiesToCamelCase = (items: any[]): Blog[] => {
  const blogs = items.map(blog => {
    return {
      id: blog.id,
      title: blog.title,
      metaTitle: blog.meta_title,
      metaDescription: blog.meta_description,
      body: blog.body,
      slug: blog.slug,
      language: blog.language,
      featuredType: blog.featured_type,
      featuredMedia: blog.featured_media,
      featuredImage: blog.featured_image,
      featuredImageSet: blog.featured_image_set,
      featuredVideo: blog.featured_video,
      featuredVideoThumb: blog.featured_video_thumb,
      visibility: blog.visibility,
      date: blog.date,
      author: blog.author,
      categories: blog.categories,
      tags: blog.tags,
    }
  })
  return blogs
}
