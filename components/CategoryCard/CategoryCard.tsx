import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { ButtonBase } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CategoryCard.module.scss'
import { Category } from '../../types'
import { setActiveCategory } from '../../redux/items'
import { client } from '../../utils/client'

const CategoryCard = ( { category } : {category: Category}) => {
  const dispatch = useDispatch()
  const { image, category: name, product } = category
  const imageProps: any = useNextSanityImage(client, image )

  return (
    <ButtonBase className= {styles.container} href = {`products/${product.slug.current}`} onClick = {() => dispatch(setActiveCategory(name))}>
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

export default CategoryCard