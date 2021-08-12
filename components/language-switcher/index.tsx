import React from 'react'
import { Select } from 'antd'
import { availableTranslations } from './availableTranslations'
import Image from 'next/image'
import styles from './LanguageSwitcher.module.scss'
import { useRouter } from 'next/router'

const { Option } = Select

export default function LanguageSwitcher() {
  const router = useRouter()
  const language = router.locale || 'en'

  const changeLanguage = (langCode: string): void => {
    if (langCode) {
      router.push(router.asPath, router.asPath, { locale: langCode })
    }
  }

  return (
    <Select
      bordered={false}
      className={styles.select}
      onChange={changeLanguage}
      defaultValue={language}>
      {availableTranslations.map(lang => {
        return (
          <Option value={lang.code} key={lang.code}>
            <div className={styles['option-content']}>
              {lang.name}
              <Image
                src={`/flags/${lang.code}.svg`}
                alt='Flag'
                priority
                width='30px'
                height='12px'
                className={styles.flag}
              />
            </div>
          </Option>
        )
      })}
    </Select>
  )
}
