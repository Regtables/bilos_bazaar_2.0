import React, { useState, useEffect } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

import styles from './ImageCarousel.module.scss'
import SlideShowImage from '../SlideShowImage/SlideShowImage'
import { Variant } from '../../types'
import Carousel from '../Carousel/Carousel'
import Image from 'next/image'

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
    console.log(index)
  }
  
  return (
    <div className= {styles.container}>
      {/* <div className= {styles.activeImage}>
        <motion.div className = {styles.activeImage_wrapper} animate = {animateActiveImage} transition = {{duration: 0.3}}>
          <SlideShowImage image = {activeImage} priority />
        </motion.div>
        <div className= {styles.slider}>
          <div className= {styles.inner} style = {{transform: `translate(-${index*100}%)`}}>
            {variants.map((variant, i) => (
              <SlideShowImage image = {variant.image} priority />
          
            ))}
          </div>
        </div>
        <div className= {styles.back} onClick = {handleBack}>
          <AiFillLeftCircle />
        </div>
        <div className= {styles.next} onClick = {handleNext}>
          <AiFillRightCircle />
        </div>
      </div> */}
      <div className= {styles.carousel}>
        <Carousel activeIndex = {index}>
          {variants.map((variant, i) => (
            <div style = {{minWidth: '100%'}} key = {i}>
              <SlideShowImage image={variant.image} priority />
            </div>
          ))}
        </Carousel>
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