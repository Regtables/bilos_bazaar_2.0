import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import type { Component } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'

import { store } from '../redux/store'
import { client } from '../utils/client'
import { itemsQuery } from '../utils/queries'
import { setAllItems } from '../redux/items'

import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Cart from '../components/Cart/Cart'

function MyApp({ Component, pageProps, props }: { Component: any, pageProps: AppProps, props: any }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId=''>
        <div>
          <nav>
            <Navbar />
            <Cart />
          </nav>
          <main>
            <Component { ...pageProps } />
          </main>
          <footer>
            {/* <Footer /> */}
          </footer>
        </div>
      </GoogleOAuthProvider>
    </Provider>
  ) 
}

// MyApp.getInitialProps = async () => {
//   const allItems = await client.fetch(itemsQuery())

//   console.log(allItems)

//   return {
//     props: {
//       allItems
//     },
//     revalidate: 1
//   }
// }

export default MyApp
