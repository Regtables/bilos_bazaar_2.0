import React from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CategoryTile.module.scss'
import { client } from '../../utils/client'

const CategoryTile = ({ category }) => {
  const imageProps:any = useNextSanityImage(client, category.image)

  return (
    <div className= {styles.container}>
      <div className= {styles.image}>
        <Image 
          { ...imageProps}
          layout = 'fill'
          objectFit='cover'
        />
      </div>
      <div className= {styles.category}>
        
      </div>
    </div>
  )
}

export default CategoryTile