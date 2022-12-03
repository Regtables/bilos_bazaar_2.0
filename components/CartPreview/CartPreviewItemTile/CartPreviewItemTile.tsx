import React from 'react'
import Link from 'next/link'
import { Card } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './CartPreviewItemTile.module.scss'
import { CartItem } from '../../../types'
import { client } from '../../../utils/client'
import Image from 'next/image'

const CartPreviewItemTile = ( { cartItem } : { cartItem: CartItem }) => {
  console.log(cartItem)
  const { item: { name, price, category }, qty, variant: { color, image} } = cartItem
  const imageProps = useNextSanityImage(client, image)

  return (
    <Card 
      elevation = {0}
      sx = {{
        outline: '1px solid #e3e3e3',
        boxShadow: '0 4px 6px rgb(0 0 0 / 4%)',
      }}
    >
      <Link href = {``}>
        <div className = {styles.container}>
          <div className = {styles.image}>
            <Image 
              { ...imageProps }
              layout = 'fill'
              objectFit = 'cover'
            />
          </div>  
          <div className= {styles.info}>
            <div className = {styles.details}>
              <div className= {styles.category}>
                <p>{category.category}</p>
              </div>
              <div className = {styles.name}>
                <h4>{name}</h4>
              </div>
              <div className= {styles.color}>
                <p>{color.color}</p>
              </div>
            </div>
            <div className = {styles.itemTotals}>
              <div className = {styles.price}>
                <p>R {price}</p>
              </div>
              <div className= {styles.qty}>
                <p>Quantity: {qty}</p>
              </div>
              <div className= {styles.total}>
                <h5>Total: R {qty*price}</h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default CartPreviewItemTile