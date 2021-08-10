import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import { availableTranslations } from './availableTranslations'
import { getChosenLang } from './translationUtil'

const availableTranslationCodes = availableTranslations.map(t => t.code)
const chosenLang = getChosenLang()

i18n
  .use(Backend) // this loads the languages at runtime from the 'backend' options below
  .use(initReactI18next)
  .init({
    lng: chosenLang,
    fallbackLng: availableTranslationCodes[0],
    debug: false, // This logs messages to the console
    whitelist: [...availableTranslationCodes],
    backend: {
      loadPath: `/translations/{{lng}}.json`,
    },
  })

export const t = i18n.t.bind(i18n)

export default i18n
