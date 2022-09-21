import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { Card, Button } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CategoryTile.module.scss'
import { client } from '../../utils/client'
import { Category } from '../../types'
import { selectActiveCategory, setActiveCategory } from '../../redux/items'

const CategoryTile = ({ category } : { category: string }) => {
  const dispatch = useDispatch()
  const activeCategory = useSelector(selectActiveCategory)

  return (
    <Card 
      className= { activeCategory === category ? `${styles.container} ${styles.active}` : styles.container} 
      onClick = {() => {dispatch(setActiveCategory(category))}}
    >
      <Button 
        className= {styles.category} 
        centerRipple
      >
        <p className= {activeCategory === category ? `${styles.active}` : ''}>{category}</p>
      </Button>
    </Card>
  )
}

export default CategoryTile