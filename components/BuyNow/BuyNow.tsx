import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

import styles from './BuyNow.module.scss'
import { addCartItem } from '../../redux/cart'
import { Item, Variant } from '../../types'


const BuyNow = ({ item, activeVariant, qty } : { item: Item, activeVariant: Variant, qty: number }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(addCartItem({
      item: item,
      variant: activeVariant,
      qty: qty
    }))

    router.push('/checkout')
  }

  return (
    <Button
      className= {styles.button}
      variant = 'outlined'
      onClick = {handleClick}
      disabled = {activeVariant.itemQuantity <= 0 ? true: false}
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