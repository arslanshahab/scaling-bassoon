import React, { useEffect, useState } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useWindowWidth } from '@react-hook/window-size'
import styles from './RelatedProducts.module.scss'
import useTranslation from 'next-translate/useTranslation'
import ProductCard from '../common/product-card'
import { Product } from '../../models/Product'
import Link from 'next/link'

interface IProps {
  recommendedProducts: Product[]
}

function RelatedProducts(props: IProps) {
  const { t } = useTranslation('common')
  const [visibleSlides, setVisibleSlides] = useState(4)
  const onlyWidth = useWindowWidth()

  useEffect(() => {
    if (onlyWidth < 640) {
      setVisibleSlides(1)
    }
    if (onlyWidth > 640 && onlyWidth < 1007) {
      setVisibleSlides(2)
    }
    if (onlyWidth > 1007) {
      setVisibleSlides(4)
    }
  }, [onlyWidth])

  return (
    <div className={styles['related-products-wrapper']}>
      <div className={styles['link-title-md']}>
        <h4>{t('similarProducts')}</h4>
        <Link href='/categories'>{t('showAllProducts')}</Link>
      </div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={8}
        isIntrinsicHeight
        visibleSlides={visibleSlides}
        step={visibleSlides}
        className={styles['related-products-carousel']}
        totalSlides={props.recommendedProducts?.length || 0}>
        <Slider>
          {props.recommendedProducts?.map((product, index) => {
            return (
              <Slide index={index} key={index}>
                <ProductCard
                  id={product.id}
                  name={product.productsTitle}
                  description={product.productsShortDescription}
                  image={product.productsFeaturedImage}
                />
              </Slide>
            )
          })}
        </Slider>
        {/* Arrow buttons, added </> as it was required to have html/children by library */}
        <ButtonBack className={styles['btn-arrow']}>
          <></>
        </ButtonBack>
        <ButtonNext className={styles['btn-arrow']}>
          <></>
        </ButtonNext>
      </CarouselProvider>
      <div className={styles['link-title-sm']}>
        <Link href='/categories'>{t('showAllProducts')}</Link>
      </div>
    </div>
  )
}

export default RelatedProducts
