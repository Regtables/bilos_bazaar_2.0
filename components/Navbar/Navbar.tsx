import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { BsBagFill, BsSearch, BsChevronCompactDown, BsTelephone } from 'react-icons/bs';
import { AiOutlineInstagram, AiOutlineMenu, AiOutlineMail, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { FaFacebookF, FaUser } from 'react-icons/fa';

import styles from './Navbar.module.scss'
import { toggleCart } from '../../redux/cart';
import { selectUser } from '../../redux/auth';
import { Item } from '../../types';
import Cart from '../Cart/Cart';

const links = [
  'Home Decor',
  'Beach'
]

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  return (
    <>
      <div className= {`${styles.container}`}>
        <div className= {styles.logo_container}>
          <Link href={'/'}>
            <div className = {styles.logo}>
              <div className = {styles.logo_image}>
                <Image 
                  src = '/logo-no-border.png'
                  layout='fill'
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
          <div className = {styles.icons}>
            <div className= {styles.socials}>
              <a><AiOutlineInstagram /></a>
              <a><FaFacebookF /></a>
            </div>
            <div className= {styles.website}>
              <BsSearch />

              <div className= {styles.user}>
                <Link href = {user?._id ? `/user/${user._id}` : '/auth'}>
                  <FaUser />
                </Link>
              </div>
              <div 
                className= {styles.bag}
                onClick = {() => dispatch(toggleCart(true))}
              >
                <BsBagFill />
              </div>
            </div>
          </div>

          <div className= {styles.partition}></div>

          <div className= {styles.links}>
            {links.map((link, i) => (
              <Link href = '/' key = {i}>
                <p>{link}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar