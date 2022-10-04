import React from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import { MdSummarize } from 'react-icons/md'
import { AiOutlineLock } from 'react-icons/ai'

import styles from './OrderInfo.module.scss'
import { CartItem } from '../../types'
import yoco from '../../public/yoco.svg'


const Yoco = () => {
  return (
    <div style = {{width: 55, height: 35, position: 'relative'}}>
      <Image 
        src={yoco.src}
        height = {yoco.height}
        width = {yoco.width}
        layout = 'fill'
        objectFit='cover'
      />
    </div>
  )
}

const OrderInfo = ({deliveryFee, cartTotal, cartItems} : {deliveryFee: number, cartTotal: number, cartItems: [CartItem]}) => {

  console.log(yoco)

  return (
    <div className= {styles.container}>
      <div className= {styles.heading}>
        <div>
          <h3 className = 'checkout__heading'><MdSummarize />Order Information</h3>
        </div>
        <div className= {styles.edit}>
          <p>EDIT</p>
        </div>
      </div>

      <div className= {styles.items}>
        {Object.values(cartItems).map((item, i) => (
          <div className= {styles.item} key = {item.variant.id}>
            <div className= {styles.name}>
              <p>{item.item.name}({item.variant.color.color})</p>
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
          <h5>Total</h5>
          <h5>R {cartTotal+deliveryFee}</h5>
        </div>
      </div>

      <div className= {styles.pay}>
        <Button variant = 'contained' sx={{borderRadius: '20px', backgroundColor: 'var(--color-primary)', width: '100%'}}>Pay with<Yoco /></Button>
        <p>Secured by YOCO<AiOutlineLock /></p>
        <Image
          height={25}
          width = {100}
          objectFit = 'cover'
          src = '/visa-logo.png'
        />
        <p className= {styles.questions}>Any Questions?</p>
      </div>
    </div>
  )
}

export default OrderInfo