import { Typography } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../button'
import styles from './ProductCard.module.scss'

interface IProps {
  id: number
  name: string
  description: string
  image: any
}

function ProductCard(props: IProps) {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className={styles['product-card']}>
      <div className={styles['card-image']}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${props.image}`}
          alt={props.name}
          layout='fill'
          objectFit='contain'
          className={styles.image}
          onClick={() => router.push(`/categories/${props.id}`)}
        />
      </div>
      <div className={styles['card-description']}>
        <Typography.Paragraph
          onClick={() => router.push(`/categories/${props.id}`)}
          ellipsis
          className={styles.h4}>
          {props.name}
        </Typography.Paragraph>
        <p>{`${props.description?.substring(0, 75)}${
          props.description?.length > 75 ? '...' : ''
        }`}</p>
        <Button
          size='sm'
          variant='outlined'
          type='button'
          fullWidth
          onClick={() => router.push(`/categories/${props.id}`)}>
          {t('moreInfo')}
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
