import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'

import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { store } from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId=''>
        <div>
          <nav>
            <Navbar />
          </nav>
          <main>
            <Component {...pageProps} />
          </main>
          <footer>
            {/* <Footer /> */}
          </footer>
        </div>
      </GoogleOAuthProvider>
    </Provider>
  ) 
}

export default MyApp
