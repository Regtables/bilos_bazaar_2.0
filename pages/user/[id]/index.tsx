import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Paper, Button } from '@mui/material'
import { FaUser } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
import { motion } from 'framer-motion'

import { fetchUser, selectUser, isLoadingUser } from '../../../redux/auth'
import { client } from '../../../utils/client'
import styles from './User.module.scss'

import ProfileBanner from '../../../components/ProfileBanner/ProfileBanner'
import ProfileSectionList from '../../../components/ProfileSectionList/ProfileSectionList'
import BillingForm from '../../../components/BillingForm/BillingForm'

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
  const dispatch = useDispatch()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(sections[0])
  const user = useSelector(selectUser)
  const isLoading = useSelector(isLoadingUser)

  const id = router.query.id

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [router])

  const renderSection = () => {
    if(activeSection.section === 'profile'){
      return (
        <>
          <BillingForm
            checkout = {false}
          />
          <div className= {styles.delete}>
            <Button variant='contained' type = 'submit'>Delete Profile</Button>
          </div>
        </>
      )
    } else if(activeSection.section === 'payments') {
      return (
        user?.payments?.map((payment: string, i: number) => (
          <p key = {i}>Payment</p>
        ))
      )
    } else if(activeSection.section === 'wishlist') {
      return (
        user?.wishlist?.map((item: string, i: number) => (
          <p key = {i}>Item</p>
        ))
      )
    }
  }

  if(isLoading){
    return (
      <p>Loading</p>
    )
  }

  return (
    <>
    {isLoading ? 'loading' : (
      <div className= {styles.container}>
        <div className= {styles.banner}>
          <ProfileBanner user = {user} />
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
      </div>
    )}
    </>
  )
}

// export const getServerSideProps = async () => {
  
// }

export default User