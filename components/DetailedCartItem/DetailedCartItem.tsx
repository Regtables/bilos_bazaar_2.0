import Image from 'next/image'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useNextSanityImage } from 'next-sanity-image'
import { Button, Card } from '@mui/material'
import { BsBagXFill } from 'react-icons/bs'

import styles from './DetailedCartItem.module.scss'
import { Item } from '../../types'
import { client } from '../../utils/client'
import { incQty, decQty, removeCartItem } from '../../redux/cart'

import Quantity from '../Quantity/Quantity'

const DetailedCartItem = ({ bagItem } : { bagItem: any}) => {
  const { item, variant, qty  } = bagItem
  const { name, price, category, description } = item
  const { image, color } = variant
  const dispatch = useDispatch()
  const imageProps : any = useNextSanityImage(client, image )

  return (
    <Card className = {styles.container} elevation = {0}> 
      <div className = {styles.content}>
        <div className = {styles.image}>
          <Image 
            { ...imageProps }
            layout = 'fill'
            objectFit='cover'
          />
        </div>

        <div className = {styles.item_info}>
          <div className= {styles.name}>
            <h5>{name} ({color.color})</h5>
          </div>
          <div className = {styles.category}>
            <p>{category.itemType}</p>
          </div>
          <div className = {styles.description}>
            <p>{description.short}</p>
          </div>
          <div className = {styles.qty_price}>
            <div className= {styles.qty}>
              <Quantity 
                qty={qty}
                incQty = {() => dispatch(incQty(bagItem))}
                decQty = {() => dispatch(decQty(bagItem))}
                itemQuantity = {variant.itemQuantity}
              />
            </div>
            <div className= {styles.price}>
              <p>R{price*qty}</p>
            </div>
          </div>
        </div>
        <div className = {styles.remove}>
          <Button className = {styles.remove_icon} onClick = {() => dispatch(removeCartItem(bagItem))}>
            <BsBagXFill />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DetailedCartItem