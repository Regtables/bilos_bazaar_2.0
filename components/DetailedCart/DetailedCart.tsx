import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa'
import { BsBagFill, BsArrowLeft } from 'react-icons/bs'
import { Button, Grid, Card } from '@mui/material'

import styles from './DetailedCart.module.scss'
import { selectShowDetailedCart, toggleDetailedCart, selectCartItems, selectCartTotal, selectTotalCartItems } from '../../redux/cart'
import { selectUser } from '../../redux/auth'

import DetailedCartItem from '../DetailedCartItem/DetailedCartItem'


const DetailedCart = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const cartItems = Object.values(useSelector(selectCartItems))
  const cartTotal= useSelector(selectCartTotal)
  const totalItems = useSelector(selectTotalCartItems)
  const toggleCart = useSelector(selectShowDetailedCart)
  const [animateCart, setAnimateCart] = useState({})

  // useEffect(() => {
  //   if(toggleCart){
  //     setAnimateCart({y: ['-1000px', '0px']})
  //   }
  // }, [toggleCart])

  return (
    <>
      {/* {toggleCart && ( */}
        <motion.div 
          className = {`${styles.container} section__padding`}
          animate = {animateCart}
        >
          <header className = {styles.top}>
            <div className = {styles.continue}>
              <Link href = '/'>
                <p><BsArrowLeft />continue shopping</p>
              </Link>
            </div>
            <div className= {styles.heading}>
              <h3>Your bag summary</h3>
              <p>({totalItems} {totalItems > 1 ? 'items' : 'item'})</p>
            </div>
            <div className = {styles.user}>
              <div className = {styles.user}>
                {user._id ? (
                  <Link href = '/auth'>
                    <p>Logged in as {user.username}</p>
                  </Link>
                ) : (
                  <>
                    <p><FaUser /> Log in</p>
                  </>
                )}
              </div>
            </div>
          </header>

          <div className= {styles.content}>
            {cartItems.length === 0 ? (
              <div className = {styles.no_items}>
                <h4>You have no items in your bag</h4>
                <Button>Continue shopping</Button>
              </div>
            ) : (
              <Grid container spacing = {2} className= {styles.items}>
                {cartItems.map((item, i) => (
                  <Grid item sm = {12} key = {i}>
                    <DetailedCartItem bagItem = {item}/>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className = {styles.checkout}>
              <div className= {styles.bag_totals}>
                <div className= {styles.terms}>
                  <p>Shipping and taxes will be calculated at checkout.</p>
                </div>
                <div className= {styles.total}>
                  <div className= {styles.totalText}>
                    <h5>Total</h5>
                  </div>
                  <div className= {styles.amount}>
                    <h5>R {cartTotal}</h5>
                  </div>
                </div>
                <div className= {styles.checkoutButton}>
                  <Link href = '/checkout'>
                    <Button variant = 'contained' className= {styles.btn}>
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
        </motion.div>
      {/* )} */}
    </>
  )
}

export default DetailedCart