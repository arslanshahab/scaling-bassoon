import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import styles from '../../styles/Brands.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { Col, Row } from 'antd'
import BrandCard from '../../components/brand-card'
import { http } from '../../utils/http'
import { Brand } from '../../models/Brand'

export default function Brands() {
  const { t, lang } = useTranslation('common')
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    http
      .get(`/api/v1/products/get-all-brands`, {
        headers: {
          'Content-Language': lang,
        },
      })
      .then(res => {
        const { items } = res.data?.data
        if (items?.length > 0) {
          const brands = brandPropertiesMapping(items)
          setBrands(brands)
        }
      })
      .catch(err => {
        console.error('API response error', err)
      })
  }, [lang])

  const brandPropertiesMapping = (items: any[]): Brand[] => {
    const brands = items.map(brand => {
      return {
        id: brand.id,
        title: brand.title,
        shortDescription: brand.short_description,
        image: brand.image,
        slug: brand.slug,
      }
    })
    return brands
  }

  const renderBrandsList = () => {
    return (
      <div>
        <Row gutter={{ sm: 16, md: 32 }}>
          {brands.map(brand => {
            return (
              <Col
                span={8}
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                key={brand.id}>
                <BrandCard
                  id={brand.id}
                  title={brand.title}
                  shortDescription={brand.shortDescription}
                  image={brand.image}
                  slug={brand.slug}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  return (
    <div className={styles['brands-wrapper']}>
      <Head>
        <title>{`Winmed - ${t('ourBrands')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container}>
          <h1 className={styles['page-title']}>{t('ourBrands')}</h1>
          {renderBrandsList()}
        </div>
      </Layout>
    </div>
  )
}