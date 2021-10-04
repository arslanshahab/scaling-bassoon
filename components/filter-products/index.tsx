import useTranslation from 'next-translate/useTranslation'
import { ReactChild, useEffect, useState } from 'react'
import { http } from '../../utils/http'
import styles from './FilterProducts.module.scss'

interface IProps {
  filterProducts: (urlParams: string) => void
}

interface IFilter {
  id: number
  name: string
  value: string
  column: 'categories:category_id' | 'brand:brand_id' | 'labels:label_id'
  isChecked: boolean
}

const defaultFiltersCount = 4

function FilterProducts({ filterProducts }: IProps) {
  const { t, lang } = useTranslation('common')

  const [productFilters, setProductFilters] = useState<IFilter[]>([])
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false)

  useEffect(() => {
    http
      .get(`/api/v1/products/get-all-filters`, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then(res => {
        const { data } = res.data
        const filters: IFilter[] = [
          ...mapCatgeoryFilters(data.categories),
          ...mapBrandFilters(data.brands),
          ...mapLabelFilters(data.labels),
        ]
        setProductFilters(filters)
      })
      .catch(error => {
        console.error(error)
      })
  }, [lang])

  const mapCatgeoryFilters = (items: any[]): IFilter[] => {
    return items.map(item => {
      return {
        id: item.id,
        name: item.category_name,
        value: item.id,
        type: 'categories',
        isChecked: false,
        column: 'categories:category_id',
      }
    })
  }
  const mapBrandFilters = (items: any[]): IFilter[] => {
    return items.map(item => {
      return {
        id: item.id,
        name: item.title,
        value: item.id,
        type: 'brands',
        isChecked: false,
        column: 'brand:brand_id',
      }
    })
  }
  const mapLabelFilters = (items: any[]): IFilter[] => {
    return items.map(item => {
      return {
        id: item.id,
        name: item.name,
        value: item.id,
        type: 'labels',
        isChecked: false,
        column: 'labels:label_id',
      }
    })
  }

  const handleFilterChange = (event: any, index: any) => {
    const updatedFilters = [...productFilters]
    updatedFilters[index].isChecked = event.target.checked
    const url = generateFiltrationURL(
      updatedFilters.filter((filter: IFilter) => filter.isChecked)
    )
    filterProducts(url)
    setProductFilters(updatedFilters)
  }

  const generateFiltrationURL = (filters: IFilter[]): string => {
    let url: string = ''
    filters.forEach((filter: IFilter, index: number) => {
      if (filter.isChecked) {
        url = url
          .concat(`where[${index}][column]=${filter.column}`)
          .concat('&')
          .concat(`where[${index}][value]=${filter.value}`)
          .concat('&')
          .concat(`where[${index}][operator]==`)
        if (filters.length - 1 !== index) {
          url = url.concat('&')
        }
      }
    })
    return url
  }

  const renderFilter = (filter: IFilter, index: number): ReactChild => {
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
          <span>{filter.name}</span>
        </label>
      </div>
    )
  }
  return (
    <div className={styles['product-filters']}>
      {productFilters
        ?.slice(0, showAllFilters ? productFilters.length : defaultFiltersCount)
        .map((filter: IFilter, index: number) => renderFilter(filter, index))}
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
