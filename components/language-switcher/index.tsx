import React from 'react'
import { Select } from 'antd'
import { availableTranslations } from '../../translations/availableTranslations'
import i18n from '../../translations/i18next'
import { setLanguage } from '../../utils/localstorage/language'

const { Option } = Select

export default function LanguageSwitcher() {
  const selectLanguage = (langCode: string): void => {
    setLanguage(langCode)
    i18n.changeLanguage(langCode)
  }

  return (
    <Select onChange={selectLanguage}>
      {availableTranslations.map(lang => {
        return (
          <Option value={lang.code} key={lang.code}>
            {lang.code}
          </Option>
        )
      })}
    </Select>
  )
}
