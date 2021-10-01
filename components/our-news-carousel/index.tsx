import useTranslation from 'next-translate/useTranslation'
import { Row, Col } from 'antd'
import Image from 'next/image'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useWindowWidth } from '@react-hook/window-size'
import Button from './../common/button'
import styles from './OurNewsCarousel.module.scss'
import { useEffect, useState } from 'react'
import { Product } from '../../models/Product'
import { global } from './../../constants/global'
import { useRouter } from 'next/router'
import { http } from '../../utils/http'
import { mapProductPropertiesToCamelCase } from '../../utils/mappings'

function OurNewsCarousel() {
  const { t, lang } = useTranslation('common')
  const [visibleSlides, setVisibleSlides] = useState(2)
  const [products, setProducts] = useState<Product[]>([])
  const onlyWidth = useWindowWidth()
  const router = useRouter()

  const { maxDescriptionLength, mobileMaxWidth, tabletMaxWidth } =
    global.ourNews

  useEffect(() => {
    if (onlyWidth < mobileMaxWidth) {
      setVisibleSlides(1)
    }
    if (onlyWidth > mobileMaxWidth && onlyWidth < tabletMaxWidth) {
      setVisibleSlides(1)
    }
    if (onlyWidth > tabletMaxWidth) {
      setVisibleSlides(2)
    }
  }, [onlyWidth, mobileMaxWidth, tabletMaxWidth])

  useEffect(() => {
    http
      .get(
        `/api/v1/products/get-all-products?order_column=products.id&order_direction=desc&length=4`,
        {
          headers: {
            'Content-Language': lang,
          },
        }
      )
      .then(res => {
        const { items } = res.data?.data || []

        if (items?.length > 0) {
          const products = mapProductPropertiesToCamelCase(items)
          setProducts(products)
        }
      })
      .catch(err => {
        console.error('API response error', err)
      })
  }, [lang])

  const renderSlide = (product: Product) => {
    const {
      id,
      productsFeaturedImage,
      productsTitle,
      productsShortDescription,
    } = product
    return (
      <div className={`slide-item`}>
        <Row gutter={12} key={id}>
          <Col span={8} xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
            <div className={styles['image-section']}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${productsFeaturedImage}`}
                alt={productsTitle}
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Col>
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }}>
            <div className={styles['text-section']}>
              <h4>{productsTitle}</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${productsShortDescription?.substring(
                    0,
                    maxDescriptionLength
                  )}${
                    productsShortDescription.length > maxDescriptionLength
                      ? '...'
                      : ''
                  }`,
                }}></div>
              <Button
                className={styles.readButton}
                fullWidth={true}
                onClick={() => router.push(`/categories/${id}`)}
                size='sm'
                type='button'
                variant='outlined'>
                {t('moreInfo')}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className={styles['our-news']}>
      <h4>{t('ourNews')}</h4>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={8}
        isIntrinsicHeight
        visibleSlides={visibleSlides}
        step={visibleSlides}
        className={styles['main-carousel']}
        totalSlides={products?.length || 0}>
        <Slider>
          {products?.map((product: Product, index: number) => {
            return (
              <Slide index={index} key={index}>
                {renderSlide(product)}
              </Slide>
            )
          })}
        </Slider>
        <ButtonBack className={styles['btn-arrow']}>
          <></>
        </ButtonBack>
        <ButtonNext className={styles['btn-arrow']}>
          <></>
        </ButtonNext>
      </CarouselProvider>
    </div>
  )
}

export default OurNewsCarousel
