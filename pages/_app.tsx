import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Navbar from '../components/Navbar/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Component {...pageProps} />
    </div>
  ) 
}

export default MyApp
