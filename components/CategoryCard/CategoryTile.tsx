import React from 'react'
import Image from 'next/image'
import Link from '@mui/material'
import { Button, ButtonBase } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CategoryTile.module.scss'
import { client } from '../../utils/client'

const CategoryTile = ( { category } : {category: any}) => {
  const { image, category: name  } = category
  const imageProps = useNextSanityImage(client, image )
  return (
    <ButtonBase className= {styles.container} component = {Link} href = '/'>
      <div className= {styles.overlay}></div>
      <Image 
        { ...imageProps }
        layout = 'fill'
        objectFit = 'cover'
        className= {styles.image}
      />
      <h3 className= {styles.name}>{name}</h3>
    </ButtonBase>
  )
}

export default CategoryTile