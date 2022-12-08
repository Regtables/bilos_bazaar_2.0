import React from 'react'
import { Grid } from '@mui/material'

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
        <Grid container spacing = {1.5}>
          {items.map((item, i) => (
            <Grid item sm = {2.5} xs = {6}>
              <ItemCard item={item} key = {i}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default SimilarItems