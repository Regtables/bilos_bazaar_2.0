import React from 'react'

import { Color } from '../../types'
import styles from './ItemColors.module.scss'

const ItemColors = ({ colors, activeColor, setActiveColor, size } : { colors: [Color], activeColor: string, setActiveColor: any, size: number }) => {

  return (
    <div className= {styles.colors}>
      {colors.map((color, i) => (
        <div 
          className= {styles.color}
          style = {{backgroundColor: `${color}`, width: `${size}px`, height: `${size}px`}}
        >
        </div>
      ))}
    </div>
  )
}

export default ItemColors