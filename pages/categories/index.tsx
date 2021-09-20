import Head from 'next/head'
import React from 'react'
import Layout from '../../components/layout'
import styles from '../../styles/Home.module.scss'
import useTranslation from 'next-translate/useTranslation'
import ProductList from '../../components/product-list'

export default function Categories() {
  const { t } = useTranslation('common')

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Winmed - ${t('categories.titleCase')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <ProductList />
      </Layout>
    </div>
  )
}
