import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Row, Col, Skeleton } from 'antd'
import Layout from '../../../components/layout'
import styles from '../../../styles/CategoriesDetail.module.scss'
import { http } from '../../../utils/http'
import { Product } from '../../../models/Product'
import ProductCarousel from '../../../components/product-carousel'
import ProductShortDescription from '../../../components/product-short-description'
import ProductLongDescription from '../../../components/product-long-description'
import ProductBulletsDescription from '../../../components/product-bullets-description'
import ProductAttachments from '../../../components/product-attachments'
import RelatedProducts from '../../../components/related-products'
import {
  mapAttachmentPropertiesToCamelCase,
  mapProductPropertiesToCamelCase,
  mapSingleProductPropertiesToCamelCase,
} from '../../../utils/mappings'

// category to hide bullets for, temp category by default: name = "Uncategorized" | id = 1 (will be changed later)
const categoryIdForHiddenBullets = 1

export default function CategoryDetail() {
  const { t, lang } = useTranslation('common')
  const [product, setProduct] = useState<Product>()
  const [isFullDesc, setIsFullDesc] = useState<boolean>(false)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    http
      .get(`/api/v1/products/get-single-product-by-id/${id}`, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then((res: any) => {
        const { data } = res.data
        const { recommended_products } = data
        const { attachments } = data
        if (data) {
          const product = {
            // mapping product properties to retain camelCase convention
            ...mapSingleProductPropertiesToCamelCase(data),
            // mapping recommendedProperties properties to retain camelCase convention
            recommendedProducts:
              mapProductPropertiesToCamelCase(recommended_products),
            // mapping attachments properties to retain camelCase convention
            attachments: mapAttachmentPropertiesToCamelCase(attachments),
          }
          // append featured image to product images, to be part of the main carousel
          product.images = [
            {
              id: 0,
              image_path: product.productsFeaturedImage,
              model: '',
              model_id: 0,
            },
            ...product.images,
          ]
          setProduct(product)
          // show full size description if the category matches the hide bullets id AND/OR the data for bullet points is empty
          setIsFullDesc(
            product.categories[0]?.id === categoryIdForHiddenBullets ||
              product.productsAdditionalInfo === '' ||
              product.productsAdditionalInfo === null
          )
        }
      })
      .catch((err: any) => {
        console.error('API response error', err)
      })
  }, [lang, id])

  const renderSkeletonLoading = () => {
    return (
      <Row gutter={[32, 16]}>
        <Col span={24} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 11 }}>
          <Skeleton.Avatar size='large' shape='square' />

          <Row>
            {[...Array(4).keys()].map((item, index) => (
              <div className={styles['img-placeholder']} key={index}>
                <Skeleton.Avatar size='large' shape='square'></Skeleton.Avatar>
              </div>
            ))}
          </Row>
        </Col>
        <Col span={24} xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 13 }}>
          <Skeleton active paragraph={{ rows: 3 }} />
          <Row>
            {[...Array(3).keys()].map((item, index) => (
              <div className={styles['img-placeholder']} key={index}>
                <Skeleton.Avatar size='large' shape='square'></Skeleton.Avatar>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    )
  }

  return (
    <div className={styles['category-details-wrapper']}>
      <Head>
        <title>{`Winmed - ${t('categories')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container} style={{ paddingBottom: '2rem' }}>
          {product ? (
            <>
              <Row gutter={{ sm: 32, md: 48, lg: 48 }}>
                <Col
                  span={24}
                  xs={{ span: 24 }}
                  md={{ span: 11 }}
                  lg={{ span: 11 }}>
                  <ProductCarousel
                    images={
                      product?.images.map(x => {
                        return {
                          original: `${process.env.NEXT_PUBLIC_API_URL}${x.image_path}`,
                          thumbnail: `${process.env.NEXT_PUBLIC_API_URL}${x.image_path}`,
                        }
                      }) || []
                    }
                  />
                </Col>
                <Col
                  span={24}
                  xs={{ span: 24 }}
                  md={{ span: 13 }}
                  lg={{ span: 13 }}>
                  {product && (
                    <ProductShortDescription
                      id={product.id}
                      productsTitle={product.productsTitle}
                      productsDescription={product.productsDescription}
                      productsShortDescription={
                        product.productsShortDescription
                      }
                      attributes={product.attributes}
                      slug={product.slug}
                    />
                  )}
                </Col>
              </Row>
              <Row gutter={{ sm: 32, md: 48, lg: 48 }}>
                <Col
                  span={24}
                  xs={{ span: 24 }}
                  md={{ span: isFullDesc ? 24 : 11 }}
                  lg={{ span: isFullDesc ? 24 : 11 }}>
                  <ProductLongDescription
                    productsDescription={product?.productsDescription!}
                  />
                </Col>
                {!isFullDesc && (
                  <Col
                    span={24}
                    xs={{ span: 24 }}
                    md={{ span: 13 }}
                    lg={{ span: 13 }}>
                    <ProductBulletsDescription
                      productsAdditionalInfo={product?.productsAdditionalInfo!}
                    />
                    <ProductAttachments attachments={product?.attachments!} />
                  </Col>
                )}
              </Row>
            </>
          ) : (
            renderSkeletonLoading()
          )}
        </div>
        {product?.recommendedProducts?.length! > 0 && (
          <div className={styles['related-container']}>
            <Row gutter={{ sm: 32, md: 32, lg: 32 }}>
              <Col
                span={24}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}>
                <RelatedProducts
                  recommendedProducts={product?.recommendedProducts!}
                  category={product?.categories?.[0]?.id!}
                />
              </Col>
            </Row>
          </div>
        )}
      </Layout>
    </div>
  )
}
