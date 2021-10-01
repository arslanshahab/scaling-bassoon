import Image from 'next/image'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Button from '../common/button'
import styles from './BrandCard.module.scss'
import { Brand } from '../../models/Brand'
import { Typography } from 'antd'
import { useRouter } from 'next/router'

function BrandCard(props: Brand) {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className={styles['brand-card']}>
      <div className={styles['card-image']}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${props.image}`}
          alt={props.title}
          layout='fill'
          objectFit='contain'
          className={styles.image}
        />
      </div>
      <div className={styles['card-description']}>
        <h4>{props.title}</h4>
        <Typography.Paragraph
          ellipsis={
            props.shortDescription?.length > 100 && {
              rows: 3,
              expandable: false,
            }
          }>
          {props.shortDescription}
        </Typography.Paragraph>
        <Button
          size='sm'
          variant='outlined'
          type='button'
          onClick={() => router.push(`/categories?brand=${props.slug}`)}
          fullWidth>
          {t('moreInfo')}
        </Button>
      </div>
    </div>
  )
}

export default BrandCard
