import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { Button } from '@mui/material'

import styles from './HeroTile.module.scss'
import { HeroImage } from '../../types'
import { client } from '../../utils/client'
import { setActiveCategory } from '../../redux/items'

const HeroTile = ({ tile } : { tile: HeroImage }) => {
  const dispatch = useDispatch()
  const { title, image, category } = tile
  const imageProps = useNextSanityImage(client, image)

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image 
          { ...imageProps}
          layout = 'fill'
          objectFit='cover'
          priority
          alt = {title}
        />
      </div>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      {/* <div className = {styles.description}>
        <p>Browse our selected items</p>
      </div> */}
      <div className={styles.button_container}>
        <Link href = {`/products/${category.product.slug.current}`}>
          <Button 
            variant='contained' 
            className= {styles.button} 
            size = 'large'
            onClick={() => dispatch(setActiveCategory(category.category))}
            sx = {{
              color: 'white',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '20px',
              fontFamily: 'var(--font-family)',
              "&:hover": {
                backgroundColor: 'white',
                color: 'var(--color-primary)'
              }
            }}
          >
              Shop Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HeroTile