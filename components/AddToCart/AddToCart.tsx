import React from 'react'
import { Button } from '@mui/material'

import styles from './AddToCart.module.scss'
import { Item } from '../../types'

const AddToCart = () => {
  return (
    <Button
      variant='contained'
      className= {styles.button}
    >
      Add to Bag
    </Button>
  )
}

export default AddToCart