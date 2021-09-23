import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { http } from '../../utils/http'
import ImageSection from '../image-section'
import styles from './AboutUs.module.scss'

interface IAboutUs {
  name: string
  content: string
  image: StaticImageData
}

function AboutSection() {
  const { t, lang } = useTranslation('common')
  const router = useRouter()
  const [aboutUsData, setAboutUsData] = useState<IAboutUs | undefined>(
    undefined
  )

  useEffect(() => {
    http
      .get(
        `/api/v1/blocks/get-folder-by-name?system_name=about-us_${lang}&with[0]=blocks&with[1]=parentFolder`,
        {
          headers: {
            'Content-Language': lang,
          },
        }
      )
      .then(res => {
        const aboutUsData: any = res.data?.data?.blocks?.[0]
        setAboutUsData(aboutUsData)
      })
      .catch(err => {
        console.error('API response error', err)
      })
  }, [lang])

  return (
    <div className={styles['about-section']}>
      <div className={styles.container}>
        {aboutUsData && (
          <ImageSection
            heading={aboutUsData.name}
            content={aboutUsData.content}
            buttonText={t('aboutUs.titleCase')}
            image={aboutUsData.image}
            onClick={() => router.push('/aboutUs')}
            orderReverse
          />
        )}
      </div>
    </div>
  )
}

export default AboutSection
