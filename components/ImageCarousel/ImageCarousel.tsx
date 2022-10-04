import React, { useState } from 'react'

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


const ImageCarousel = ({ images, activeVariant } : { images: [itemImage], activeVariant: Variant }) => {
  const [index, setIndex] = useState(0)
  const [activeImage, setActiveImage] = useState(activeVariant.image)
  console.log(activeImage)

  return (
    <div className= {styles.container}>
      <div className= {styles.activeImage}>
        <SlideShowImage image = {activeVariant.image} priority />
      </div>
      <div className= {styles.imageSelect}>
        {images.map((image, i) => (
          <div className= {styles.image} key = {i}>
            <SlideShowImage image = {image} priority = {false} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel