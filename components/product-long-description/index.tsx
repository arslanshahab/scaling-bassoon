import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import styles from './ProductLongDescription.module.scss'

interface IProps {
  productsDescription: string
}

function ProductLongDescription(props: IProps) {
  const { t } = useTranslation('common')
  return (
    <div className={styles['long-description-wrapper']}>
      <h4>{t('productDescription')}</h4>
      <div
        dangerouslySetInnerHTML={{
          __html: props.productsDescription,
        }}
      />
    </div>
  )
}

export default ProductLongDescription
