import React from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { Button } from '@mui/material'

import styles from './HeroTile.module.scss'
import { client } from '../../utils/client'
import Link from 'next/link'

interface tile {
  image: string,
  title: string,
}

const HeroTile = ({ tile } : { tile: tile}) => {
  const { title, image } = tile
  const imageProps = useNextSanityImage(client, image)

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image 
          { ...imageProps}
          layout = 'fill'
          objectFit='cover'
          priority
        />
      </div>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.button_container}>
        <Link href ='/'>
          <Button variant='contained' className= {styles.button} size = 'large'>Shop Now</Button>
        </Link>
      </div>
    </div>
  )
}

export default HeroTile