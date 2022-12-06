import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../../redux/store'
import { useRouter } from 'next/router'
import { Paper, Button, Grid } from '@mui/material'
import { FaUser } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
import { motion } from 'framer-motion'

import { fetchUser, selectUser, isLoadingUser, logout, setUser, deleteUser } from '../../../redux/auth'
import styles from './User.module.scss'

import ProfileBanner from '../../../components/ProfileBanner/ProfileBanner'
import ProfileSectionList from '../../../components/ProfileSectionList/ProfileSectionList'
import BillingForm from '../../../components/BillingForm/BillingForm'
import Loader from '../../../components/Loader/Loader'
import PaymentCard from '../../../components/PaymentCard/PaymentCard'
import { Item, Payment } from '../../../types'
import WishlistTile from '../../../components/WishlistTile/WishlistTile'
import { selectConfirmed, setConfirmed, setToggleAlert } from '../../../redux/altert'

const user = {
  _type: 'user',
  _id: '124f4351efda',
  name: 'Reghardt',
  surname: 'Pienaar',
  email: 'reghardt7@gmail.com',
  city: 'cape town',
  province: 'western cape',
  payments: [],
  wishlist: []
}

const sections = [
  {
    section: 'profile',
    icon: <FaUser />
  },
  {
    section: 'payments',
    icon: <MdPayment />
  },
  {
    section: 'wishlist',
    icon: <AiFillHeart />
  },
]

const User = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(sections[0])
  const userInfo = useSelector(selectUser)
  const [payments, setPayments] = useState<Payment[]>(userInfo.payments)
  const isLoading = useSelector(isLoadingUser)
  const alertConfirmed = useSelector(selectConfirmed)
  const [animateMain, setAnimateMain] = useState({})

  const { id } = router.query

  useEffect(() => {
    if(id){
      dispatch(fetchUser(id))
    }
  }, [router, dispatch, id])

  useEffect(() => {
    let sortedPayments: Payment[] = []

    for(let i = userInfo?.payments?.length-1; i >= 0; i--){
      sortedPayments.push(userInfo.payments[i])
    }

    setPayments(sortedPayments)
  }, [userInfo])

  useEffect(() => {
    console.log('test')
    if(alertConfirmed === true){
      handleDelete()
    } else{
      console.log('declined')
    }
  }, [alertConfirmed])

  const handleLogout = () => {
    dispatch(setUser({}))
    logout(dispatch)
    router.push('/auth')
  }

  const handleSectionChange = (section: any) => {
    setAnimateMain({y: [0, 50], opacity: 0.2})
    setActiveSection(section)

    setTimeout(() => {
      setAnimateMain({y: [50, 0], opacity: 1})
    }, 300);
  }

  const handleDeleteClick = async () => {
    console.log('deleting')
    dispatch(setToggleAlert({
      toggle: true,
      title: 'Deleting Profile',
      content: 'Are you sure you would like to delete your profile?',
      option: 'no',
      secondOption: {
        option: 'yes'
      }
    }))
  }

  const handleDelete = async () => {
    const response = await dispatch(deleteUser())
      .then((res: any) => {
        if(res.payload.error){
          const { error } = res.payload
          dispatch(setToggleAlert({
            toggle: true,
            title: 'An Error has occurred',
            content: error,
            option: 'okay'
          }))
        } else {
          const { title, content } = res.payload
          router.push('/')
          dispatch(setConfirmed(false))
          dispatch(setToggleAlert({
            toggle: true,
            title: title,
            content: content,
            option: 'okay'
          }))
        }
      })

    console.log(response)
  }

  const renderSection = () => {
    if(activeSection.section === 'profile'){
      return (
        <>
          <BillingForm
            checkout = {false}
            userData = {userInfo}
            billingInformation = {userInfo?.billingInfo}
            setBillingInformation = {() => {}}
            setBillingProvince = {() => {}}
            setDestinationProvince = {() => {}}
            setBillingAddress = {() => {}}
            setConfirmedDestination = {() => {}}
          />
          <div className= {styles.delete}>
            <Button 
              variant='contained' 
              type = 'submit'
              onClick = {handleDeleteClick}
              sx = {{
                backgroundColor: 'red',
                border: '2px solid red',

                "&:hover": {
                  backgroundColor: 'white',
                  color: 'red'
                }
              }}
            >
              Delete Profile
            </Button>
          </div>
        </>
      )
    } else if(activeSection.section === 'payments') {
      return (
        <Grid container spacing = {2}>
          {payments?.map((payment: Payment, i: number) => (
            <Grid item sm = {12} key = {payment.chargeId}>
              <PaymentCard payment = {payment} />
            </Grid>
          ))}
        </Grid>
      )
      
    } else if(activeSection.section === 'wishlist') {
      return (
        <Grid container spacing={2}>
          {userInfo?.wishlist?.map((item: Item, i: number) => (
            <Grid item sm = {12} key = {item?._id}>
              <WishlistTile item={item} />
            </Grid>
          ))}
        </Grid>
      )
    }
  }

  return (
    <>
      <Head>
        <title>{"Bilo's Bazaar - User Profile"}</title>
      </Head>
      <div className= {styles.container}>
        <div className= {styles.banner}>
          <ProfileBanner 
            user = {userInfo} 
            handleLogout = {handleLogout}  
          />
        </div>
  
        <Paper className= {`${styles.content} section__margin`}>
          <motion.div 
            className= {styles.sections} 
            whileInView = {{x: [-200, 0], opacity: [0, 1]}} 
            initial = {{opacity: 0}}
            transition = {{duration: 0.3}}
          >
            <ProfileSectionList 
              sections = {sections}
              activeSection = {activeSection}
              setActiveSection = {handleSectionChange}
            />
          </motion.div>
  
          <motion.div 
            className= {styles.activeSection}
            whileInView = {{x: [200, 0], opacity: [0, 1]}} 
            initial = {{opacity: 0}}
            transition = {{duration: 0.3}}
            animate = {animateMain}
          >
            <div className= {styles.sectionHeading}>
              <h2>{activeSection.icon} {activeSection.section}</h2>
            </div>
  
            <div className= {styles.sectionContent}>
              {renderSection()}
            </div>
          </motion.div>
        </Paper>

        {isLoading && (
          <Loader 
            isLoading = {isLoading}
          />
        )}
      </div>
    </>
  )
}

export default User