import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { Card, Button } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CategoryTile.module.scss'
import { client } from '../../utils/client'
import { Category } from '../../types'
import { selectActiveCategory, setActiveCategory } from '../../redux/items'

const CategoryTile = ({ category, other, handleClick } : { category: string, other: boolean, handleClick: any }) => {
  const dispatch = useDispatch()
  const activeCategory = useSelector(selectActiveCategory)

  const handleChange = () => {
    dispatch(setActiveCategory(category))
    handleClick(category)
  }

  return (
    <div
      className= { activeCategory === category ? `${styles.container} ${styles.active}` : styles.container} 
      onClick = {handleChange}
      // elevation = {activeCategory === category ? 0 : 4}
      style = {other ? {backgroundColor: 'var(--color-secondary)', color: 'white'} : {background: 'white'}}
    >
      {/* <Button 
        className= {styles.category} 
        centerRipple
      > */}
        <p 
          className= {activeCategory === category ? `${styles.active}` : ''}
          style = {other ? {color: 'white'} : {color: 'var(--color-offBlack)'}}
        >
          {category}
        </p>
      {/* </Button> */}
    </div>
  )
}

export default CategoryTile