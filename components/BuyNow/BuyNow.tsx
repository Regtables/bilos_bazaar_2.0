import React from 'react'
import { Button } from '@mui/material'

import styles from './BuyNow.module.scss'

const BuyNow = () => {
  return (
    <Button
      className= {styles.button}
      variant = 'outlined'
    >
      Buy Now
    </Button>
  )
}

export default BuyNow