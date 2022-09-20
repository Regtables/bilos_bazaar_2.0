import React from 'react'

import styles from './CategoryList.module.scss'
import CategoryTile from '../CategoryTile/CategoryTile'

const CategoryList = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className= {styles.container}>
      {categories.map((category, i) => (
        <div>
          <CategoryTile category={category} key = {i}/>
        </div>
      ))}
    </div>
  )
}

export default CategoryList