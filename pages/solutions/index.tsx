import Head from 'next/head'
import React from 'react'
import Layout from '../../components/layout'
import styles from '../../styles/Solutions.module.scss'
import useTranslation from 'next-translate/useTranslation'
import ImageSection from '../../components/image-section'
import { Solution, solutions } from './../../constants/solutions'

export default function Solutions() {
  const { t } = useTranslation('common')

  return (
    <div className={styles['solutions-wrapper']}>
      <Head>
        <title>{`Winmed - ${t('solutions.titleCase')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles.container}>
          <h1>{t('solutions.titleCase')}</h1>
          {solutions.map((solution: Solution, index: number) => {
            return (
              <div key={index} className={styles['solution-card']}>
                <ImageSection
                  heading={t(`${solution.title}`)}
                  content={t(`${solution.description}`)}
                  buttonText={t(`${solution.buttonText}`)}
                  staticImage={solution.imageSecondary || solution.image}
                  reverse
                  orderReverse={index % 2 === 0}
                  icon={solution.icon!}
                  iconName={solution.title}
                />
              </div>
            )
          })}
        </div>
      </Layout>
    </div>
  )
}
