import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'

import styles from './Instagram.module.scss'

const Instagram = () => {
  return (
    <div className= {styles.container}>
      <a href = 'https://www.instagram.com/bilosbazaar/?next=%2F' target = '_blank' rel = 'noreferrer'>
        <AiOutlineInstagram />
      </a>
    </div>
  )
}

export default Instagram