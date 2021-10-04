import { Row, Col } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { Product } from '../../models/Product'
import ProductCard from '../common/product-card'
import styles from './ProductList.module.scss'

interface IProps {
  products: Product[]
  paginationInfo: IPagination
  loadMoreProducts: (url: string, isPaginatedRequest: boolean) => void
}

interface IPagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  previous_page_url: string
  next_page_url: string
}

function ProductList(props: IProps) {
  const { products, paginationInfo, loadMoreProducts } = props

  const { t } = useTranslation('common')

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
        {products?.length > 0 ? (
          renderProductsList()
        ) : (
          <div className={styles['empty-proudcts-message']}>
            <p>{t('noProducts')}</p>
          </div>
        )}
        {paginationInfo?.next_page_url && (
          <button
            className={styles['btn-view-more']}
            onClick={() =>
              loadMoreProducts(paginationInfo?.next_page_url, true)
            }>
            {t('loadMoreProducts')}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductList
