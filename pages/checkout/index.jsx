import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { Paper, Card } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import emailjs from '@emailjs/browser'

import styles from './Checkout.module.scss'
import { clearCart, selectCartItems, selectCartTotal } from '../../redux/cart'
import { selectUser, setUserBillingInfo } from '../../redux/auth'
import { yocoCharge } from '../../api'

import BillingForm from '../../components/BillingForm/BillingForm'
import Shipping from '../../components/Shipping/Shipping'
import OrderInfo from '../../components/OrderInfo/OrderInfo'

import MotionWrapper from '../../wrappers/MotionWrapper'
import { setToggleAlert } from '../../redux/altert'
import Loader from '../../components/Loader/Loader'

const INITIAL_STATE = {
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  city: '',
  province: '',
  streetAddress: '',
  apt: '',
  zip: '',
  address: ''
}

const PROVINCES = [
	{
		province: 'Western Cape',
		fee: 400,
	},
	{
		province: 'Northen Cape',
		fee: 300,
	},
	{
		province: 'Eastern Cape',
		fee: 0,
	},
	{
		province: 'Free State',
		fee: 200,
	},
	{
		province: 'Kwazulu-Natal',
		fee: 100,
	},
	{
		province: 'Gauteng',
		fee: 300,
	},
	{
		province: 'Limpopo',
		fee: 500,
	},
	{
		province: 'Mpumalanga',
		fee: 600,
	},
	{
		province: 'North West',
		fee: 100,
	},
];

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)
  const user = useSelector(selectUser)

  const [billingAddress, setBillingAddress] = useState('')
  const [differentAddress, setDifferentAddress] = useState('')
  const [billingInformation, setBillingInformation] = useState(user?.billingInfo || INITIAL_STATE)
  const [billingProvince, setBillingProvince] = useState({province: '', fee: 0})
  const [differentProvince, setDifferentProvince] = useState({province: '', fee: 0})
  const [confirmedDestination, setConfirmedDestination] = useState(false)
  const [useDifferentAddress, setUseDifferentAddress] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(useDifferentAddress && differentProvince?.province.length > 0){
      setDeliveryFee(differentProvince.fee)

    } else if (useDifferentAddress && differentProvince?.province.length === 0){
      setDeliveryFee(0)
    } 
  
    else if(!useDifferentAddress && billingProvince.province.length > 0){
      setDeliveryFee(billingProvince.fee)
    }
  }, [useDifferentAddress, differentProvince, billingProvince])

  useEffect(() => {
    if(billingInformation){
      
      if(billingInformation.streetAddress){
        const { apt, streetAddress, city, province, zip } = billingInformation
        const address = `${apt && apt} ${streetAddress}, ${city}, ${province}, ${zip}`
        setBillingProvince(PROVINCES.filter((province) => province.province === billingInformation.province)[0])
        setBillingAddress(address)
        console.log(billingAddress)
      }
    }
  }, [billingInformation])


  const handlePayment = async (amount, deliveryFee) => {
    var yoco = new window.YocoSDK({
      publicKey: 'pk_live_e6c4c82c49RAvGXe9cf4'
    })

    const items = Object.values(cartItems).map((cartItem) => {
      return {
        _type: 'bagItem',
        item: {
          _type: 'reference',
          _ref: cartItem.item._id
        },
        variant: {
          _ref: cartItem.variant._id,
          _type: 'reference',
        },
        qty: cartItem.qty
      }
    })

    console.log(items)

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
          await yocoCharge((amount+deliveryFee)*100, deliveryFee, result.id, user, items)
            .then(async (res) => {
              const { error, payment, stock } = res

              if(error){
                setIsLoading(false)
                dispatch(setToggleAlert({
                  toggle: true,
                  title: 'Something went wrong',
                  content:  error,
                  option: 'okay'
                }))
              } else{
                setIsLoading(false)
                dispatch(clearCart())
              
                dispatch(setToggleAlert({
                  toggle: true,
                  title: "Thank you for purchace with Bilo's Bazaar!",
                  content: 'Thank you for buying something from our store! We hope you love your purchace. You will recieve a reciept in your email soon.',
                  option: 'okay'
                }))
              }
              router.push('/')

              return {
                payment,
                stock
              }

              }).then((res) => {
                console.log(res)

                const { payment, stock } = res
                const { name, surname, phoneNumber, email, streetAddress, city, province, apt, zip } = billingInformation
    
                const { date, amount, chargeId } = payment
     
                const data = {
                  test: '<p style = "color: red;">testing</p>',
                  name: name,
                  surname: surname,
                  phoneNumber: phoneNumber,
                  email: email,
                  amount: amount,
                  paymentId:  chargeId,
                  date: date,
                  billingAddress: billingAddress,
                  deliveryAddress: differentAddress ? differentAddress : billingAddress,
                  items: Object.values(cartItems).map((item,i) => (
                    `<div style = "display: flex; justify-content: space-between; width: 100%">
                      <p style = "text-transform: capitalize; margin-right: 300px">${item.item.name}(${item.variant.color.color}</p>
                      <p>R${item.item.price}</p>
                    </div>`
                  ))
                }
                console.log(data)
                emailjs.send('service_0dttrnw', 'template_70x0fkk', data, 'LC_QO3GOebggMCv_Z')

                for(let i = 0; i < stock.length; i++){
                  console.log(stock[i])

                  emailjs.send('service_0dttrnw', 'template_h66y3qa', stock[i], 'LC_QO3GOebggMCv_Z')
                }

              })
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
                setBillingProvince = {setBillingProvince}
                setBillingAddress = {setBillingAddress}
                setConfirmedDestination = {setConfirmedDestination}
              />
            </Paper>
            <Paper className= {styles.shipping} elevation = {2}>
              <Shipping 
                billingAddress = {billingAddress}
                billingProvince = {billingProvince}
                differentAddress = {differentAddress}
                useDifferentAddress = {useDifferentAddress}
                setDifferentAddress = {setDifferentAddress}
                confirmedDestination = {confirmedDestination}
                setConfirmedDestination = {setConfirmedDestination}
                setUseDifferentAddress = {setUseDifferentAddress}
                setDifferentProvince = {setDifferentProvince}
                differentProvince = {differentProvince}
              
              />
            </Paper>
          </div>
          <Card className = {styles.orderInfo} elevation = {3}>
            <OrderInfo 
              deliveryFee={deliveryFee || 0}
              cartTotal = {cartTotal}
              cartItems = {cartItems}
              handlePayment = {handlePayment}
              confirmedDestination = {confirmedDestination}
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