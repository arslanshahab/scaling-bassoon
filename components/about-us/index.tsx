import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import ImageSection from '../image-section'
import building from './../../assets/images/building-a.png'
import styles from './AboutUs.module.scss'

function AboutSection() {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <div className={styles['about-section']}>
      <div className={styles.container}>
        <ImageSection
          heading={t('aboutUsHeading')}
          paragraphs={[t('loremIpsumLong')]}
          buttonText={t('aboutUs.titleCase')}
          image={building}
          onClick={() => router.push('/aboutUs')}
        />
      </div>
    </div>
  )
}

export default AboutSection
