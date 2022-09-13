import React from 'react'
import Image from 'next/image'
import { Card, Typography, Button } from '@mui/material'

import styles from './ItemCard.module.css'

const item = {
  image: '/item8.jpeg',
  name: 'Galaxy Throw',
  price: 599,
}

const ItemCard = () => {
  return (
    <Card elevation={2} className = {styles.card}>
      <div className = {styles.image}>
        <Image 
          src = {item.image}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className= {styles.content}>
        <Typography className = {styles.name}>{item.name}</Typography>
        <Button variant='contained' color = 'secondary'>Add to bag</Button>
      </div>
    </Card>
  )
}

export default ItemCard