import React from 'react'

import styles from './CategoryList.module.scss'
import { Category } from '../../types'

import CategoryTile from '../CategoryTile/CategoryTile'

const CategoryList = ({ categories } : { categories: [Category] }) => {
  return (
    <div className= {styles.container}>
      <CategoryTile 
        category = 'all'
      />
      {categories.map((category, i) => (
        <CategoryTile 
          category={category.category} 
          key = {i} 
        />
      ))}
      <CategoryTile 
        category = 'discounted items'
      />
      <CategoryTile 
        category= 'latest arrivals' 
      />
    </div>

  )
}

export default CategoryList