import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import Link from 'next/link'
import { BsBagFill, BsSearch, BsChevronCompactDown, BsTelephone } from 'react-icons/bs';
import { AiOutlineInstagram, AiOutlineMenu, AiOutlineMail, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { FaFacebookF, FaUser } from 'react-icons/fa';

import styles from './Navbar.module.scss'
import { toggleCart, selectTotalCartItems } from '../../redux/cart';
import { selectUser } from '../../redux/auth';
import { Item } from '../../types';

const links = [
  {
    link: 'Home Decor',
    slug: 'home-decor'
  },
  {
    link: 'Beach',
    slug: 'beach'
  }
]

const Navbar = () => {
  const dispatch = useDispatch()
  const totalCartItems = useSelector(selectTotalCartItems)
  const user = useSelector(selectUser)
  const [hover, setHover] = useState()

  const toggleHover = (link: any) => {
    setTimeout(() => {
      setHover(link.link)
    }, 300);
  }

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
                <div className= {styles.totalBagItems}>
                  <p>{totalCartItems}</p>
                </div>
              </div>
            </div>
          </div>

          <div className= {styles.partition}></div>

          <div className= {styles.links}>
            {links.map((link, i) => (
              <div className = {styles.link}  key = {i}>
                <Link href = {`/products/${link.slug}`}>
                  <p 
                    // onMouseEnter={() => toggleHover(link)}
                  >
                    {link.link}
                  </p>
                </Link>

                {hover === link.link && (
                  <div className= {styles.dropdown}>
                    <p>categories</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar