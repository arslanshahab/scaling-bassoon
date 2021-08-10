import { getLanguage } from '../utils/localstorage/language'
import { availableTranslations } from './availableTranslations'

const isRunningOnServer = typeof window === 'undefined'
const availableTranslationCodes = availableTranslations.map(t => t.code)

const getNavigatorLanguages = () => {
  if (isRunningOnServer) {
    // when running on server, there is no concept of localStorage
    return []
  }
  return navigator.languages || [navigator.language]
}

export const getChosenLang = (): string => {
  let chosenLang = getLanguage()
  if (!chosenLang) {
    // Detect users browser languages (including country codes)
    const userLangsWithCountry = getNavigatorLanguages()

    // Strip out the country code. i.e. 'en-US' => 'en'
    const userLangCodes = userLangsWithCountry.map(lang => lang.split(/-|_/)[0])

    // Look at browser accepted languages and see if they match any of our available translations
    chosenLang =
      userLangCodes.find(
        code => availableTranslationCodes.indexOf(code) > -1
      ) || availableTranslationCodes[0]
  }
  return chosenLang
}
