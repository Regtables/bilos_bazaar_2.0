import React from 'react'
import Image from 'next/image'
import Link from '@mui/material'
import { Button, ButtonBase } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CategoryTile.module.scss'
import { client } from '../../utils/client'

const CategoryTile = ( { category } : {category: any}) => {
  const { image  } = category
  const imageProps = useNextSanityImage(client, image )
  return (
    <ButtonBase className= {styles.container} component = {Link} href = '/'>
      <Image 
        {...imageProps}
        height = {250}
        width = {400}
        objectFit = 'cover'
      />
    </ButtonBase>
  )
}

export default CategoryTile