import React from 'react'

import { Category } from '../../types'

import styles from './FeaturedCategories.module.scss'
import CategoryCard from '../CategoryCard/CategoryCard'
import MotionWrapper from '../../wrappers/MotionWrapper'

const FeaturedCategories = ({ categories } : { categories: [Category]}) => {
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