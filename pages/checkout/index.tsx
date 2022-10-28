import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Paper, Card } from '@mui/material'
import { useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'

import styles from './Checkout.module.scss'
import { selectCartItems, selectCartTotal } from '../../redux/cart'
import { selectUser } from '../../redux/auth'

import BillingForm from '../../components/BillingForm/BillingForm'
import Shipping from '../../components/Shipping/Shipping'
import OrderInfo from '../../components/OrderInfo/OrderInfo'

import MotionWrapper from '../../wrappers/MotionWrapper'

const Checkout = () => {
  const router = useRouter()
  const [activeAddress, setActiveAddress] = useState('5 wexford mansions, bellair road, vredehoek')
  const [deliveryFee, setDeliveryFee] = useState(400)
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)
  const user = useSelector(selectUser)

  console.log(user)

  return (
    // <MotionWrapper>
      <div className= {`${styles.container} section__padding`}>
        <div className= {styles.continue}>
          <p onClick = {() => router.back()}><BsArrowLeft />conitnue shopping</p>
        </div>
        <div className= {`${styles.content}`}>
          <div className = {styles.billing}>
            <Paper className = {styles.billingInfo} elevation = {2}>
              <BillingForm
                checkout = {true}
                userData = {user}
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

    // </MotionWrapper>
  )
}

export default Checkout