import React from 'react'

import styles from './Bag.module.scss'

import DetailedCart from '../../components/DetailedCart/DetailedCart'

const index = () => {
  return (
    <div className= {styles.container}>
      <DetailedCart />
    </div>
  )
}

export default index