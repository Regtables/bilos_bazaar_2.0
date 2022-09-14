import React from 'react'
import Image from 'next/image'

import styles from './About.module.scss'

const About = () => {
  return (
    <div className= {styles.container}>
      <Image 
        src = '/bilo2.jpeg'
        layout='fill'
        objectFit='cover'
        objectPosition= 'center'
      />
    </div>
  ) 
}

export default About