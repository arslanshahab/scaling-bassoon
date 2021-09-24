import useTranslation from 'next-translate/useTranslation'
import { ReactChild, useEffect, useState } from 'react'
import { Category } from '../../models/Category'
import { http } from '../../utils/http'
import styles from './FilterProducts.module.scss'

interface IProps {
  filterProducts: (urlParams: string) => void
}

const defaultFiltersCount = 4

function FilterProducts({ filterProducts }: IProps) {
  const { t, lang } = useTranslation('common')

  const [productFilters, setProductFilters] = useState<Category[]>([])
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false)

  useEffect(() => {
    http
      .get(`/api/v1/products/get-all-product-categories`, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then(res => {
        const { data } = res.data
        if (data?.length > 0) {
          const filters = data.map((filter: any) => {
            return {
              id: filter.id,
              categoryName: filter.category_name,
              categorySlug: filter.category_slug,
              categoryDescription: filter.category_description,
              parentId: filter.parent_id,
              seoTitle: filter.seo_title,
              seoUrl: filter.seo_url,
              seoDescription: filter.seo_description,
              imageUrl: filter.image_url,
              parentCategory: filter.parent_category,
              childrenCategories: filter.children_categories,
              isChecked: false,
            }
          })
          setProductFilters(filters)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [lang])

  const handleFilterChange = (event: any, index: any) => {
    const updatedFilters = [...productFilters]
    updatedFilters[index].isChecked = event.target.checked
    const url = generateFiltrationURL(
      updatedFilters.filter((filter: Category) => filter.isChecked)
    )
    filterProducts(url)
    setProductFilters(updatedFilters)
  }

  const generateFiltrationURL = (filters: Category[]): string => {
    let url: string = ''
    filters.forEach((filter: Category, index: number) => {
      if (filter.isChecked) {
        url = url
          .concat(`where[${index}][column]=categories:category_slug`)
          .concat('&')
          .concat(`where[${index}][value]=${filter.categorySlug}`)
          .concat('&')
          .concat(`where[${index}][operator]==`)
        if (filters.length - 1 !== index) {
          url = url.concat('&')
        }
      }
    })
    return url
  }

  const renderFilter = (filter: Category, index: number): ReactChild => {
    return (
      <div className={styles['filter-wrapper']}>
        <label
          className={`${styles['checkbox-wrapper']} ${
            filter.isChecked && styles.checked
          }`}>
          <input
            type='checkbox'
            checked={filter.isChecked}
            onChange={e => handleFilterChange(e, index)}
            className={styles['form-checkbox']}
          />
          <span>{filter.categoryName}</span>
        </label>
      </div>
    )
  }
  return (
    <div className={styles['product-filters']}>
      {productFilters
        ?.slice(0, showAllFilters ? productFilters.length : defaultFiltersCount)
        .map((filter: Category, index: number) => renderFilter(filter, index))}
      {!showAllFilters && productFilters?.length > defaultFiltersCount && (
        <button
          className={styles['btn-view-more']}
          onClick={() => setShowAllFilters(true)}>
          {t('moreFilters')}
        </button>
      )}
    </div>
  )
}

export default FilterProducts
