import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Custom404() {
  const router = useRouter()

  useEffect(() => {
    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : ''
    const path: string[] = pathname.split('/')
    // check if locale is found [length > 2]
    if (path.length > 2 && router.locale !== path[1]) {
      router.replace(`/error404`, `/error404`, { locale: path[1] })
    } else {
      router.replace(`/error404`, `/error404`)
    }
  })

  return null
}

export default Custom404
