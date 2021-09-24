export type Category = {
  id: number
  categoryName: string
  categorySlug: string
  categoryDescription: string
  parentId: number
  seoTitle: string
  seoUrl: string
  seoDescription: string
  imageUrl: string
  parentCategory: Category
  childrenCategories: Category[]
  isChecked: boolean
}
