import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { BsBagFill, BsChevronCompactDown } from 'react-icons/bs'
import { IoBed, IoCloseCircleOutline } from 'react-icons/io5'
import { MdBeachAccess } from 'react-icons/md'
import { AiFillHome, AiFillPhone } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'

import styles from './MobileNavbar.module.scss'
import { selectUser } from '../../redux/auth'
import { selectTotalCartItems, toggleCart } from '../../redux/cart'
import { selectProducts, setActiveCategory } from '../../redux/items'

import GlobalSearch from '../GlobalSearch/GlobalSearch'
import Facebook from '../Icons/Facebook/Facebook'
import Instagram from '../Icons/Instagram/Instagram'
import CategoryAccordion from './CategoryAccordion/CategoryAccordion'


const MobileNavbar = () => {
  const user = useSelector(selectUser)
  const totalBagItems = useSelector(selectTotalCartItems)
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)
  const [animateMenu, setAnimateMenu] = useState({})
  const [activeItem, setActiveItem] = useState('')

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClose()
  })
  
  useEffect(() => {
    handleClose()
  }, [router])

  const handleMenuToggle = () => {
    setActiveItem('')
    setToggleMenu(true)
    setAnimateMenu({x: ['-400px', '0px']})
  }

  const handleClose = () => {
    setAnimateMenu({x: ['0px', '-400px']})

    setTimeout(() => {
      setToggleMenu(false)
    }, 400);
  }

  const handleLinkClick = (link) => {
    setActiveItem(link.slug.current)
    dispatch(setActiveCategory('all'))

    if(activeItem === link.slug.current){
      router.push(`/products/${link.slug.current}`)
    }
  }

  const handleCategoryClick = (category, product) => {
    if(category === 'all'){
      dispatch(setActiveCategory('all'))
      router.push(`/products/${product.slug.current}`)
    } else {
      dispatch(setActiveCategory(category.category))
      router.push(`/products/${category.product.slug.current}`)
    }
  }

  return (
    <div className= {styles.container}>
      <div className= {styles.icons}>
        <div className= {styles.menu_icon} onClick = {handleMenuToggle}>
          <FiMenu height={30} width = {30} />
        </div>
        <Link href = {user?._id ? `/user/${user._id}` : `/auth`}>
          <div className= {styles.user_icon}>
            <FaUser height={20} width = {20} />
            {user?._id && (
              <div className = {styles.logged_in}/>
            )}
          </div>
        </Link>
        <div className= {styles.bag_icon} onClick = {() => dispatch(toggleCart(true))}>
          <BsBagFill height={20} width = {20} />
          <div className = {styles.bag_item_count}>
            <p>{totalBagItems}</p>
          </div>
        </div>
      </div>
      <Link href = '/'>
        <div className = {styles.logo}>
          <h3>{"Bilo's"}</h3>
          <div className = {styles.image}>
            <Image 
              src = '/logo-no-border.png'
              layout = 'fill'
            />
          </div>
          <h3>Bazaar</h3>
        </div>
      </Link>
      {toggleMenu && (
        <motion.div 
          className = {styles.menu} 
          // onClick = {() => setToggleMenu(false)}
          animate = {animateMenu}
          transition = {{duration: 0.3}}
          { ...handlers }
        >
          <div className = {styles.logo}>
            <h3>{"Bilo's"}</h3>
            <div className = {styles.image}>
              <Image 
                src = '/logo-no-border.png'
                layout = 'fill'
              />
            </div>
            <h3>Bazaar</h3>
            <div className= {styles.close} onClick = {handleClose}>
              <p><IoCloseCircleOutline /></p>
            </div>
          </div>
          <div className= {styles.content}>
            <div className = {styles.search}>
            <GlobalSearch />
            </div>

            <div className = {styles.links}>
              <Link href = '/'>
                <div className = {styles.link}>
                  <p><AiFillHome /></p>
                  <h4>Home</h4>
                </div>
              </Link>
              {products.map((product, i) => (
                <div>
                  <CategoryAccordion 
                    product={product} 
                    icon = {product.product === 'home decor' ? <IoBed /> : <MdBeachAccess />} 
                    handleClick = {handleCategoryClick}
                  />
                </div>
              ))}
              {/* {products.map((product) => (
                <>
                  <div className = {styles.link} key = {product._id}>
                    <p>{product.product === 'home decor' ? <IoBed /> : <MdBeachAccess />}</p>
                    <h4  
                      onClick = {() => handleLinkClick(product)}
                    > 
                      {product.product}
                    </h4>
                    <span onClick={() => setActiveItem('')}><BsChevronCompactDown /></span>
                  </div>

                  {activeItem === product.slug.current && (
                    <motion.div className = {styles.categories}>
                      {product.categories.map((category,i) => (
                        <motion.div 
                          className= {styles.category} 
                          key = {i} 
                          onClick = {() => handleCategoryClick(category)}
                          whileInView = {{opacity: [0,1]}}
                          transition = {{duration: 0.3*i}}
                        >
                          <p>{category.category}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </>
              ))} */}
              <Link href = '/contact'>
                <div className = {styles.link}>
                  <p><AiFillPhone /></p>
                  <h4>Contact</h4>
                </div>
              </Link>
            </div>
          
            <div className = {styles.socials}>
              {/* <h3>Connect with us</h3> */}
              <div className = {styles.icons}>
                <div className= {styles.icon}>
                  <Facebook />
                </div>
                <div className = {styles.icon}>
                  <Instagram />
                </div>
              </div>
              {/* <h5>email</h5>
              <h5>address</h5> */}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default MobileNavbar