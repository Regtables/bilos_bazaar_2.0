import React from 'react'
import { Backdrop, Grid } from '@mui/material'
import { motion } from 'framer-motion'

import styles from './CartPreview.module.scss'
import { CartItem } from '../../types'
import CartPreviewItemTile from './CartPreviewItemTile/CartPreviewItemTile'
import { BsBag } from 'react-icons/bs'



const CartPreview = ({ items, showPreview, setShowPreview, date, amount, deliveryFee } : { items: CartItem[], showPreview: boolean, setShowPreview: any, date: string, amount: number, deliveryFee: number}) => {

  console.log(items)

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={showPreview}
			className={styles.container}
      onClick = {() => setShowPreview(false)}
    >
      <motion.div 
        className = {styles.cartPreview}
        whileInView = {{y: [50, 0], opacity: [0,1]}}
        initial = {{y: 50, opacity: 0}}
      >
        <header className= {styles.header}>
          <h3><BsBag /> Your Bag on {date}</h3>
          <div className= {styles.count}>
            <p>{items.length} {items.length > 1 ? 'items' : 'item'}</p>
          </div>
        </header>

        <div className = {styles.content}>
          <div className = {styles.items}>
            <Grid container spacing = {1}>
              {items.map((cartItem, i) => (
                <Grid item sm = {12}>
                  <CartPreviewItemTile cartItem = {cartItem} />
                </Grid>
              ))}
            </Grid>
          </div>

          <div className = {styles.totals}>
            <div className = {styles.item_total}>
              <h6>items</h6>
              <p>R {amount - deliveryFee}</p>
            </div>
            <div className = {styles.deliveryFee}>
              <h6>delivery fee</h6>
              <p>R {deliveryFee}</p>
            </div>
            <div className = {styles.total}>
              <h5>total</h5>
              <p>R {amount}</p>
            </div>
          </div>
        </div>
        
      </motion.div>
    </Backdrop>
  )
}

export default CartPreview