import React from 'react'
import { Select } from 'antd'
import { availableTranslations } from '../../translations/availableTranslations'
import i18n from '../../translations/i18next'
import { setLanguage, getLanguage } from '../../utils/localstorage/language'
import Image from 'next/image'
import styles from './LanguageSwitcher.module.scss'

const { Option } = Select

export default function LanguageSwitcher() {
  const currentLanguage = getLanguage()
  const selectLanguage = (langCode: string): void => {
    setLanguage(langCode)
    i18n.changeLanguage(langCode)
  }

  return (
    <Select
      bordered={false}
      className={styles.select}
      onChange={selectLanguage}
      defaultValue={currentLanguage}>
      {availableTranslations.map(lang => {
        return (
          <Option value={lang.code} key={lang.code}>
            {lang.name}
            <Image
              src={`/flags/${lang.code}.svg`}
              alt='Flag'
              priority
              width='30px'
              height='12px'
              className={styles.flag}
            />
          </Option>
        )
      })}
    </Select>
  )
}
