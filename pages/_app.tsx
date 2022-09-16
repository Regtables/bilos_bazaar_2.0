import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  ) 
}

export default MyApp
