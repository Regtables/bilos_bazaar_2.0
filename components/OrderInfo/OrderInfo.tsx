import React from 'react'
import { Button } from '@mui/material'

import styles from './OrderInfo.module.scss'
import { CartItem } from '../../types'


const OrderInfo = ({deliveryFee, cartTotal, cartItems} : {deliveryFee: number, cartTotal: number, cartItems: [CartItem]}) => {

  return (
    <div className= {styles.container}>
      <div className= {styles.heading}>
        <div>
          <h3>Order Information</h3>
        </div>
        <div className= {styles.edit}>
          edit
        </div>
      </div>

      <div className= {styles.items}>
        {Object.values(cartItems).map((item, i) => (
          <div className= {styles.item} key = {item.variant.id}>
            <div className= {styles.name}>
              <h5>{item.item.name}({item.variant.color})</h5>
            </div> 
            <div className= {styles.qty}>
              <p>x {item.qty}</p>
            </div> 
            <div className= {styles.itemTotal}>
              <p>R {item.item.price*item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      <div className = {styles.totals}>
        <div className = {styles.subTotal}>
          <p>Subtotal</p>
          <p>R {cartTotal}</p>
        </div>
        <div className = {styles.deliveryFee}>
          <p>Delivery Fee</p>
          <p>R {deliveryFee}</p>
        </div>
        <div className= {styles.total}>
          <p>Total</p>
          <p>R {cartTotal+deliveryFee}</p>
        </div>
      </div>

      <div className= {styles.pay}>
        <Button variant = 'contained'>Pay with YOCO</Button>
      </div>
    </div>
  )
}

export default OrderInfo