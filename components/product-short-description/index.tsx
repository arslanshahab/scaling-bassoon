import React, { useState } from 'react'
import styles from './ProductShortDescription.module.scss'
import Button from './../common/button/index'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Attribute } from '../../models/Product'

interface IProps {
  id: number
  productsTitle: string
  productsShortDescription: string
  productsDescription: string
  slug: string
  attributes: Attribute[]
}

const defaultSpecsCount = 4

function ProductShortDescription(props: IProps) {
  const { t } = useTranslation('common')
  const [showAllLabels, setShowAllLabels] = useState<boolean>(false)
  const router = useRouter()

  const renderSpecificationItem = (spec: Attribute) => {
    return (
      <div className={styles['specifications-item']}>
        <h4>{spec.name}</h4>
        <p>{spec.value}</p>
      </div>
    )
  }
  const renderSpecificationsList = () => {
    const { attributes } = props
    return (
      <>
        <h3 className={styles['specifications-title']}>
          {t('specifications')}
        </h3>
        <div className={styles['specifications-item-grid']}>
          <div
            className={`${styles.specifications} ${
              !showAllLabels && attributes?.length > defaultSpecsCount
                ? styles.collapsed
                : styles.expanded
            }`}>
            {attributes
              ?.slice(0, showAllLabels ? attributes?.length : defaultSpecsCount)
              .map(spec => renderSpecificationItem(spec))}
            {!showAllLabels && attributes?.length > defaultSpecsCount && (
              <span
                className={`${styles['view-more-lables-btn']}`}
                onClick={() => setShowAllLabels(true)}>
                <span className={styles.image}>
                  <Image
                    src={`/icons/three-dots.svg`}
                    alt='view more labels'
                    width={20}
                    height={24}
                  />
                </span>
                <span className={styles.text}>{t('showAll')}</span>
              </span>
            )}
          </div>
        </div>
      </>
    )
  }
  return (
    <div className={styles['short-description-wrapper']}>
      <div>
        <h1>{props.productsTitle}</h1>
        <p>{props.productsShortDescription}</p>
        {props.attributes?.length > 0 && renderSpecificationsList()}
        <Button
          className='contact-us-btn'
          fullWidth={false}
          type='button'
          size='md'
          onClick={() =>
            router.push(`/contact?pageSource=categoriesDetail&id=${props.id}`)
          }
          variant='regular'>
          {t('contactUs')}
        </Button>
      </div>
    </div>
  )
}

export default ProductShortDescription
