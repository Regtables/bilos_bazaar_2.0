import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'

import { store } from '../redux/store'

import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Cart from '../components/Cart/Cart'
import DetailedCart from '../components/DetailedCart/DetailedCart'
import Alert from '../components/Alert/Alert'
import MobileNavbar from '../components/MobileNavbar/MobileNavbar'
import ViewCart from '../components/ViewCart/ViewCart'

function MyApp({ Component, pageProps, }: { Component: any, pageProps: AppProps, props: any }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId='913174638133-an5ld9u033lhe97r155q0eoiisffdu1u.apps.googleusercontent.com'>
        <div>
        <Alert />
        <Cart />
        <ViewCart />
        {/* <DetailedCart /> */}
          <nav>
            <Navbar />
            <MobileNavbar />
          </nav>
          <main>
            <Component { ...pageProps } />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </GoogleOAuthProvider>
    </Provider>
  ) 
}

export default MyApp
