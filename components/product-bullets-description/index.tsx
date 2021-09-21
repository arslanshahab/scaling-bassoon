import React from 'react'
import styles from './ProductBulletsDescription.module.scss'

interface IProps {
  productsAdditionalInfo: string
}

function ProductBulletsDescription({ productsAdditionalInfo }: IProps) {
  return (
    <div className={styles['bullets-description-wrapper']}>
      <div dangerouslySetInnerHTML={{ __html: productsAdditionalInfo }} />
    </div>
  )
}

export default ProductBulletsDescription
