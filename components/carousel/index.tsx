import { Carousel } from 'react-responsive-carousel'
import useTranslation from 'next-translate/useTranslation'
import { Row, Col } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './Carousel.module.scss'
import Button from '../common/button'
import { http } from '../../utils/http'

interface ISlide {
  content: string
  id: number
  image: any
  name: string
  position: any
  system_name: string
}

function Slider() {
  const { t, lang } = useTranslation('common')
  const [slides, setSlides] = useState([])

  useEffect(() => {
    http
      .get(
        `/api/v1/blocks/get-folder-by-name?system_name=slideshow_${lang}&with[0]=blocks&with[1]=parentFolder`,
        {
          headers: {
            'Content-Language': lang,
          },
        }
      )
      .then(res => {
        const slides = res.data?.data?.blocks
        setSlides(slides)
      })
      .catch(err => {
        console.error('API response error', err)
      })
  }, [lang])

  const renderSlide = ({ id, content, name, image }: ISlide) => {
    return (
      <Row gutter={32} key={id}>
        <Col span={12} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className={styles.textSection}>
            <h1>{name}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <Button
              className={styles.readButton}
              type='button'
              fullWidth={false}
              onClick={() => {}}
              size='md'
              variant='regular'>
              {t('moreInfo')}
            </Button>
          </div>
        </Col>
        <Col span={12} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className={styles['image-section']}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
              alt={name}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </Col>
      </Row>
    )
  }
  return (
    <div className={styles['carousel-wrapper']}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows
        autoPlay
        className={styles['main-carousel']}>
        {slides.map(slide => renderSlide(slide))}
      </Carousel>
      <div className={styles['scroll-btn']}>
        <Image
          src={`/icons/arrow-down.svg`}
          alt='arrow-down'
          width={25}
          height={25}
          onClick={() => {
            window.scrollTo({ top: 750, behavior: 'smooth' })
          }}
        />
      </div>
    </div>
  )
}

export default Slider
