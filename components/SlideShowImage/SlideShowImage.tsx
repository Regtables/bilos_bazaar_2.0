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

const SlideShowImage = ({ image, priority } : { image: any, priority: boolean }) => {
  const imageProps: any = useNextSanityImage(client, image)

  return (
    <div className= {styles.image}>
      <Image 
        { ...imageProps }
        layout = 'fill'
        objectFit='cover'
        priority = {priority}
        alt = 'item image'
      />
    </div>
  )
}

export default SlideShowImage