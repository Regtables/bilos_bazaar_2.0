import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Backdrop, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { BsBag } from 'react-icons/bs'
import { IoIosCloseCircleOutline} from 'react-icons/io'
import { useSwipeable } from 'react-swipeable'

import styles from './Cart.module.scss'
import { CartItem } from '../../types'
import { selectCartItems, selectShowCart, toggleCart, selectCartTotal, toggleDetailedCart, selectShowDetailedCart } from '../../redux/cart'

import CartItemTile from '../CartItemTile/CartItemTile'

const Cart = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [animateCart, setAnimateCart] = useState({})
  const showCart = useSelector(selectShowCart)
  const showDetailedCart = useSelector(selectShowDetailedCart)
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)

  const cartItemsArr = Object.values(cartItems)

  const handlers = useSwipeable({
    onSwipedRight: () => handleClose()
  })

  useEffect(() => {
    if(showCart){
      setAnimateCart({x: ['1000px', '0px']})
    }
  }, [showCart])

  useEffect(() => {
    handleClose()
  }, [router])

  const handleClose = () => {
    setAnimateCart({x: ['0px', '1000px']})

    setTimeout(() => {
     dispatch(toggleCart(false))
    }, 300);
  }

  const handleViewClick = () => {
    handleClose()
    dispatch(toggleDetailedCart(true))
  }
  
  return (
    <>
      {showCart && (
        <Backdrop 
          open = {showCart}
          // onClick = {() => dispatch(toggleCart(false))}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <div className= {styles.backdrop} onClick = {handleClose}>
            
          </div>
          <motion.div 
            className= {styles.container}
            animate = {animateCart}
            transition = {{duration: 0.3}}
            initial = {{x: 1000}}
            { ...handlers }
          >
            <div className= {styles.wrapper}>
              <div className= {styles.heading}>
                <div className= {styles.headingText}>
                  <div>
                    <h3>Your shopping bag</h3>
                    {/* <h5>2 Items</h5> */}
                  </div>
                  <div>
                    <BsBag />
                  </div>
                </div>
                <div className= {styles.close} onClick = {handleClose}>
                  <IoIosCloseCircleOutline />
                </div>
              </div>

              <div className = {styles.content}>
                {cartItemsArr.length === 0 ? (
                  <div className = {styles.empty}>
                    <h3>You have no items in your bag</h3>
                    <Button 
                      className = {styles.back} 
                      variant = 'contained'
                      onClick = {handleClose}
                    >
                      Back to shopping
                    </Button>
                  </div>
                ) : (
                  <div className= {styles.items}>
                    {cartItemsArr.map((item: any, i: number) => (
                      <CartItemTile item = {item} key = {i}/>
                    ))}
                  </div>
                )}
              </div>

              {cartItemsArr.length > 0 && (
                <div className= {styles.checkout}>
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
                  <div className= {styles.viewDetailed}>
                    <Link href = '/bag'>
                      <Button
                        sx = {{
                          fontSize: '12px'
                        }}
                        onClick = {handleViewClick}
                      >
                        view detailed cart
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </>
  )
}

export default Cart