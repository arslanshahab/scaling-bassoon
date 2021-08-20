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
  const { t } = useTranslation('common')
  const [slides, setSlides] = useState([])

  useEffect(() => {
    http
      .get(
        `/api/v1/blocks/get-all-over-folders?with[0]=folders&with[1]=folders.blocks`
      )
      .then(res => {
        // get the slideshow folder only
        const slides = res.data?.data?.[0]?.folders?.find(
          (f: any) => f.system_name === 'slideshow'
        )?.blocks
        setSlides(slides)
      })
      .catch(err => {
        console.error('API response error', err)
      })
  }, [])

  const renderSlide = ({ id, content, name, image }: ISlide) => {
    return (
      <Row gutter={32} key={id}>
        <Col span={12} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <div className={styles.textSection}>
            <h1>{name}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <Button
              className={styles.readButton}
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
        className={styles['main-carousel']}>
        {slides.map(slide => renderSlide(slide))}
      </Carousel>
    </div>
  )
}

export default Slider
