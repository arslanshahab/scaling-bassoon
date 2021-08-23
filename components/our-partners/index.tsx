import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import styles from './OurPartners.module.scss'
import { partners } from '../../constants/partners'
import useTranslation from 'next-translate/useTranslation'

const carouselConfig = {
  showThumbs: false,
  autoPlay: true,
  infiniteLoop: true,
  interval: 6000,
  showStatus: false,
  showArrows: true,
  showIndicators: false,
  centerMode: true,
  centerSlidePercentage: 100 / 5,
}

interface ISlide {
  image: StaticImageData
  name: string
}

function OurPartners() {
  const { t } = useTranslation('common')

  const renderSlide = ({ name, image }: ISlide, index: number) => {
    return (
      <div className={styles['partner-slide']} key={`${name}_${index}`}>
        <Image src={image} alt={name} objectFit='contain' />
      </div>
    )
  }
  return (
    <div className={styles['our-partners']}>
      <div className={styles.container}>
        <h2>{t('ourPartners')}</h2>
        <Carousel {...carouselConfig} className={`${styles['main-carousel']}`}>
          {partners.map((partner, index) => renderSlide(partner, index))}
        </Carousel>
      </div>
    </div>
  )
}

export default OurPartners
