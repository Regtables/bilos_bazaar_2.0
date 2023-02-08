import React, { useState } from 'react'
import { Button, Card } from '@mui/material'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { RiRefundLine } from 'react-icons/ri'
import { BsBag } from 'react-icons/bs'

import { Payment } from '../../types'
import styles from './PaymentCard.module.scss'

import CartPreview from '../CartPreview/CartPreview'
import ActionButton from '../ActionButton/ActionButton'

// const ActionButton = ({ text, handleClick, icon } : { text: string, handleClick: any, icon: any}) => {
//   return (
//     <Button 
//       variant = 'contained'
//       sx = {{
//         borderRadius: '20px',
//         padding: '0.4rem 2rem',
//         backgroundColor: 'var(--color-primary)'
//       }}
//       onClick = {handleClick}
//     >
//       {text}{icon}
//     </Button>
//   )
// }

const PaymentCard = ({ payment, handleRefund } : { payment: Payment, handleRefund: any }) => {
  const { amount, chargeId, date, deliveryFee, items } = payment
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <Card sx = {{ padding: '1rem' }} elevation = {4}>
        <div className = {styles.heading}>
          <h3>Payment: {chargeId}</h3>
          <div className= {styles.date}>
            <p>{date}</p>
          </div>
        </div>
        <div className = {styles.totals}>
          <div className = {styles.items}>
            <h5>Items</h5>
            <p>R {amount-deliveryFee}</p>
          </div>
          <div className= {styles.delivery}>
            <h5>Delivery fee</h5>
            <p>R {deliveryFee}</p>
          </div>
          <div className = {styles.total}>
            <h4>Total</h4>
            <p>R {amount}</p>
          </div>
        
        </div>
        <div className = {styles.actions}>
          <div className= {styles.refund}>
            <ActionButton 
              text = 'refund' 
              handleClick={() => handleRefund(chargeId, date)}
              icon = {<RiRefundLine />}  
            />
          </div>
          <div className = {styles.view}>
            <ActionButton 
              text = 'view bag' 
              handleClick={() => setShowPreview(true)} 
              icon = {<BsBag />}
            />
          </div>
        </div>
        <div className = {styles.terms}>
          <p>*Purchases can only be refunded no longer than 5 days after payment*</p>
        </div>
      </Card>
      <CartPreview 
        items = {items} 
        showPreview = {showPreview}
        setShowPreview = {setShowPreview}
        date = {date}
        amount = {amount}
        deliveryFee = {deliveryFee}
      />
    </>
  )
}

export default PaymentCard