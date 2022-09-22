import React from 'react'
import { Button } from '@mui/material'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import styles from './Quantity.module.scss'

const Quantity = ({ qty, setQty } : { qty: number, setQty: any }) => {
  return (
    <div className = {styles.container}>
      <Button 
        className= {`${styles.less} ${styles.button}`}
        onClick = {() => setQty(qty-1)}
        variant = 'outlined'
      >
        <AiOutlineMinus />
      </Button>
      <div className= {styles.qty}>
        <p>{qty}</p>
      </div>
      <Button 
        className = {`${styles.more} ${styles.button}`}
        onClick = {() => setQty(qty+1)}
        variant = 'outlined'
      >
        <AiOutlinePlus />
      </Button>
    </div>
  )
}

export default Quantity