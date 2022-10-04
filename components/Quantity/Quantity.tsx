import React from 'react'
import { Button } from '@mui/material'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import styles from './Quantity.module.scss'

const Quantity = ({ qty, incQty, decQty } : { qty: number, incQty: any, decQty: any }) => {
  return (
    <div className = {styles.container}>
      <Button 
        className= {`${styles.less} ${styles.button}`}
        onClick = {decQty}
        variant = 'outlined'
        disabled = { qty === 0 && true }
      >
        <AiOutlineMinus />
      </Button>
      <div className= {styles.qty}>
        <p>{qty}</p>
      </div>
      <Button 
        className = {`${styles.more} ${styles.button}`}
        onClick = {incQty}
        variant = 'outlined'
      >
        <AiOutlinePlus />
      </Button>
    </div>
  )
}

export default Quantity