import React from 'react'

import styles from './FeaturedCategories.module.scss'
import CategoryTile from '../CategoryCard/CategoryTile'

const FeaturedCategories = ({ categories }) => {
  console.log(categories)
  return (
    <div className= {styles.container}>
      <h2>Our Categories</h2>
      <div className= {styles.categories}>
        {categories.map((category, i) => (
          <CategoryTile category = {category} key = {i}/>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCategories