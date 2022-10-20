import React, { useState } from 'react'
import { Paper, Card } from '@mui/material'
import { useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'

import styles from './Checkout.module.scss'
import { selectCartItems, selectCartTotal } from '../../redux/cart'
import { selectUser } from '../../redux/auth'

import BillingForm from '../../components/BillingForm/BillingForm'
import Shipping from '../../components/Shipping/Shipping'
import OrderInfo from '../../components/OrderInfo/OrderInfo'

const Checkout = () => {
  const [activeAddress, setActiveAddress] = useState('5 wexford mansions, bellair road, vredehoek')
  const [deliveryFee, setDeliveryFee] = useState(400)
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)
  const user = useSelector(selectUser)

  return (
    <div className= {`${styles.container} section__padding`}>
      <div className= {styles.continue}>
        <p><BsArrowLeft />conitnue shopping</p>
      </div>
      <div className= {`${styles.content}`}>
        <div className = {styles.billing}>
          <Paper className = {styles.billingInfo} elevation = {2}>
            <BillingForm
              checkout = {true}
              user = {user}
            />
          </Paper>
          <Paper className= {styles.shipping} elevation = {2}>
            <Shipping 
              activeAddress = {activeAddress}
              setActiveAddress = {setActiveAddress}
            />
          </Paper>
        </div>
        <Card className = {styles.orderInfo} elevation = {3}>
          <OrderInfo 
            deliveryFee={deliveryFee}
            cartTotal = {cartTotal}
            cartItems = {cartItems}
          />
        </Card>
      </div>
    </div>
  )
}

export default Checkout