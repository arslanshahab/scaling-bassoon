import { Row, Col } from 'antd'
import Image from 'next/image'
import { ReactElement } from 'react'
import Button from '../common/button'
import styles from './ImageSection.module.scss'

interface IProps {
  heading: string
  content: string
  buttonText: string
  image?: StaticImageData
  staticImage?: StaticImageData
  reverse?: boolean
  onClick?: () => void
  hideButton?: boolean
  children?: ReactElement
  orderReverse?: boolean
}

function ImageSection({
  heading,
  content,
  buttonText,
  image,
  reverse,
  onClick,
  orderReverse,
  hideButton,
  children,
  staticImage,
}: IProps) {
  return (
    <div className={styles['image-section']}>
      <Row gutter={48}>
        <Col
          span={12}
          xs={{ span: 24, order: 2 }}
          md={{ span: 12, order: orderReverse ? 1 : 2 }}
          lg={{ span: 12 }}>
          <div>
            <div className={styles['text-wrapper']}>
              <h1 className={styles['small-heading']}>{heading}</h1>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {!hideButton && (
                <Button size='md' variant='regular' onClick={onClick!}>
                  {buttonText}
                </Button>
              )}
            </div>
            {children}
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
            {staticImage! ? (
              <Image
                src={staticImage!}
                alt='About Us - Buildings'
                objectFit='cover'
                className={styles.image}
              />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                alt='About Us - Buildings'
                width={705}
                height={498}
                objectFit='cover'
                className={styles.image}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ImageSection
