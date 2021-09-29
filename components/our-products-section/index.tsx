import { Row, Col } from 'antd'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import styles from './OurProducts.module.scss'
import Button from '../common/button'
import { solutions } from '../../constants/solutions'

interface ISolution {
  title: string
  description: string
  image: any
  buttonText: string
  link: string
}

function OurProductsSection() {
  const { t } = useTranslation('common')
  const router = useRouter()

  const renderProductCard = (solution: ISolution, index: number) => {
    return (
      <Col
        span={8}
        xs={{ span: 24 }}
        md={{ span: 8 }}
        lg={{ span: 8 }}
        key={index}>
        <div className={styles['product-card']}>
          <Image
            src={solution.image}
            alt={t(solution.title)}
            layout='responsive'
          />
          <div className={styles['card-body']}>
            <h3>{t(solution.title)}</h3>
            <p>{t(solution.description).substr(0, 100) + '...'}</p>
            <Button
              className={styles.readButton}
              fullWidth
              type='button'
              size='sm'
              variant='regular'
              onClick={() => {
                router.push(solution.link, undefined, { shallow: true })
              }}>
              {t(solution.buttonText)}
            </Button>
          </div>
        </div>
      </Col>
    )
  }
  return (
    <div className={styles['our-products-section']}>
      <div className={styles.container}>
        <h2>{t('ourProducts')}</h2>
        <Row gutter={32}>
          {solutions.map((solution, index) =>
            renderProductCard(solution, index)
          )}
        </Row>
      </div>
    </div>
  )
}

export default OurProductsSection
