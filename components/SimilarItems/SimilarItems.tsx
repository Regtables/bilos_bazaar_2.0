import React from 'react'

import { Item } from '../../types'
import styles from './SimilarItems.module.scss'

import ItemCard from '../ItemCard/ItemCard'

const SimilarItems = ({ items } : { items: Item[] }) => {
  return (
    <div className= {styles.container}>
      <div className= {styles.heading}>
        <h3 className='section__heading'>Similar Items</h3>
      </div>
      <div className= {styles.items}>
        {items.map((item, i) => (
          <ItemCard item={item} key = {i}/>
        ))}
      </div>
    </div>
  )
}

export default SimilarItems