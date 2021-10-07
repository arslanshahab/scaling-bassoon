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
import useTranslation from 'next-translate/useTranslation'
import BlogCard from '../common/blog-card'
import { Blog } from '../../models/Blog'
import { useRouter } from 'next/router'
import styles from './RelatedBlogs.module.scss'

interface IProps {
  recommendedBlogs: Blog[]
  type: string
}

function RelatedBlogs(props: IProps) {
  const { t } = useTranslation('common')
  const router = useRouter()

  const [visibleSlides, setVisibleSlides] = useState(4)
  const onlyWidth = useWindowWidth()

  useEffect(() => {
    if (onlyWidth < 640) {
      setVisibleSlides(1)
    }
    if (onlyWidth > 640 && onlyWidth < 1007) {
      setVisibleSlides(2)
    }
    if (onlyWidth > 1007) {
      setVisibleSlides(3)
    }
  }, [onlyWidth])

  return (
    <div className={styles['related-blogs-wrapper']}>
      <div className={styles['link-title-md']}>
        <h4>{t('similarArticles')}</h4>
      </div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={8}
        isIntrinsicHeight
        visibleSlides={visibleSlides}
        step={visibleSlides}
        className={styles['related-blogs-carousel']}
        totalSlides={props.recommendedBlogs?.length || 0}>
        <Slider>
          {props.recommendedBlogs?.map((blog, index) => {
            return (
              <Slide index={index} key={index}>
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  date={blog.date}
                  description={blog.body}
                  image={blog.featuredImage}
                  className={visibleSlides < 3 ? 'related-card' : ''}
                  onClick={() => router.push(`/${props.type}/${blog.id}`)}
                />
              </Slide>
            )
          })}
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

export default RelatedBlogs
