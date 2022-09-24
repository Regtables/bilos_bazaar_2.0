import React from 'react'

import { Color } from '../../types'
import styles from './ItemColors.module.scss'

const ItemColors = ({ colors, activeColor, setActiveColor, size } : { colors: any, activeColor: string, setActiveColor: any, size: number }) => {

  return (
    <div className= {styles.colors}>
      {colors.map((color: any, i: number) => (
        <div 
          className= {styles.color}
          style = {{backgroundColor: `${color}`, width: `${size}px`, height: `${size}px`}}
          key = {i}
        >
        </div>
      ))}
    </div>
  )
}

export default ItemColors