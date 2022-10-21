import React from 'react'
import { Checkbox } from '@mui/material'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import styles from './Wishlist.module.scss'

const Wishlist = ({ isLoved, setIsLoved } : { isLoved: boolean, setIsLoved: any}) => {

  const handleToggle = () => {
    setIsLoved((prev: any) => !prev)
  }

  return (
    <div className= {styles.container}>
      <Checkbox 
        icon = {<MdFavoriteBorder />} 
        checkedIcon = {<MdFavorite />} 
        sx = {{
          "&:checked": {
            backgroundColor: 'red'
          } 
        }} 
        onChange = {handleToggle}
      />
    </div>
  )
}

export default Wishlist