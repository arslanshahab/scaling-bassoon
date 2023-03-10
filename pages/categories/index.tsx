import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import styles from './../../styles/Categories.module.scss'
import useTranslation from 'next-translate/useTranslation'
import ProductList from '../../components/product-list'
import SearchProducts from '../../components/search-products'
import { http } from '../../utils/http'
import { Product } from '../../models/Product'
import FilterProducts from '../../components/filter-products'
import OurNewsCarousel from '../../components/our-news-carousel'
import { mapProductPropertiesToCamelCase } from '../../utils/mappings'
import { useWindowWidth } from '@react-hook/window-size'
import { Col, Row, Skeleton } from 'antd'
import { global, SortingDirection } from '../../constants/global'

const perpage = 8
const orderColumn = 'products.ordinal'
const orderDirection = SortingDirection.ASC
const baseURL = `/api/v1/products/get-all-products?paginate=1&perpage=${perpage}&order_column=${orderColumn}&order_direction=${orderDirection}&casting=unsigned&localeColumn=ordinal`

interface ICurrentURL {
  url: string
  isSearch: boolean
}

export default function Categories() {
  const { t, lang } = useTranslation('common')
  const [products, setProducts] = useState<Product[]>([])
  const [paginationInfo, setPaginationInfo] = useState<any>()
  const [currentURL, setCurrentURL] = useState<ICurrentURL>({
    url: baseURL,
    isSearch: false,
  })
  const [visibleSkeletonItems, setVisibleSkeletonItems] = useState({
    newsCarouselItems: 0,
    productListItems: 0,
    spanNewsCarousel: 0,
    spanProductList: 0,
  })
  const onlyWidth = useWindowWidth()

  const { mobileMaxWidth, tabletMaxWidth } = global.ourNews

  useEffect(() => {
    if (onlyWidth < mobileMaxWidth) {
      setVisibleSkeletonItems({
        newsCarouselItems: 1,
        productListItems: 2,
        spanNewsCarousel: 24,
        spanProductList: 24,
      })
    }
    if (onlyWidth > mobileMaxWidth && onlyWidth < tabletMaxWidth) {
      setVisibleSkeletonItems({
        newsCarouselItems: 1,
        productListItems: 2,
        spanNewsCarousel: 12,
        spanProductList: 12,
      })
    }
    if (onlyWidth > tabletMaxWidth) {
      setVisibleSkeletonItems({
        newsCarouselItems: 2,
        productListItems: 4,
        spanNewsCarousel: 12,
        spanProductList: 6,
      })
    }
  }, [onlyWidth, mobileMaxWidth, tabletMaxWidth])

  const renderSkeletonLoading = (param: number, spanNr: number) => {
    return (
      <Row gutter={{ md: 16, sm: 16 }}>
        {[...Array(param).keys()].map((item, index) => (
          <Col
            span={spanNr}
            xs={{ span: 24 }}
            md={{ span: spanNr }}
            lg={{ span: spanNr }}
            key={index}>
            <>
              <Skeleton.Avatar
                size='large'
                style={{ width: '180px', height: '120px' }}
                shape='square'
              />
              <Skeleton active paragraph={{ rows: 2 }} />
            </>
          </Col>
        ))}
      </Row>
    )
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await loadMoreProducts(currentURL.url, false)
        const { items } = response.data?.data || []
        const paginationInfo = response.data?.data?.pagination

        if (items?.length > 0) {
          const products = mapProductPropertiesToCamelCase(items)
          setProducts(getFilteredProducts(products))
          setPaginationInfo(paginationInfo)
        } else {
          setProducts([])
          setPaginationInfo(null)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()
  }, [lang, currentURL])

  // get products where slug is not empty string and short_description is not empty string
  const getFilteredProducts = (products: Product[]): Product[] => {
    const filteredProducts = products.filter(
      product =>
        product.slug !== '' &&
        product.productsShortDescription !== '' &&
        product.slug !== ''
    )
    return sortProductsByOrdinal(filteredProducts)
  }

  // function that takes products as a parameter and sorts them by ordinal and returns the sorted products
  const sortProductsByOrdinal = (products: Product[]): Product[] => {
    return products.sort((a, b) => {
      return a.ordinal - b.ordinal
    })
  }

  const appendLocaleToUrl = (url: string) => {
    return `${url}&locales=${lang}`
  }

  // default function to fetch products, made it separate to handle pagination and
  // avoid conflicts on language switching
  const loadMoreProducts = async (url: string, isPaginatedRequest: boolean) => {
    const response = await http.get(`${appendLocaleToUrl(url)}`, {
      headers: {
        'Content-Language': lang,
      },
    })

    if (isPaginatedRequest) {
      const { items } = response.data?.data || []
      const paginationInfo = response.data?.data?.pagination
      if (items?.length > 0) {
        const products = mapProductPropertiesToCamelCase(items)
        setProducts(prevState =>
          getFilteredProducts([...prevState, ...products])
        )
        setPaginationInfo(paginationInfo)
      }
    }

    return response
  }

  const searchProducts = (searchText: string, withSearch: boolean) => {
    if (withSearch) {
      setCurrentURL({
        url: `${baseURL}&search=${searchText}`,
        isSearch: true,
      })
    } else {
      setCurrentURL({
        url: baseURL,
        isSearch: true,
      })
    }
  }

  const filterProducts = (filterParams: string) => {
    setCurrentURL({
      url: `${baseURL}&${filterParams}`,
      isSearch: false,
    })
  }

  return (
    <div>
      <Head>
        <title>{`Winmed - ${t('categories')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles['filteration-col']}>
              <SearchProducts
                searchProducts={(searchText: string, withSearch: boolean) =>
                  searchProducts(searchText, withSearch)
                }
              />
              <FilterProducts
                filterProducts={(urlParams: string) =>
                  filterProducts(urlParams)
                }
                productsLength={products.length}
              />
            </div>
            <div className={styles['slider-col']}>
              <div className={styles.slider}>
                {products?.length > 0 ? (
                  <OurNewsCarousel />
                ) : (
                  <>
                    {renderSkeletonLoading(
                      visibleSkeletonItems.newsCarouselItems,
                      visibleSkeletonItems.spanNewsCarousel
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {products?.length > 0 ? (
          <ProductList
            products={products}
            paginationInfo={paginationInfo}
            loadMoreProducts={(url: string, isPaginateRequest: boolean) =>
              loadMoreProducts(url, isPaginateRequest)
            }
          />
        ) : (
          <div className={styles.container}>
            {renderSkeletonLoading(
              visibleSkeletonItems.productListItems,
              visibleSkeletonItems.spanProductList
            )}
          </div>
        )}
      </Layout>
    </div>
  )
}
