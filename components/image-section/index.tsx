import { Row, Col } from 'antd'
import Image from 'next/image'
import Button from '../common/button'
import styles from './ImageSection.module.scss'

interface IProps {
  heading: string
  paragraphs: string[]
  buttonText: string
  image: any
  reverse?: boolean
  onClick?: () => void
  orderReverse: boolean
}

function ImageSection({
  heading,
  paragraphs,
  buttonText,
  image,
  reverse,
  onClick,
  orderReverse,
}: IProps) {
  return (
    <div className={styles['image-section']}>
      <Row gutter={64}>
        <Col
          span={12}
          xs={{ span: 24, order: 2 }}
          md={{ span: 12, order: orderReverse ? 1 : 2 }}
          lg={{ span: 12 }}>
          <div className={styles['text-wrapper']}>
            <h1 className={styles['small-heading']}>{heading}</h1>
            {paragraphs?.map((para, index) => {
              return <p key={index}>{para}</p>
            })}
            <Button size='md' variant='regular' onClick={onClick!}>
              {buttonText}
            </Button>
          </div>
        </Col>
        <Col
          span={12}
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: orderReverse ? 2 : 1 }}
          lg={{ span: 12 }}>
          <div
            className={`${styles['image-wrapper']} ${
              reverse && styles['img-reverse']
            }`}>
            <Image
              src={image}
              alt='About Us - Buildings'
              objectFit='cover'
              className={styles.image}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ImageSection
