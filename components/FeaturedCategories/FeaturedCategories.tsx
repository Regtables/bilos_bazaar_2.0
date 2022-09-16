import React from 'react'

import styles from './FeaturedCategories.module.scss'
import CategoryCard from '../CategoryCard/CategoryCard'

const FeaturedCategories = ({ categories }) => {
  console.log(categories)
  return (
    <div className= {`${styles.container} section__padding`}>
      <h2 className= 'section__heading'>Our Categories</h2>
      <div className= {styles.categories}>
        {categories.map((category, i) => (
          <CategoryCard category = {category} key = {i}/>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCategories