import React from 'react'

import styles from './InStock.module.scss'

const InStock = ({ itemQuantity } : { itemQuantity: number}) => {
  const renderStock = () => {
    if(itemQuantity <= 0){
      return (
        <p className= {styles.out}>Out of Stock</p>
      )
    } else if(itemQuantity <= 10) {
      return (
        <p className= {styles.low}>Low Stock ({itemQuantity} remaining)</p>
      )
    } else {
      return (
        <p className= {styles.in}>In Stock</p>
      )
    }
  }
  return (
    <div className= {styles.container}>
      {renderStock()}
    </div>
  )
}

export default InStock