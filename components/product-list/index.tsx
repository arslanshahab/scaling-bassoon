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
        const products = res.data?.data?.items || []
        const paginationInfo = res.data?.data?.pagination
        setProducts(prevState => [...prevState, ...products])
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
                  name={product.products_title}
                  description={product.products_short_description}
                  image={product.products_featured_image}
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
