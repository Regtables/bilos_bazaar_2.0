import React from 'react'
import { Chip } from '@mui/material'
import { TbDimensions } from 'react-icons/tb';

import { Item } from '../../types'
import styles from './ItemInfo.module.scss'

const tags = [
  'eco-friendly',
  '100% cotton',
  'hand made'
]

const ItemInfo = ({ item } : { item: Item }) => {
  const { name, price, category, description, dimentions } = item

  return (
    <div className= {styles.container}>
      <div className= {styles.information}>
        <div className= {styles.category}>
          <h4>Category</h4>
        </div>

        <div className= {styles.name}>
          <h1>{name}</h1>
        </div>

        <div className= {styles.tags}>
          {tags.map((tag, i) => (
            <Chip label = {tag} className = {styles.chip} />
          ))}
        </div>

        <div className= {styles.dimentions}>
          <TbDimensions />
          <p>{dimentions}</p>
        </div>

        <div className= {styles.price}>
          <h3>R {price}</h3>
        </div>

        <div className= {styles.description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemInfo