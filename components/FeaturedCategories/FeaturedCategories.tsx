import React from 'react'
import { Grid } from '@mui/material'

import { Category } from '../../types'

import styles from './FeaturedCategories.module.scss'
import CategoryCard from '../CategoryCard/CategoryCard'
import MotionWrapper from '../../wrappers/MotionWrapper'

const FeaturedCategories = ({ categories } : { categories: [Category]}) => {
  return (
    <div className= {`${styles.container} section__padding`}>
      <h2 className= 'section__heading'>Our Categories</h2>
      <div className= {styles.categories}>
        <Grid container spacing = {1}>
          {categories.map((category, i) => (
            <Grid item sm = {3}>
              <CategoryCard category = {category} key = {i}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default FeaturedCategories