import React from 'react'

import { Color } from '../../types'
import styles from './ItemColors.module.scss'

const ItemColors = ({ colors, activeColor, setActiveColor, size, setIndex } : { colors: Color[], activeColor: Color, setActiveColor: any, size: number, setIndex: any }) => {

  const handleColorChange = (color: Color, i: number) => {
    setActiveColor(color)

    if(setIndex){
      if(i === 0){
        setIndex(1)
      } else {
        setIndex(i)
      }
    }
  } 

  return (
    <div className= {styles.colors}>
      {colors.map((color: any, i: number) => (
        <div  
          className= {styles.color}
          style = {{backgroundColor: `${color.colorCode}`, width: `${size}px`, height: `${size}px`}}
          key = {i}
          onClick = {() => handleColorChange(color, i)}
        >
        </div>
      ))}
    </div>
  )
}

export default ItemColors