import Image from 'next/image'
import React, { useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import Lightbox from 'react-image-lightbox'
import styles from './ProductCarousel.module.scss'

function ProductCarousel(props: any) {
  const galleryRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mainSrc, setMainSrc] = useState(props.images?.[0])
  const [showLightBox, setShowLightBox] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const handleImageClick = () => {
    setShowLightBox(!showLightBox)
    setPhotoIndex(currentIndex)
    setMainSrc(props.images?.[currentIndex])
  }

  const myImageGalleryRenderer = (item: any) => {
    return (
      <div className={styles['image-gallery-image']}>
        <Image
          src={item.original}
          alt='Product Image'
          objectFit='contain'
          width={450}
          height={330}
          onClick={handleImageClick}
          className={styles['gallery-image']}
        />
      </div>
    )
  }

  const renderLightBox = () => {
    const { images } = props
    const imagesLength = images?.length || 0

    return (
      <Lightbox
        mainSrc={mainSrc?.original}
        enableZoom={true}
        clickOutsideToClose={true}
        onCloseRequest={() => setShowLightBox(false)}
        nextSrc={images?.[(photoIndex + 1) % imagesLength]?.original}
        prevSrc={
          images?.[(photoIndex + imagesLength - 1) % imagesLength]?.original
        }
        onMovePrevRequest={() => {
          setPhotoIndex((photoIndex + imagesLength - 1) % imagesLength)
          setMainSrc(images?.[(photoIndex + imagesLength - 1) % imagesLength])
        }}
        onMoveNextRequest={() => {
          setPhotoIndex((photoIndex + 1) % imagesLength)
          setMainSrc(images?.[(photoIndex + 1) % imagesLength])
        }}
      />
    )
  }

  return (
    <div className={styles['product-carousel-wrapper']}>
      {props.images && (
        <ImageGallery
          ref={galleryRef}
          items={props.images}
          onSlide={index => setCurrentIndex(index)}
          thumbnailPosition='bottom'
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={false}
          infinite={true}
          renderItem={myImageGalleryRenderer}
          onImageError={(err: any) => {
            console.log(err)
          }}
        />
      )}
      {showLightBox && renderLightBox()}
    </div>
  )
}

export default ProductCarousel
