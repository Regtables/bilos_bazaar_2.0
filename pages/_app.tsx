import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

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
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
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
