import React, { useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

import styles from './Hero.module.scss'
import { HeroImage } from '../../types'

import HeroTile from '../HeroTile/HeroTile'

const Hero = ({ data } : { data: [HeroImage] }) => {
  const [activeTile, setActiveTile] = useState(data[0])
  const [index, setIndex] = useState(0)

  const handlePrev = () => {
    if(index === 0){
      setIndex(data.length-1)
      setActiveTile(data[index])
    } else {
      setIndex(index-1)
      setActiveTile(data[index])
    }
  }

  const handleNext = () => {
    if(index === data.length-1){
      setIndex(0)
      setActiveTile(data[index])
    } else {
      setIndex(index+1)
      setActiveTile(data[index])
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tile}>
        <HeroTile 
          tile={activeTile}
        />
      </div>
      <div className={styles.prev} onClick = {handlePrev}>
        <AiFillLeftCircle />
      </div>
      <div className={styles.next} onClick = {handleNext}>
        <AiFillRightCircle />
      </div>
      <div className={styles.counter}>
        {data.map((tile, i) => (
          <div className= {index === i ? styles.active : ''} key = {i} onClick = {() => setIndex(i)}>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero