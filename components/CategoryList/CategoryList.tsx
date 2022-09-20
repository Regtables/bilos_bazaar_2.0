import React from 'react'

import styles from './CategoryList.module.scss'
import CategoryTile from '../CategoryTile/CategoryTile'

const CategoryList = ({ categories, activeCategory, setActiveCategory } : {categories: [string], activeCategory: string, setActiveCategory: any}) => {
  return (
    <div className= {styles.container}>
      {categories.map((category, i) => (
        <div key = {i}>
          <CategoryTile category={category}/>
        </div>
      ))}
    </div>
  )
}

export default CategoryList