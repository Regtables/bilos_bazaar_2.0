import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../../redux/store'
import { useRouter } from 'next/router'
import { Paper, Button, Grid } from '@mui/material'
import { FaUser } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
import { motion } from 'framer-motion'

import { fetchUser, selectUser, isLoadingUser, logout, setUser } from '../../../redux/auth'
import styles from './User.module.scss'

import ProfileBanner from '../../../components/ProfileBanner/ProfileBanner'
import ProfileSectionList from '../../../components/ProfileSectionList/ProfileSectionList'
import BillingForm from '../../../components/BillingForm/BillingForm'
import Loader from '../../../components/Loader/Loader'
import PaymentCard from '../../../components/PaymentCard/PaymentCard'
import { Payment } from '../../../types'

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
  const isLoading = useSelector(isLoadingUser)

  const { id } = router.query

  useEffect(() => {
    if(id){
      dispatch(fetchUser(id))
    }
  }, [router, dispatch, id])

  const handleLogout = () => {
    dispatch(setUser({}))
    logout(dispatch)
    router.push('/auth')
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
            setDestinationProvince = {() => {}}
          />
          <div className= {styles.delete}>
            <Button variant='contained' type = 'submit'>Delete Profile</Button>
          </div>
        </>
      )
    } else if(activeSection.section === 'payments') {
      console.log(userInfo.payments)
      return (
        <Grid container spacing = {2}>
          {userInfo?.payments?.map((payment: Payment, i: number) => (
            <Grid item sm = {12}>
              <PaymentCard payment = {payment} />
            </Grid>
          ))}
        </Grid>
      )
      
    } else if(activeSection.section === 'wishlist') {
      return (
        userInfo?.wishlist?.map((item: string, i: number) => (
          <p key = {i}>Item</p>
        ))
      )
    }
  }

  return (
    <>
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
              setActiveSection = {setActiveSection}
            />
          </motion.div>
  
          <motion.div 
            className= {styles.activeSection}
            whileInView = {{x: [200, 0], opacity: [0, 1]}} 
            initial = {{opacity: 0}}
            transition = {{duration: 0.3}}
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