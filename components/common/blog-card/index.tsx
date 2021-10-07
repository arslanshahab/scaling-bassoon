import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Button from '../button'
import styles from './BlogCard.module.scss'

interface IProps {
  id: number
  date: string
  title: string
  description: string
  image: string
  className?: string | null
  onClick: () => void
}

function BlogCard(props: IProps) {
  const { t } = useTranslation('common')

  return (
    <div className={styles['blog-card']}>
      <div
        className={`${styles['card-image']} ${styles[`${props.className}`]}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${props.image}`}
          alt={props.title}
          layout='fill'
          objectFit='cover'
          className={styles.image}
        />
      </div>
      <div className={styles['blog-card-description']}>
        <p className={styles['blog-card-date']}>{props.date}</p>
        <h4>{props.title}</h4>
        <div
          className={styles['blog-card-desc']}
          dangerouslySetInnerHTML={{
            __html:
              props.description?.length > (props.className ? 75 : 120)
                ? `${props.description.substring(
                    0,
                    props.className ? 75 : 120
                  )}...`
                : props.description,
          }}></div>
        <Button
          size='sm'
          variant='outlined'
          type='button'
          fullWidth
          onClick={props.onClick}>
          {t('moreInfo')}
        </Button>
      </div>
    </div>
  )
}

export default BlogCard
