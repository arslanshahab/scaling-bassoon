import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../button'
import styles from './EventCard.module.scss'

interface IProps {
  id: number
  date: string
  title: string
  description: string
  image: StaticImageData
}

function EventCard(props: IProps) {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className={styles['event-card']}>
      <Image
        src={props.image}
        alt={props.title}
        layout='responsive'
        className={styles['event-card-image']}
        onClick={() => router.push('/events/1')}
      />
      <div className={styles['event-card-description']}>
        <p className={styles['event-card-date']}>{props.date}</p>
        <h4 onClick={() => router.push('/events/1')}>{props.title}</h4>
        <div
          className={styles['event-card-desc']}
          dangerouslySetInnerHTML={{
            __html:
              props.description?.length > 120
                ? `${props.description.substring(0, 120)}...`
                : props.description,
          }}></div>
        <Button
          size='sm'
          variant='outlined'
          type='button'
          fullWidth
          onClick={() => router.push('/events/1')}>
          {t('moreInfo')}
        </Button>
      </div>
    </div>
  )
}

export default EventCard
