import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Alert } from '@mui/material'

import styles from './AddToCart.module.scss'
import { Item, Variant } from '../../types'
import { addCartItem, toggleCart } from '../../redux/cart'

const AddToCart = ({ item, activeVariant, qty } : { item: Item, activeVariant: Variant, qty: number }) => {
  const dispatch = useDispatch()

  const addItem = () => {
    dispatch(addCartItem({
      item: item,
      variant: activeVariant,
      qty: qty
    }))
    dispatch(toggleCart(true))
  }

  return (
    <Button
      variant='contained'
      className= {styles.button}
      onClick = {addItem}
      sx = {{
        backgroundColor: 'var(--color-secondary)',
        borderRadius: '20px',
        width: '100%',
        height: '100%',
        fontSize: '11px',
        fontFamily: 'var(--font-family)',
        transition: 'all 0.3s',
        
        "&:hover": {
          backgroundColor:'var(--color-primary)'
        }
      }}
    >
      Add to Bag
    </Button>
  )
}

export default AddToCart