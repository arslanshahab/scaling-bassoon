import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Row, Col } from 'antd'
import Layout from '../../../components/layout'
import styles from '../../../styles/CategoriesDetail.module.scss'
import { http } from '../../../utils/http'
import { Product } from '../../../models/Product'
import ProductCarousel from '../../../components/product-carousel'
import ProductShortDescription from '../../../components/product-short-description'

export default function CategoryDetail() {
  const { t, lang } = useTranslation('common')
  const [product, setProduct] = useState<Product>()
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
        const product = res.data?.data
        setProduct(product)
      })
      .catch((err: any) => {
        console.error('API response error', err)
      })
  }, [lang, id])

  return (
    <div>
      <Head>
        <title>{`Winmed - ${t('categories.titleCase')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container} style={{ paddingBottom: '2rem' }}>
          <Row gutter={{ sm: 32, md: 48, lg: 48 }}>
            <Col
              span={12}
              xs={{ span: 12 }}
              md={{ span: 11 }}
              lg={{ span: 11 }}>
              <ProductCarousel
                images={product?.images?.map(x => {
                  return {
                    ...x,
                    original: `${process.env.NEXT_PUBLIC_API_URL}${x.image_path}`,
                    thumbnail: `${process.env.NEXT_PUBLIC_API_URL}${x.image_path}`,
                  }
                })}
              />
            </Col>
            <Col
              span={12}
              xs={{ span: 12 }}
              md={{ span: 13 }}
              lg={{ span: 13 }}>
              {product && (
                <ProductShortDescription
                  id={product.id}
                  products_title={product.products_title}
                  products_description={product.products_description}
                  products_short_description={
                    product.products_short_description
                  }
                  attributes={product.attributes}
                  slug={product.slug}
                />
              )}
            </Col>
          </Row>
        </div>
      </Layout>
    </div>
  )
}
