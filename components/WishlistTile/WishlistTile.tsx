import React from 'react'
import { useNextSanityImage } from 'next-sanity-image'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Card } from '@mui/material'
import { FiEye } from 'react-icons/fi'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'

import styles from './WishlistTile.module.scss'
import { Item } from '../../types'
import { client } from '../../utils/client'
import { addItemToWishlist, removeFromWishlist } from '../../redux/auth'


import ActionButton from '../ActionButton/ActionButton'
import { AppDispatch } from '../../redux/store'

const WishlistTile = ({ item }: { item: Item }) => {
  const { name, category, price, product, slug, images } = item
  const imageProps = useNextSanityImage(client, images[0].image)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleRemove = async () => {
    dispatch(addItemToWishlist(item))
    
    const bResponse = await dispatch(removeFromWishlist(item))
  }

  const handleView = () => {
    router.push(`/products/${product.slug.current}/${slug.current}`)
  }

  return (
    <div className = {styles.container}>
      <div className= {styles.image}>
        <Image 
          { ...imageProps }
          layout = 'fill'
          objectFit='cover'
        />
      </div>
      <div className = {styles.item_info}>
        <div className = {styles.details}>
          <div className = {styles.category}>
            <p>{category.category}</p>
          </div>
          <div className = {styles.name}>
            <h4>{name}</h4>
          </div> 
        </div>
        <div className = {styles.price}>
          <p>R {price}</p>
        </div>
      </div>
      <div className = {styles.actions}>
        <div className= {styles.remove}>
          <ActionButton 
            text='remove'
            handleClick={handleRemove}
            icon = {<MdOutlineRemoveCircleOutline/>}
          />
        </div>
        <div className = {styles.view}>
          <ActionButton 
            text='view'
            handleClick={handleView}
            icon = {<FiEye />}
          />
        </div>
      </div>
    </div>
  )
}

export default WishlistTile