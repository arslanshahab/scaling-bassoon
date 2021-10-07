import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { ReactChild, useEffect, useState } from 'react'
import { global } from '../../constants/global'
import { http } from '../../utils/http'
import styles from './FilterProducts.module.scss'

interface IProps {
  filterProducts: (urlParams: string) => void
  productsLength: number
}

interface IFilter {
  id: number
  name: string
  value: string
  type: string
  column: string
  isChecked: boolean
}

const defaultFiltersCount = 4

function FilterProducts({ filterProducts, productsLength }: IProps) {
  const { t, lang } = useTranslation('common')
  const router = useRouter()

  const [productFilters, setProductFilters] = useState<IFilter[]>([])
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false)
  const [initalLoad, setInitialLoad] = useState<boolean>(false)

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

  useEffect(() => {
    if (
      productFilters.length > 0 &&
      Object.keys(router.query).length > 0 &&
      productsLength > 0 &&
      !initalLoad
    ) {
      let allFilters: IFilter[] = [...productFilters]
      Object.entries(router.query).map(([key, val]: any) => {
        switch (key) {
          case global.productFilterType.categories:
            allFilters = applyUrlFilter(
              allFilters,
              global.productFilterType.categories,
              val
            )
            break
          case global.productFilterType.brands:
            allFilters = applyUrlFilter(
              allFilters,
              global.productFilterType.brands,
              val
            )
            break
          case global.productFilterType.labels:
            allFilters = applyUrlFilter(
              allFilters,
              global.productFilterType.labels,
              val
            )
            break
          default:
            break
        }
      })
      setInitialLoad(true)
      setProductFilters(allFilters)
      setShowAllFilters(true)
      const url = generateFiltrationURL(
        allFilters.filter((filter: IFilter) => filter.isChecked)
      )
      filterProducts(url)
    }
  }, [router.query, productFilters.length, productsLength, initalLoad])

  const applyUrlFilter = (allFilters: IFilter[], type: string, val: string) => {
    const matchedFilter = allFilters.find(
      filter => filter.type === type && filter.id === parseInt(val)
    )
    if (matchedFilter) {
      const index = allFilters.indexOf(matchedFilter)
      matchedFilter.isChecked = true
      allFilters[index] = matchedFilter
    }
    return allFilters
  }

  const mapCatgeoryFilters = (items: any[]): IFilter[] => {
    return items.map(item => {
      return {
        id: item.id,
        name: item.category_name,
        value: item.id,
        type: global.productFilterType.categories,
        isChecked: false,
        column: global.productFilterColumn.categories,
      }
    })
  }
  const mapBrandFilters = (items: any[]): IFilter[] => {
    return items.map(item => {
      return {
        id: item.id,
        name: item.title,
        value: item.id,
        type: global.productFilterType.brands,
        isChecked: false,
        column: global.productFilterColumn.brands,
      }
    })
  }
  const mapLabelFilters = (items: any[]): IFilter[] => {
    return items.map(item => {
      return {
        id: item.id,
        name: item.name,
        value: item.id,
        type: global.productFilterType.labels,
        isChecked: false,
        column: global.productFilterColumn.labels,
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
