import { INameCode } from './INameCode'

// These are the translations the app supports,
// the first will be used as default if none match the users browser preferences

export const availableTranslations: INameCode[] = [
  {
    name: 'EN',
    code: 'en',
  },
  {
    name: 'CZ',
    code: 'cz',
  },
  {
    name: 'SV',
    code: 'sv',
  },
]
