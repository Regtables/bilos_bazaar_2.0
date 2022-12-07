import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsBagFill, BsSearch, BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { AiOutlineInstagram, AiOutlineMenu, AiOutlineMail, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { FaFacebookF, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion'

import styles from './Navbar.module.scss'
import { toggleCart, selectTotalCartItems } from '../../redux/cart';
import { selectProducts, setActiveCategory } from '../../redux/items'
import { selectUser } from '../../redux/auth';
import { Item, Product, Category } from '../../types';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import Facebook from '../Icons/Facebook/Facebook';
import Instagram from '../Icons/Instagram/Instagram';

const Navbar = () => {
  const dispatch = useDispatch()
  const totalCartItems = useSelector(selectTotalCartItems)
  const products = useSelector(selectProducts)
  const user = useSelector(selectUser)
  const router = useRouter();
  const [hover, setHover] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [toggleSearch, setToggleSearch] = useState(false)
  const [animateArrow, setAnimateArrow] = useState({})
  const [animateSearch, setAnimateSearch] = useState({})
  const [animateDropDown, setAnimateDropDown] = useState({})

  const toggleHover = (link: any) => {
    setHover(link)
    setAnimateArrow({rotate: '180deg'})

    if(link){
      setAnimateArrow({rotate: '180deg'})
    } else if(link === '') {
      setAnimateArrow({rotate: '-180deg'})
    }
  }

  const handleToggleSearch = () => {
    if(toggleSearch){
      setToggleSearch(false)
      setAnimateSearch({y: '-100px', opacity: 0})

    } else {
      setToggleSearch(true)
      setAnimateSearch({y: '0px', opacity: 1})
    }
  }

  const handleLinkClick = (link: Product) => {
    setHover('')
    dispatch(setActiveCategory('all'))
    router.push(`/products/${link.slug.current}`)
  }

  return (
    <>
      <div className= {`${styles.container}`} onMouseLeave = {() => toggleHover('')}>
        <div className= {styles.logo_container}>
          <Link href={'/'}>
            <div className = {styles.logo}>
              <div className = {styles.logo_image}>
                <Image 
                  src = '/logo-no-border.png'
                  layout='fill'
                  alt = 'bilos bazaar logo'
                />
              </div>

              <div className= {styles.logo_text}>
                <h1>Bilos Bazaar</h1>
                <div className= {styles.partition}></div>
                <h2>Turkish Cotton</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className= {styles.links_container}>
          <div className = {styles.icons} onMouseEnter = {() => toggleHover('')}>
            <div className= {styles.socials}>
              <div className= {styles.social}>
                <Instagram />
              </div>
              <div className = {styles.social}>
                <Facebook />
              </div>
            </div>
            <motion.div 
              className = {styles.searchBar} 
              animate = {animateSearch} 
              initial = {{y:'-100px', opacity: 0}}
              transition = {{duration: 0.5}}
            >
              <GlobalSearch />
            </motion.div>
            <div className= {styles.website}>
              {/* <div className= {styles.searchbar}>
                {toggleSearch && (
                  <GlobalSearch />
                )}
              </div> */}
              <div className= {styles.search}>
                <div className = {styles.bar}>
                  <div className= {styles.icon} onClick = {handleToggleSearch}>
                    <BsSearch />
                  </div>
                </div>
              </div>

              <Link href = {user?._id ? `/user/${user._id}` : '/auth'}>
                <div className= {styles.user}>  
                  <FaUser />
                  {user?._id && (
                    <div className= {styles.online}></div>
                  )}
                </div>
              </Link>
              <div 
                className= {styles.bag}
                onClick = {() => dispatch(toggleCart(true))}
              >
                <BsBagFill />
                <div className= {styles.totalBagItems}>
                  <p>{totalCartItems}</p>
                </div>
              </div>
            </div>
          </div>

          <div className= {styles.partition}></div>

          <div className= {styles.links} >
            <div className = {styles.contact} onMouseEnter = {() => setHover('')}>
              <Link href = '/contact'>
                <p>contact</p>
              </Link>
            </div>
            <div className= {styles.links_wrapper}>
              {products.map((product: Product, i: number) => (
                <div className = {styles.link}  key = {i}>
                  <div onClick={() => handleLinkClick(product)}>
                    {/* <motion.div animate = {animateArrow}><BsChevronCompactUp /></motion.div> */}
                    <p 
                      onMouseEnter={() => toggleHover(product.product)}
                    >
                      {product.product}<BsChevronCompactDown />
                    </p>
                  </div>
           
                  {hover === product.product && (
                    <motion.div 
                      className= {styles.dropdown}
                      whileInView = {{opacity: [0,1]}}
                      initial = {{opacity: 0}}
                      transition = {{duration: 0.3}}
                    >
                      <>
                        <h3>{product.product}</h3>
                          <div className = {styles.categories}>
                            {product.categories.map((category: Category, i) => (
                              <Link href = {`/products/${product.slug.current}`} key = {category._id}>
                                <p onClick = {() => dispatch(setActiveCategory(category.category))}>{category.category}</p> 
                              </Link>
                            ))}
                          </div>
                      </>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar