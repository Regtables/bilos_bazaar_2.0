import React from 'react'
import { FaFacebookF } from 'react-icons/fa'

import styles from './Facebook.module.scss'

const Facebook = () => {
  return (
    <div className= {styles.container}>
      <a href = 'https://web.facebook.com/profile.php?id=100063704474726' target = '_blank' rel = 'norefferer'>
        <FaFacebookF />
      </a>
    </div>
  )
}

export default Facebook