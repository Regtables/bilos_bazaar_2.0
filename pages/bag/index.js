import React from 'react'
import Head from 'next/head'

import styles from './Bag.module.scss'

import DetailedCart from '../../components/DetailedCart/DetailedCart'

const index = () => {
  return (
    <>
      <Head>
        <title>{"Bilo's Bazaar - Your Bag"}</title>
      </Head>
      <div className= {styles.container}>
        <DetailedCart />
      </div>
    </>
  )
}

export default index