import React from 'react'
import { Button } from '@mui/material'

import styles from './BuyNow.module.scss'

const BuyNow = () => {
  return (
    <Button
      className= {styles.button}
      variant = 'outlined'
      sx = {{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        border: 'var(--color-primary) 1px solid',
        fontFamily: 'var(--font-family)',
        color: 'var(--color-primary)',
        transition: 'all 0.3s',
        
        "&:hover": {
          backgroundColor: 'var(--color-primary)',
          color: 'white'
        }
      }}
    >
      Buy Now
    </Button>
  )
}

export default BuyNow