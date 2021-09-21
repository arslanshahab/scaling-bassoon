import React from 'react'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { Row, Col } from 'antd'
import Layout from '../../components/layout'
import styles from '../../styles/Contact.module.scss'
import ContactAddressSocialLinks from '../../components/contact-address-social'
import ContactForm from '../../components/contact-form'

export default function CategoryDetail() {
  const { t } = useTranslation('common')

  return (
    <div className={styles['contact-wrapper']}>
      <Head>
        <title>{`Winmed - ${t('contact.titleCase')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container}>
          <div className={styles['image-wrapper']}>
            <Row gutter={32}>
              <Col
                span={24}
                xs={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}>
                <ContactAddressSocialLinks />
              </Col>
              <Col
                span={24}
                offset={6}
                xs={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 6 }}
                lg={{ span: 10, offset: 6 }}>
                <ContactForm />
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    </div>
  )
}
