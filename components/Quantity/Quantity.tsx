import React from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import styles from './Quantity.module.scss'

// const useStyles = makeStyles((theme) => ({
//   button: {
//     color: 'var(--color-offBlack)',
//     border: '1px solid var(--color-offBlack)'
//   },
//   more: {
//     '& hover'
//   }
// }))

const Quantity = ({ qty, incQty, decQty, itemQuantity } : { qty: number, incQty: any, decQty: any, itemQuantity: number }) => {
  // const mStyles = useStyles();

  return (
    <div className = {styles.container}>
      <button
        className= {`${styles.less} ${styles.button}`}
        onClick = {decQty}
        disabled = { qty <= 0 && true }
      >
        <AiOutlineMinus />
      </button>
      <div className= {styles.qty}>
        <p>{ itemQuantity <= 0 ? 0 : qty }</p>
        {/* {qty} */}
      </div>
      <button 
        className = {`${styles.more} ${styles.button}`}
        onClick = {incQty}
        disabled = { qty === itemQuantity ? true : false }
      >
        <AiOutlinePlus />
      </button>
    </div>
  )
}

export default Quantity