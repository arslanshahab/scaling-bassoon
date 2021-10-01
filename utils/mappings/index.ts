import { AboutUsItem } from '../../models/AboutPage'
import { Attachment } from '../../models/Attachment'
import { Product } from '../../models/Product'
import { SolutionItem } from '../../models/SolutionPage'

export const mapProductPropertiesToCamelCase = (items: any[]): any[] => {
  const products = items.map((item: any) => {
    return {
      ...item,
      productsTitle: item.products_title,
      productsShortDescription: item.products_short_description,
      productsDescription: item.products_description,
      productsAdditionalInfo: item.products_additional_info,
      productsCategoryId: item.products_category_id,
      productsFeaturedImage: item.products_featured_image,
    }
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

export const mapAttachmentPropertiesToCamelCase = (items: any[]) => {
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
