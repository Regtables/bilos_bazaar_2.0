import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { ButtonBase } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'
import Link from 'next/link'


import styles from './CategoryCard.module.scss'
import { Category } from '../../types'
import { setActiveCategory } from '../../redux/items'
import { client } from '../../utils/client'

const CategoryCard = ( { category } : {category: Category}) => {
  const dispatch = useDispatch()
  const { image, category: name, product } = category
  const imageProps: any = useNextSanityImage(client, image )

  return (
    <Link href = {`products/${product.slug.current}`} className= {styles.container}>
      <div className= {styles.container}  onClick = {() => dispatch(setActiveCategory(name))}>
        <div className= {styles.overlay}></div>
        <Image 
          { ...imageProps }
          layout = 'fill'
          objectFit = 'cover'
          className= {styles.image}
        />
        <h3 className= {styles.name}>{name}</h3>
      </div>
    </Link>
  )
}

export default CategoryCard