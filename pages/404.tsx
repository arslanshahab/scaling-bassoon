import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import image404 from './../assets/images/404.png'
import Button from './../components/common/button'
import styles from './../styles/Error.module.scss'
function Custom404() {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{`Winmed - ${t('error404')}`}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={styles['content-wrapper']}>
          <Image src={image404} alt='Error 404' objectFit='contain' />
          <p>{t('error404Text')}</p>
          <Button
            type='button'
            size='md'
            variant='regular'
            onClick={() => router.push('/')}>
            {t('backToMain')}
          </Button>
        </div>
      </Layout>
    </div>
  )
}

export default Custom404
