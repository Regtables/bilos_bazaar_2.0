import React from 'react'

import styles from './CategoryList.module.scss'
import { Category } from '../../types'

import CategoryTile from '../CategoryTile/CategoryTile'

const CategoryList = ({ categories, handleChange } : { categories: Category[], handleChange: any }) => {
  return (
    <div className= {styles.container}>
      <CategoryTile 
        category = 'all'
        other = {false}
        handleClick = {handleChange}
      />
      {categories.map((category, i) => (
        <CategoryTile 
          category={category.category} 
          other = {false}
          key = {i} 
          handleClick = {handleChange}
        />
      ))}
      <CategoryTile 
        category = 'discounted items'
        other = {true}
        handleClick = {handleChange}
      />
      <CategoryTile 
        category= 'latest arrivals' 
        other = {true}
        handleClick = {handleChange}
      />
    </div>

  )
}

export default CategoryList