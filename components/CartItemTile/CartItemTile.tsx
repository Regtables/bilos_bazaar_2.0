import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { Card, ButtonBase, Button} from '@mui/material'
import { BsBagX } from 'react-icons/bs'

import { CartItem } from '../../types'
import { client } from '../../utils/client'
import styles from './CartItemTile.module.scss'
import { removeCartItem, incQty, decQty  } from '../../redux/cart'

import Quantity from '../Quantity/Quantity'

const CartItemTile = ({ item } : { item: CartItem }) => {
  const { 
    variant: { image, color, itemQuantity }, 
    item: { name, price, category },
    qty
  } = item;
  const dispatch = useDispatch()
  const [qtyy, setQty] = useState(1)

  const handelQtyChange = () => {

  }

  const imageProps: any = useNextSanityImage(client, image)

  return (
    <ButtonBase className = {styles.container}>
      <Card 
        className = {styles.card} 
        elevation = {0} 
        sx = {{
          outline: '1px solid #e3e3e3',
          boxShadow: '0 4px 6px rgb(0 0 0 / 4%)',
        }}
      >
        <div className = {styles.image}>
          <Image 
            { ...imageProps }
            // height = {130}
            // width = {130}
            layout = 'fill'
            objectFit='cover'
            alt = {name}
          />
        </div>

        <div className= {styles.infoAndCat}>
          <div className= {styles.itemInfo}>
            <div className = {styles.category}>
              <p>{category.category}</p>
            </div>
            <div className = {styles.name}>
              <h4>{name}</h4>
            </div>
            <div className = {styles.variant}>
              <p>{color.color}</p>
            </div>
          </div>

          <div className = {styles.qty}>
            <Quantity 
              qty = {qty}
              incQty = {() => dispatch(incQty(item))}
              decQty = {() => dispatch(decQty(item))}
              itemQuantity = {itemQuantity}        
            />
          </div>
        </div>

        <div className = {styles.price}>
          <p>R {price*qty}</p>
        </div>

        <div className = {styles.remove}>
          <Button className = {styles.removeButton} onClick = {() => dispatch(removeCartItem(item))}>
            <BsBagX /> 
          </Button> 
        </div>
      </Card>
    </ButtonBase>
  )
}

export default CartItemTile