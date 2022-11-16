import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { Paper, Card } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'

import styles from './Checkout.module.scss'
import { selectCartItems, selectCartTotal } from '../../redux/cart'
import { selectUser } from '../../redux/auth'
import { yocoCharge } from '../../api'

import BillingForm from '../../components/BillingForm/BillingForm'
import Shipping from '../../components/Shipping/Shipping'
import OrderInfo from '../../components/OrderInfo/OrderInfo'

import MotionWrapper from '../../wrappers/MotionWrapper'
import { setToggleAlert } from '../../redux/altert'
import Loader from '../../components/Loader/Loader'

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activeAddress, setActiveAddress] = useState('')
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)
  const user = useSelector(selectUser)
  const [billingInformation, setBillingInformation] = useState(user?.billingInfo)
  const [destinationProvince, setDestinationProvince] = useState({province: '', fee: 0})
  const [confirmedDestination, setConfirmedDestination] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(billingInformation){
      const { apt, streetAddress, city, province, zip} = billingInformation
      if(billingInformation.streetAddress){
        const address = `${apt && apt} ${streetAddress}, ${city}, ${province}, ${zip}`
        setActiveAddress(address)
      }
    }
  }, [billingInformation])



  const handlePayment = async (amount, deliveryFee) => {
    var yoco = new window.YocoSDK({
      publicKey: 'pk_test_72967bc7R4lo7rzf43c4'
    })

    const items = Object.values(cartItems).map((cartItem) => {
      return {
        _type: 'bagItem',
        item: {
          _type: 'reference',
          _ref: cartItem.item._id
        },
        variant: {
          _type: 'variant',
          color: {
            _type: 'reference',
            _ref: cartItem.variant.color._id
          },
          sku: cartItem.variant.sku,
          image: cartItem.variant.image
        },
        qty: cartItem.qty
      }
    })

    yoco.showPopup({
      amountInCents: (amount+deliveryFee)*100,
      currency: 'ZAR',
      name: "Bilo's Bazaar",
      description: 'Thank you for your purchace!',
      callback: async function (result) {
        if (result.error) {
          const errorMessage = result.error.message;
          dispatch(setToggleAlert({
            toggle: true,
            title: 'Something went wrong',
            content: errorMessage,
            option: 'okay'
          }))
      
        } else {
          setIsLoading(true)
          const response = await yocoCharge((amount+deliveryFee)*100, deliveryFee, result.id, user, items)
          
          if(response.error){
            setIsLoading(false)
            dispatch(setToggleAlert({
              toggle: true,
              title: 'Something went wrong',
              content: response.error,
              option: 'okay'
            }))
          } else{
            setIsLoading(false)
            console.log(response)
            dispatch(setToggleAlert({
              toggle: true,
              title: "Thank you for purchace with Bilo's Bazaar!",
              content: 'Thank you for buying something from our store! We hope you love your purchace. You will recieve a reciept in your email soon.',
              option: 'okay'
            }))

            //emailjs
          }
        }
      }
    })
    
  }

  return (
    // <MotionWrapper>
    <>
      <Head>
        <title>{"Bilo's Bazaar - Checkout"}</title>
      </Head>
      <Script
        id="yoco-js"
        src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js">
      </Script>
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
                billingInformation = {billingInformation}
                setBillingInformation = {setBillingInformation}
                setDestinationProvince = {setDestinationProvince}
              />
            </Paper>
            <Paper className= {styles.shipping} elevation = {2}>
              <Shipping 
                activeAddress = {activeAddress}
                setActiveAddress = {setActiveAddress}
                destinationProvince = {destinationProvince}
                confirmedDestination = {confirmedDestination}
                setConfirmedDestination = {setConfirmedDestination}
              
              />
            </Paper>
          </div>
          <Card className = {styles.orderInfo} elevation = {3}>
            <OrderInfo 
              deliveryFee={destinationProvince?.fee || 0} 
              cartTotal = {cartTotal}
              cartItems = {cartItems}
              handlePayment = {handlePayment}
            />
          </Card>
        </div>
      </div>
      {isLoading && (
        <Loader isLoading = {isLoading}/>
      )}
    </>

    // </MotionWrapper>
  )
}

export default Checkout