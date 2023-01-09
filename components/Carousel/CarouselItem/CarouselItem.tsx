import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import React from 'react'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CarouselItem.module.scss'
import { client } from '../../../utils/client'
import { setActiveCategory } from '../../../redux/items'

const CarouselItem = ({ item } : { item: any }) => {
  const { image, title, category } = item
  const imageProps: any = useNextSanityImage(client, image)
  const dispatch = useDispatch()

  return (
    <div className= {styles.container}>
      <Image 
        { ...imageProps }
        layout = 'fill'
        objectFit='cover'
      />
      <div className= {styles.title}>
        <h3>{title}</h3>
      </div>
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

export default CarouselItem