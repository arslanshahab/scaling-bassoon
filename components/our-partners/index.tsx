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
import styles from './OurPartners.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { partners } from '../../constants/partners'
import Image from 'next/image'

interface ISlide {
  image: StaticImageData
  name: string
}

function OurPartners() {
  const { t } = useTranslation('common')
  const [visibleSlides, setVisibleSlides] = useState(5)
  const onlyWidth = useWindowWidth()

  useEffect(() => {
    if (onlyWidth < 640) {
      setVisibleSlides(1)
    }
    if (onlyWidth > 640 && onlyWidth < 1007) {
      setVisibleSlides(3)
    }
    if (onlyWidth > 1007) {
      setVisibleSlides(5)
    }
  }, [onlyWidth])
  const renderSlide = ({ name, image }: ISlide, index: number) => {
    return (
      <Slide index={index} key={`${name}_${index}`}>
        <div className={styles['partner-slide']} key={`${name}_${index}`}>
          <Image src={image} alt={name} objectFit='contain' />
        </div>
      </Slide>
    )
  }
  return (
    <div className={styles['our-partners-wrapper']}>
      <h4>{t('ourPartners')}</h4>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={8}
        isIntrinsicHeight
        infinite
        isPlaying
        visibleSlides={visibleSlides}
        step={1}
        className={styles['our-partners-carousel']}
        totalSlides={partners?.length || 0}>
        <Slider>
          {partners.map((partner, index) => renderSlide(partner, index))}
        </Slider>
        {/* Arrow buttons, added </> as it was required to have html/children by library */}
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

export default OurPartners
