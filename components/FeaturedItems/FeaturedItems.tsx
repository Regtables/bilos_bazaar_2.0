import React from 'react'

import styles from './FeaturedItems.module.scss'
import ItemCard from '../ItemCard/ItemCard'

const FeaturedItems = ({ items }) => {
  return (
    <div className='section__padding'>
      <h2 className='section__heading'>Our Best Selling Items</h2>
      <div className = {styles.items}>
        {items.map((item, i) => (
          <ItemCard item = {item} key = {i}/>
        ))}
      </div>
    </div>
  )
}

export default FeaturedItems