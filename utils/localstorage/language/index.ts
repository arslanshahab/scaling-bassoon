const isRunningOnServer = typeof window === 'undefined'

export const setLanguage = (value: string) => {
  localStorage.setItem('language', value)
}

export const getLanguage = () => {
  if (isRunningOnServer) {
    // when running on server, there is no concept of localStorage
    return 'en'
  }

  const value = localStorage.getItem('language')
  return value || 'en'
}
