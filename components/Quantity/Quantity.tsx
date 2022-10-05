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

const Quantity = ({ qty, incQty, decQty } : { qty: number, incQty: any, decQty: any }) => {
  // const mStyles = useStyles();

  return (
    <div className = {styles.container}>
      <Button 
        className= {`${styles.less} ${styles.button}`}
        onClick = {decQty}
        variant = 'outlined'
        disabled = { qty === 0 && true }
        sx = {{
          color: 'var(--color--offBlack)',
          border: 'var(--color-offBlack) solid 1px',
          borderRadius: '20px 0 0 20px',
          "&:hover": {
            border: '1px solid var(--color-primary)',
            // backgroundColor: 'rgba(255, 0, 0, 0.056)'
          }
        }}
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