import React, { useState, useEffect } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

import styles from './ImageCarousel.module.scss'
import SlideShowImage from '../SlideShowImage/SlideShowImage'
import { Variant } from '../../types'

interface itemImage {
  color: string,
  image: {
    asset: {
      _ref: string
    }
  }
}


const ImageCarousel = ({ variants, activeVariant, activeImage, setActiveImage, index, setIndex } : { variants: Variant[], activeImage: any, setActiveImage: any, index: number, setIndex: any, activeVariant: Variant }) => {
  const [animateActiveImage, setAnimateActiveImage] = useState({})

  useEffect(() => {
    setAnimateActiveImage({opacity: 0.2})

    setTimeout(() => {
      setActiveImage(variants[index].image)
    }, 200);

    setTimeout(() => {
      setAnimateActiveImage({opacity: 1})
    }, 300);
  }, [index])

  useEffect(() => {
    setActiveImage(activeVariant.image)
  }, [activeVariant])

  const handleBack = () => {
    if(index !== 0){
      setIndex((prev: number) => prev-1);
    } else {
      setIndex(variants.length-1)
    }
  }

  const handleNext = () => {
    if(index !== variants.length-1){
      setIndex((prev: number) => prev +1)
    } else {
      setIndex(0)
    }
  }

  const handleImageClick = (image: any, i: number) => {
    setActiveImage(image)
    setIndex(i)
  }
  
  return (
    <div className= {styles.container}>
      <div className= {styles.activeImage}>
        <motion.div className = {styles.activeImage_wrapper} animate = {animateActiveImage} transition = {{duration: 0.3}}>
          <SlideShowImage image = {activeImage} priority />
        </motion.div>
        <div className= {styles.back} onClick = {handleBack}>
          {/* <Button> */}
            <AiFillLeftCircle />
          {/* </Button> */}
        </div>
        <div className= {styles.next} onClick = {handleNext}>
          {/* <Button> */}
            <AiFillRightCircle />
          {/* </Button> */}
        </div>
      </div>
      <div className= {styles.imageSelect}>
        {variants.map((variant: any, i: number) => (
          <div className= {styles.image} key = {i} onClick = {() => handleImageClick(variant.image, i)}>
            <SlideShowImage image = {variant.image} priority = {false} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel