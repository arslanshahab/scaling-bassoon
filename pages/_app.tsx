import 'antd/dist/antd.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
