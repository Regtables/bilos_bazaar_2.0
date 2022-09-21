import React from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image';

import { client } from '../../utils/client';
import styles from './SlideShowImage.module.scss'

interface itemImage {
  color: string,
  image: {
    asset: {
      _ref: string
    }
  }
}

const SlideShowImage = ({ image, priority } : { image: itemImage, priority: boolean }) => {
  const imageProps = useNextSanityImage(client, image.image)

  return (
    <div className= {styles.image}>
      <Image 
        { ...imageProps }
        layout = 'fill'
        objectFit='cover'
        priority = {priority}
      />
    </div>
  )
}

export default SlideShowImage