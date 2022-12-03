import React, { useEffect, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

import styles from './Hero.module.scss'
import { HeroImage } from '../../types'

import HeroTile from '../HeroTile/HeroTile'

const Hero = ({ data } : { data: HeroImage[] }) => {
  const [activeTile, setActiveTile] = useState(data[0])
  const [index, setIndex] = useState(0)
  const [animateSlide, setAnimateSlide] = useState({})

  useEffect(() => {
    setAnimateSlide({opacity: 0.2})

    setTimeout(() => {
      setActiveTile(data[index])
    }, 200);

    setTimeout(() => {
      setAnimateSlide({opacity: 1})
    }, 300);
  }, [index])

  const handlePrev = () => {
    if(index !== 0){
      setIndex((prev: number) => prev-1)

    } else {
      setIndex(data.length-1)
    }
  }

  const handleNext = () => {
    if(index !== data.length-1){
      setIndex((prev) => prev +1)

    } else {
      setIndex(0)
    }
  }

  return (
    <div className={styles.container}>
      <motion.div className={styles.tile} animate = {animateSlide} transition = {{duration: 0.3}}>
        <HeroTile 
          tile={activeTile}
        />
      </motion.div>
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