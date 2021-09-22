import { Row, Col } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { Product } from '../../models/Product'
import { http } from '../../utils/http'
import ProductCard from '../common/product-card'
import styles from './ProductList.module.scss'

const perpage = 4

function ProductList() {
  const { t, lang } = useTranslation('common')
  const [products, setProducts] = useState<Product[]>([])
  const [paginationInfo, setPaginationInfo] = useState<any>()
  const [currentURL, setCurrentURL] = useState<string>(
    `/api/v1/products/get-all-products?paginate=1&perpage=${perpage}`
  )

  useEffect(() => {
    http
      .get(`${currentURL}`, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then(res => {
        const { items } = res.data?.data || []
        const paginationInfo = res.data?.data?.pagination
        if (items?.length > 0) {
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
          setProducts(prevState => [...prevState, ...products])
        }
        setPaginationInfo(paginationInfo)
      })
      .catch(err => {
        console.error('API response error', err)
      })
  }, [lang, currentURL])

  const renderProductsList = () => {
    return (
      <div>
        <Row gutter={{ sm: 16, md: 16 }}>
          {products.map(product => {
            return (
              <Col
                span={6}
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.productsTitle}
                  description={product.productsShortDescription}
                  image={product.productsFeaturedImage}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
  return (
    <div className={styles['products-list-wrapper']}>
      <div className={styles.container}>
        {renderProductsList()}
        {paginationInfo?.next_page_url && (
          <button
            className={styles['btn-view-more']}
            onClick={() => setCurrentURL(paginationInfo?.next_page_url)}>
            {t('loadMoreProducts')}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductList
