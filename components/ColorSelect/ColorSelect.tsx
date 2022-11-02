import React from 'react'

import styles from './ColorSelect.module.scss'
import { Variant } from '../../types'

const ColorSelect = ({ activeVariant, setActiveVariant, variants, setIndex, size} : {activeVariant: Variant, variants: Variant[], setActiveVariant: any, setIndex: any, size: number}) => {

  const handleVariantChange = (variant: Variant, i: number = 0) => {
    setActiveVariant(variant)

    if(setIndex){
      if(i === 0){
        setIndex(1)
      } else {
        setIndex(i)
      }
    }
  }
  return (
    <div className= {styles.container}>
      {variants.map((variant, i) => (
        <div 
          style={{ 
            backgroundColor: `${variant.color.colorCode}`,
            width: `${size}px`,
            height: `${size}px`
           }}
          key={i}
          className = {`${styles.color} ${activeVariant?.color?.color === variant?.color?.color ? styles.activeColor : ''}`} 
          onClick = {() => handleVariantChange(variant)}
        />
      ))}
    </div>
  )
}

export default ColorSelect