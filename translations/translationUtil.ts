import { getLanguage } from '../utils/localstorage/language'
import { availableTranslations } from './availableTranslations'

// Get just the codes.
const availableTranslationCodes = availableTranslations.map(t => t.code)

export const getChosenLang = (): string => {
  let chosenLang = getLanguage()
  if (!chosenLang) {
    // Detect users browser languages (including country codes)
    const userLangsWithCountry = navigator.languages || [navigator.language]

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
