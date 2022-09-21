import React, { useState } from 'react'

import styles from './ImageCarousel.module.scss'
import SlideShowImage from '../SlideShowImage/SlideShowImage'

interface itemImage {
  color: string,
  image: {
    asset: {
      _ref: string
    }
  }
}


const ImageCarousel = ({ images, activeVariant } : { images: [itemImage], activeVariant: string }) => {
  console.log(images)
  const [index, setIndex] = useState(0)
  const [activeImage, setActiveImage] = useState(images[index])

  return (
    <div className= {styles.container}>
      <div className= {styles.activeImage}>
        <SlideShowImage image = {activeImage} priority />
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