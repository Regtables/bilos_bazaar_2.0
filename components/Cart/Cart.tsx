import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Backdrop, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { BsBag } from 'react-icons/bs'
import { IoIosCloseCircleOutline} from 'react-icons/io'

import styles from './Cart.module.scss'
import { selectCart } from '../../redux/cart'

const Cart = ({ showCart, setShowCart }: { showCart: boolean, setShowCart: any}) => {
  const [animateCart, setAnimateCart] = useState({})
  const cartItems = useSelector(selectCart)

  console.log(cartItems)

  useEffect(() => {
    if(showCart){
      setAnimateCart({width: ['0%', '50%']})
    }
  }, [showCart])

  const handleClose = () => {
    setAnimateCart({width: ['50%', '0%']})

    setTimeout(() => {
      setShowCart(false)
    }, 300);
  }
  
  return (
    <>
      {showCart && (
        <Backdrop 
          open = {showCart}
          // onClick = {() => setShowCart(false)}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <motion.div 
            className= {styles.container}
            animate = {animateCart}
            transition = {{duration: 0.3}}
          >
            <div className= {styles.heading}>
              <div className= {styles.headingText}>
                <h3>Your shopping bag</h3>
                <BsBag />
              </div>
              <div className= {styles.close} onClick = {handleClose}>
                <IoIosCloseCircleOutline />
              </div>
            </div>

            <div className = {styles.content}>
              {cartItems.length === 0 ? (
                <div className = {styles.empty}>
                  <h3>You have no items in your bag</h3>
                  <Button>Back to shopping</Button>
                </div>
              ) : (
                <div className= {styles.items}>
                  {cartItems.map((item, i) => (
                    <>
                      <h4>{item.item.name}</h4>
                    </>
                  ))}
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