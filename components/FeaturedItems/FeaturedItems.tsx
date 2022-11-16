import React from 'react'

import styles from './FeaturedItems.module.scss'
import ItemCard from '../ItemCard/ItemCard'
import { Item } from '../../types'

const FeaturedItems = ({ items } : { items: Item[] }) => {
  return (
    <div className={`section__padding ${styles.container}`}>
      <h2 className='section__heading'>Our Best Selling Items</h2>
      <div className = {styles.items}>
        {items.map((item, i) => (
          <div className= {styles.item} key = {i}>
            <ItemCard item = {item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedItems