import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { BsBagFill } from 'react-icons/bs'

import styles from './ViewCart.module.scss'
import { toggleCart } from '../../redux/cart'

const ViewCart = () => {
  const dispatch = useDispatch()

  return (
    <div className = {styles.container}>
      <Button 
        onClick = {() => dispatch(toggleCart(true))}
        sx = {{
          color: 'white'
        }}
      >
        <BsBagFill />
      </Button>
    </div>
  )
}

export default ViewCart