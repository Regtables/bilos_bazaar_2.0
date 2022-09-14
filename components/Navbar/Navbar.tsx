import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsBagFill, BsSearch, BsChevronCompactDown, BsTelephone } from 'react-icons/bs';
import { AiOutlineInstagram, AiOutlineMenu, AiOutlineMail, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { FaFacebookF, FaUser } from 'react-icons/fa';

import styles from './Navbar.module.scss'

const links = [
  'Home Decor',
  'Beach'
]

const Navbar = () => {
  return (
    <div className= {`${styles.container}`}>
      <div className= {styles.logo_container}>
        <Link href={'/'}>
          <div className = {styles.logo}>
            <Image 
              src = '/logo-no-border.png'
              height={80}
              width = {80}
            />
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
              <FaUser />
            </div>
            <div className= {styles.bag}>
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
  )
}

export default Navbar